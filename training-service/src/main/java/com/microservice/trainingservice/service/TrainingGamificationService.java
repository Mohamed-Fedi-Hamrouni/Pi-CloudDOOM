package com.microservice.trainingservice.service;

import com.microservice.trainingservice.dto.AwardBadgeRequest;
import com.microservice.trainingservice.dto.DebugBadgeSimulationRequest;
import com.microservice.trainingservice.dto.DebugBadgeSimulationResponse;
import com.microservice.trainingservice.dto.CreateDailyActivityRequest;
import com.microservice.trainingservice.dto.CreateTrainingPathRequest;
import com.microservice.trainingservice.dto.DailyActivityResponse;
import com.microservice.trainingservice.dto.TrainingModuleResponse;
import com.microservice.trainingservice.dto.TrainingPathResponse;
import com.microservice.trainingservice.dto.UpdateModuleProgressRequest;
import com.microservice.trainingservice.dto.UserBadgeResponse;
import com.microservice.trainingservice.dto.UserXPTrackerResponse;
import com.microservice.trainingservice.event.InterviewSessionCompletedEvent;
import com.microservice.trainingservice.event.TrainingEventPublisher;
import com.microservice.trainingservice.event.TrainingPathCreatedEvent;
import com.microservice.trainingservice.event.TrainingPathUpdatedEvent;
import com.microservice.trainingservice.event.UserBadgeEarnedEvent;
import com.microservice.trainingservice.exception.BusinessException;
import com.microservice.trainingservice.exception.ResourceNotFoundException;
import com.microservice.trainingservice.mapper.TrainingMapper;
import com.microservice.trainingservice.model.Badge;
import com.microservice.trainingservice.model.DailyActivity;
import com.microservice.trainingservice.model.ModuleStatus;
import com.microservice.trainingservice.model.PathStatus;
import com.microservice.trainingservice.model.TrainingModule;
import com.microservice.trainingservice.model.TrainingPath;
import com.microservice.trainingservice.model.UserBadge;
import com.microservice.trainingservice.model.UserXPTracker;
import com.microservice.trainingservice.repository.BadgeRepository;
import com.microservice.trainingservice.repository.DailyActivityRepository;
import com.microservice.trainingservice.repository.TrainingModuleRepository;
import com.microservice.trainingservice.repository.TrainingPathRepository;
import com.microservice.trainingservice.repository.UserBadgeRepository;
import com.microservice.trainingservice.repository.UserXPTrackerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
@Transactional
public class TrainingGamificationService {

	private static final Pattern NUMBER_PATTERN = Pattern.compile("(\\d[\\d,]*)");

	@Value("${training.debug.badge-simulation-enabled:false}")
	private boolean badgeSimulationEnabled;

	private final TrainingPathRepository trainingPathRepository;
	private final TrainingModuleRepository trainingModuleRepository;
	private final BadgeRepository badgeRepository;
	private final UserBadgeRepository userBadgeRepository;
	private final UserXPTrackerRepository userXPTrackerRepository;
	private final DailyActivityRepository dailyActivityRepository;
	private final TrainingMapper trainingMapper;
	private final TrainingEventPublisher eventPublisher;
	private final TrainingPersonalizationRuleEngine personalizationRuleEngine;

	public TrainingPathResponse createTrainingPath(CreateTrainingPathRequest request) {
		if (request.getUserId() == null || request.getUserId().isBlank()) {
			throw new BusinessException("userId is required");
		}
		if (trainingPathRepository.findByUserId(request.getUserId()).isPresent()) {
			throw new BusinessException("Training path already exists for user " + request.getUserId());
		}

		TrainingPath savedPath = createPathInternal(
			request.getUserId(),
			request.getStatus() == null ? PathStatus.ACTIVE : request.getStatus(),
			request.getXpThreshold() == null ? 0 : request.getXpThreshold(),
			personalizationRuleEngine.buildDefaultPlan()
		);

		return trainingMapper.trainingPathToResponse(savedPath);
	}

