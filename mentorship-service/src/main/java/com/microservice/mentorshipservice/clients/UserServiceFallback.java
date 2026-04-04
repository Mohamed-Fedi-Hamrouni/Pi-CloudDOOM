@Component
public class UserServiceFallback implements UserServiceClient {

    @Override
    public UserResponse getUserById(UUID id) {
        throw new RuntimeException("User service unavailable");
    }

    @Override
    public UserResponse getCurrentUser() {
        throw new RuntimeException("User service unavailable");
    }
}