	@Transactional(readOnly = true)
	public TrainingPathResponse getPathByUserId(String userId) {
		TrainingPath path = trainingPathRepository.findByUserIdEagerModules(userId)
			.orElseThrow(() -> new ResourceNotFoundException("Training path not found for user " + userId));
		return trainingMapper.trainingPathToResponse(path);
	}

	public TrainingModuleResponse updateModuleProgress(String userId, Long pathId, Long moduleId,
													   UpdateModuleProgressRequest request) {
		TrainingPath path = trainingPathRepository.findById(pathId)
			.orElseThrow(() -> new ResourceNotFoundException("Training path not found: " + pathId));

		if (!path.getUserId().equals(userId)) {
			throw new BusinessException("Path does not belong to user " + userId);
		}

		TrainingModule module = trainingModuleRepository.findByIdAndTrainingPathId(moduleId, pathId)
			.orElseThrow(() -> new ResourceNotFoundException("Training module not found: " + moduleId));

		ModuleStatus previousStatus = module.getStatus();
		if (request.getCompletedLessons() != null) {
			module.setCompletedLessons(Math.max(0, request.getCompletedLessons()));
		}

		module.updateProgress();
		if (request.getProgress() != null) {
			module.setProgress(Math.max(0, Math.min(100, request.getProgress())));
		}

		if (module.getProgress() >= 100) {
			module.setStatus(ModuleStatus.COMPLETED);
		} else if (module.getProgress() > 0) {
			module.setStatus(ModuleStatus.IN_PROGRESS);
		}

		TrainingModule savedModule = trainingModuleRepository.save(module);

		UserXPTracker tracker = getOrCreateTracker(userId);
		if (previousStatus != ModuleStatus.COMPLETED && savedModule.getStatus() == ModuleStatus.COMPLETED) {
			tracker.addXP(savedModule.getXpReward());
			userXPTrackerRepository.save(tracker);
		}

		evaluateAndAwardAutomaticBadges(
			userId,
			new AutoBadgeContext(
				null,
				null,
				null,
				(int) trainingModuleRepository.findCompletedCountByPathId(pathId),
				tracker.getCurrentStreak(),
				tracker.getTotalXp()
			)
		);

		eventPublisher.publishTrainingPathUpdated(TrainingPathUpdatedEvent.builder()
			.pathId(pathId)
			.userId(userId)
			.moduleId(savedModule.getId())
			.moduleStatus(savedModule.getStatus())
			.moduleProgress(savedModule.getProgress())
			.totalXp(tracker.getTotalXp())
			.updatedAt(LocalDateTime.now())
			.build());

		return trainingMapper.trainingModuleToResponse(savedModule);
	}

	public UserBadgeResponse awardBadge(AwardBadgeRequest request) {
		Badge badge = badgeRepository.findById(request.getBadgeId())
			.orElseThrow(() -> new ResourceNotFoundException("Badge not found: " + request.getBadgeId()));

		if (Boolean.FALSE.equals(badge.getIsActive())) {
			throw new BusinessException("Badge is inactive: " + badge.getName());
		}

		if (userBadgeRepository.existsByUserIdAndBadge_Id(request.getUserId(), request.getBadgeId())) {
			throw new BusinessException("Badge already awarded to user " + request.getUserId());
		}

		UserBadge userBadge = UserBadge.builder()
			.userId(request.getUserId())
			.badge(badge)
			.progress(request.getProgress())
			.build();

		UserBadge saved = userBadgeRepository.save(userBadge);

		UserXPTracker tracker = getOrCreateTracker(request.getUserId());
		tracker.addXP(badge.getXpReward());
		userXPTrackerRepository.save(tracker);

		eventPublisher.publishUserBadgeEarned(UserBadgeEarnedEvent.builder()
			.userId(request.getUserId())
			.badgeId(badge.getId())
			.badgeName(badge.getName())
			.category(badge.getCategory())
			.xpReward(badge.getXpReward())
			.earnedAt(saved.getEarnedDate())
			.build());

		return trainingMapper.userBadgeToResponse(saved);
	}

	public UserXPTrackerResponse recordDailyActivity(CreateDailyActivityRequest request) {
		LocalDate date = request.getActivityDate() == null ? LocalDate.now() : request.getActivityDate();

		DailyActivity activity = dailyActivityRepository.findByUserIdAndDate(request.getUserId(), date)
			.orElseGet(() -> DailyActivity.builder()
				.userId(request.getUserId())
				.activityDate(date)
				.xpEarned(0)
				.sessionCompleted(false)
				.goalsCompleted(0)
				.behavioralCount(0)
				.libraryCount(0)
				.quizCount(0)
				.build());

		activity.setXpEarned((activity.getXpEarned() == null ? 0 : activity.getXpEarned()) +
			(request.getXpEarned() == null ? 0 : request.getXpEarned()));
		activity.setSessionCompleted(Boolean.TRUE.equals(activity.getSessionCompleted()) ||
			Boolean.TRUE.equals(request.getSessionCompleted()));
		activity.setGoalsCompleted((activity.getGoalsCompleted() == null ? 0 : activity.getGoalsCompleted()) +
			(request.getGoalsCompleted() == null ? 0 : request.getGoalsCompleted()));
		activity.setBehavioralCount((activity.getBehavioralCount() == null ? 0 : activity.getBehavioralCount()) +
			(request.getBehavioralCount() == null ? 0 : request.getBehavioralCount()));
		activity.setLibraryCount((activity.getLibraryCount() == null ? 0 : activity.getLibraryCount()) +
			(request.getLibraryCount() == null ? 0 : request.getLibraryCount()));
		activity.setQuizCount((activity.getQuizCount() == null ? 0 : activity.getQuizCount()) +
			(request.getQuizCount() == null ? 0 : request.getQuizCount()));

		dailyActivityRepository.save(activity);

		UserXPTracker tracker = getOrCreateTracker(request.getUserId());
		if (request.getXpEarned() != null && request.getXpEarned() > 0) {
			tracker.addXP(request.getXpEarned());
		}

		updateStreak(tracker, date);
		userXPTrackerRepository.save(tracker);

		evaluateAndAwardAutomaticBadges(
			request.getUserId(),
			new AutoBadgeContext(
				null,
				null,
				null,
				countCompletedModulesForUser(request.getUserId()),
				tracker.getCurrentStreak(),
				tracker.getTotalXp()
			)
		);

		return trainingMapper.userXPTrackerToResponse(tracker);
	}

	@Transactional(readOnly = true)
	public DailyActivityResponse getTodayActivity(String userId) {
		return dailyActivityRepository.findByUserIdAndDate(userId, LocalDate.now())
			.map(trainingMapper::dailyActivityToResponse)
			.orElseGet(() -> DailyActivityResponse.builder()
				.userId(userId)
				.activityDate(LocalDate.now())
				.xpEarned(0)
				.sessionCompleted(false)
				.goalsCompleted(0)
				.behavioralCount(0)
				.libraryCount(0)
				.quizCount(0)
				.build());
	}

	@Transactional(readOnly = true)
	public List<UserXPTrackerResponse> getLeaderboard(int topN) {
		int limit = Math.max(1, Math.min(topN, 100));
		return userXPTrackerRepository.findLeaderboard(PageRequest.of(0, limit)).stream()
			.map(trainingMapper::userXPTrackerToResponse)
			.toList();
	}

	public DebugBadgeSimulationResponse simulateBadgeTriggersForQa(DebugBadgeSimulationRequest request) {
		if (!badgeSimulationEnabled) {
			throw new BusinessException("Badge simulation endpoint is disabled");
		}

		if (request.getUserId() == null || request.getUserId().isBlank()) {
			throw new BusinessException("userId is required");
		}

		TrainingPath path = trainingPathRepository.findByUserId(request.getUserId())
			.orElseGet(() -> createPathInternal(
				request.getUserId(),
				PathStatus.ACTIVE,
				200,
				personalizationRuleEngine.buildDefaultPlan()
			));

		Set<Long> beforeBadgeIds = userBadgeRepository.findByUserId(request.getUserId()).stream()
			.map(userBadge -> userBadge.getBadge().getId())
			.collect(java.util.stream.Collectors.toSet());

		int targetXp = request.getTargetXp() == null ? 12000 : Math.max(request.getTargetXp(), 0);
		int targetStreak = request.getTargetStreakDays() == null ? 100 : Math.max(request.getTargetStreakDays(), 0);
		int targetSessions = request.getTargetSessionsCompleted() == null ? 100 : Math.max(request.getTargetSessionsCompleted(), 0);
		double targetScore = request.getTargetGlobalScore() == null ? 100.0 : Math.max(0.0, request.getTargetGlobalScore());
		String preparationLevel = request.getTargetPreparationLevel() == null
			? "MASTER"
			: request.getTargetPreparationLevel();

		UserXPTracker tracker = getOrCreateTracker(request.getUserId());
		if (tracker.getTotalXp() < targetXp) {
			tracker.addXP(targetXp - tracker.getTotalXp());
		}
		tracker.setCurrentStreak(Math.max(tracker.getCurrentStreak(), targetStreak));
		tracker.setLongestStreak(Math.max(tracker.getLongestStreak(), tracker.getCurrentStreak()));
		tracker.setLastActivityDate(LocalDate.now());
		tracker = userXPTrackerRepository.save(tracker);

		List<TrainingModule> modules = trainingModuleRepository.findByPathIdOrdered(path.getId());
		for (TrainingModule module : modules) {
			if (module.getStatus() != ModuleStatus.COMPLETED) {
				module.setCompletedLessons(module.getLessons());
				module.setProgress(100);
				module.setStatus(ModuleStatus.COMPLETED);
				trainingModuleRepository.save(module);
			}
		}

		int completedModules = (int) trainingModuleRepository.findCompletedCountByPathId(path.getId());
		evaluateAndAwardAutomaticBadges(
			request.getUserId(),
			new AutoBadgeContext(
				targetSessions,
				targetScore,
				preparationLevel,
				completedModules,
				tracker.getCurrentStreak(),
				tracker.getTotalXp()
			)
		);

		List<UserBadge> allUserBadges = userBadgeRepository.findByUserId(request.getUserId());
		List<String> newlyAwarded = allUserBadges.stream()
			.filter(userBadge -> !beforeBadgeIds.contains(userBadge.getBadge().getId()))
			.map(userBadge -> userBadge.getBadge().getName())
			.toList();

		List<String> allBadgeNames = allUserBadges.stream()
			.map(userBadge -> userBadge.getBadge().getName())
			.toList();

		tracker = getOrCreateTracker(request.getUserId());

		return DebugBadgeSimulationResponse.builder()
			.userId(request.getUserId())
			.pathId(path.getId())
			.completedModules(completedModules)
			.totalXp(tracker.getTotalXp())
			.currentStreak(tracker.getCurrentStreak())
			.totalBadgesAwarded(allBadgeNames.size())
			.newlyAwardedBadges(newlyAwarded)
			.allAwardedBadges(allBadgeNames)
			.build();
	}

	public void processInterviewCompleted(InterviewSessionCompletedEvent event) {
		TrainingPath path = trainingPathRepository.findByUserId(event.getUserId())
			.orElseGet(() -> createPersonalizedPathFromInterview(event));

		int interviewXp = Math.max(20, event.getGlobalScore() == null ? 20 : (int) Math.round(event.getGlobalScore() * 2));
		recordDailyActivity(CreateDailyActivityRequest.builder()
			.userId(event.getUserId())
			.activityDate(LocalDate.now())
			.xpEarned(interviewXp)
			.sessionCompleted(true)
			.goalsCompleted(1)
			.build());

		UserXPTracker tracker = getOrCreateTracker(event.getUserId());
		evaluateAndAwardAutomaticBadges(
			event.getUserId(),
			new AutoBadgeContext(
				event.getTotalSessionsCompleted(),
				event.getGlobalScore(),
				event.getPreparationLevel(),
				countCompletedModulesForUser(event.getUserId()),
				tracker.getCurrentStreak(),
				tracker.getTotalXp()
			)
		);

		eventPublisher.publishTrainingPathUpdated(TrainingPathUpdatedEvent.builder()
			.pathId(path.getId())
			.userId(path.getUserId())
			.moduleId(null)
			.moduleStatus(null)
			.moduleProgress(null)
			.totalXp(getOrCreateTracker(path.getUserId()).getTotalXp())
			.updatedAt(LocalDateTime.now())
			.build());
	}

	private void evaluateAndAwardAutomaticBadges(String userId, AutoBadgeContext context) {
		if (userId == null || userId.isBlank()) {
			return;
		}

		UserXPTracker tracker = getOrCreateTracker(userId);
		for (Badge badge : badgeRepository.findAllActiveBadges()) {
			if (shouldAutoAwardBadge(badge, context, tracker)
				&& !userBadgeRepository.existsByUserIdAndBadge_Id(userId, badge.getId())) {
				autoAwardBadge(userId, badge, tracker);
			}
		}
	}

	private boolean shouldAutoAwardBadge(Badge badge, AutoBadgeContext context, UserXPTracker tracker) {
		String signature = ((badge.getName() == null ? "" : badge.getName()) + " "
			+ (badge.getDescription() == null ? "" : badge.getDescription())).toLowerCase(Locale.ROOT);

		if (signature.contains("mock interview")) {
			Integer sessions = context.totalSessionsCompleted();
			int required = extractFirstNumber(signature, 1);
			return sessions != null && sessions >= required;
		}

		if (signature.contains("learning streak")) {
			int required = extractFirstNumber(signature, 1);
			return tracker.getCurrentStreak() >= required;
		}

		if (signature.contains("100%") || signature.contains("perfect score")) {
			Double score = context.globalScore();
			return score != null && score >= 100.0;
		}

		if (signature.contains("master preparation level")) {
			String level = context.preparationLevel();
			return (level != null && level.toUpperCase(Locale.ROOT).contains("MASTER"))
				|| tracker.getCurrentLevel() >= 10;
		}

		if (signature.contains("improve your score by 50")) {
			return false;
		}

		if (signature.contains("xp")) {
			int required = extractFirstNumber(signature, Integer.MAX_VALUE);
			return context.totalXp() >= required;
		}

		if (signature.contains("library resources") || signature.contains("quizzes")) {
			int required = extractFirstNumber(signature, Integer.MAX_VALUE);
			return context.completedModules() >= required;
		}

		if (signature.contains("community") || signature.contains("mentoring")) {
			return false;
		}

		return false;
	}

	private int extractFirstNumber(String text, int fallback) {
		Matcher matcher = NUMBER_PATTERN.matcher(text);
		if (!matcher.find()) {
			return fallback;
		}

		String sanitized = matcher.group(1).replace(",", "");
		try {
			return Integer.parseInt(sanitized);
		} catch (NumberFormatException ignored) {
			return fallback;
		}
	}

	private void autoAwardBadge(String userId, Badge badge, UserXPTracker tracker) {
		UserBadge saved = userBadgeRepository.save(UserBadge.builder()
			.userId(userId)
			.badge(badge)
			.progress(100)
			.build());

		tracker.addXP(badge.getXpReward());
		userXPTrackerRepository.save(tracker);

		eventPublisher.publishUserBadgeEarned(UserBadgeEarnedEvent.builder()
			.userId(userId)
			.badgeId(badge.getId())
			.badgeName(badge.getName())
			.category(badge.getCategory())
			.xpReward(badge.getXpReward())
			.earnedAt(saved.getEarnedDate())
			.build());
	}

	private int countCompletedModulesForUser(String userId) {
		return trainingPathRepository.findByUserId(userId)
			.map(path -> (int) trainingModuleRepository.findCompletedCountByPathId(path.getId()))
			.orElse(0);
	}

	private record AutoBadgeContext(
		Integer totalSessionsCompleted,
		Double globalScore,
		String preparationLevel,
		int completedModules,
		int currentStreak,
		int totalXp
	) {
	}

	private TrainingPath createPersonalizedPathFromInterview(InterviewSessionCompletedEvent event) {
		return createPathInternal(
			event.getUserId(),
			PathStatus.ACTIVE,
			personalizationRuleEngine.recommendXpThreshold(event),
			personalizationRuleEngine.buildPlan(event)
		);
	}

	private TrainingPath createPathInternal(
		String userId,
		PathStatus status,
		Integer xpThreshold,
		List<TrainingPersonalizationRuleEngine.PersonalizedModulePlan> modulePlans
	) {
		TrainingPath path = TrainingPath.builder()
			.userId(userId)
			.xpThreshold(xpThreshold)
			.status(status)
			.modules(new ArrayList<>())
			.build();

		List<TrainingModule> defaultModules = buildModulesFromPlans(path, modulePlans);
		defaultModules.forEach(path::addModule);

		TrainingPath savedPath = trainingPathRepository.save(path);
		getOrCreateTracker(userId);

		eventPublisher.publishTrainingPathCreated(TrainingPathCreatedEvent.builder()
			.pathId(savedPath.getId())
			.userId(savedPath.getUserId())
			.status(savedPath.getStatus())
			.createdAt(savedPath.getCreatedAt())
			.build());

		return savedPath;
	}

	private List<TrainingModule> buildModulesFromPlans(
		TrainingPath path,
		List<TrainingPersonalizationRuleEngine.PersonalizedModulePlan> modulePlans
	) {
		List<TrainingModule> modules = new ArrayList<>();
		for (TrainingPersonalizationRuleEngine.PersonalizedModulePlan plan : modulePlans) {
			ModuleStatus status = plan.unlocked() ? ModuleStatus.IN_PROGRESS : ModuleStatus.LOCKED;
			LocalDateTime unlockedAt = plan.unlocked() ? LocalDateTime.now() : null;

			modules.add(TrainingModule.builder()
				.trainingPath(path)
				.category(plan.category())
				.title(plan.title())
				.description(plan.description())
				.lessons(plan.lessons())
				.completedLessons(0)
				.progress(0)
				.xpReward(plan.xpReward())
				.status(status)
				.unlockedAt(unlockedAt)
				.build());
		}
		return modules;
	}

	private UserXPTracker getOrCreateTracker(String userId) {
		return userXPTrackerRepository.findByUserId(userId)
			.orElseGet(() -> userXPTrackerRepository.save(UserXPTracker.builder()
				.userId(userId)
				.totalXp(0)
				.currentLevel(1)
				.xpToNextLevel(1000)
				.currentStreak(0)
				.longestStreak(0)
				.lastActivityDate(null)
				.build()));
	}

	private void updateStreak(UserXPTracker tracker, LocalDate activityDate) {
		LocalDate lastDate = tracker.getLastActivityDate();
		if (lastDate == null) {
			tracker.setCurrentStreak(1);
			tracker.setLongestStreak(Math.max(1, tracker.getLongestStreak()));
			tracker.setLastActivityDate(activityDate);
			return;
		}

		if (activityDate.equals(lastDate)) {
			return;
		}

		if (activityDate.equals(lastDate.plusDays(1))) {
			tracker.incrementStreak();
		} else if (activityDate.isAfter(lastDate.plusDays(1))) {
			tracker.setCurrentStreak(1);
		}

		tracker.setLongestStreak(Math.max(tracker.getLongestStreak(), tracker.getCurrentStreak()));
		tracker.setLastActivityDate(activityDate);
	}
}
