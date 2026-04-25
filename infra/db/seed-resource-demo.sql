-- Comprehensive resource library seed — 12 categories, 84 resources with real URLs
-- Safe to run multiple times (idempotent).

BEGIN;

-- ── Categories ──────────────────────────────────────────────────────────────

INSERT INTO resource_categories (id, name, description, industry, created_at, updated_at)
SELECT gen_random_uuid(), 'System Design', 'Scalable architecture and distributed-systems patterns', 'TECHNOLOGY', now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resource_categories WHERE name = 'System Design');

INSERT INTO resource_categories (id, name, description, industry, created_at, updated_at)
SELECT gen_random_uuid(), 'Algorithms & Data Structures', 'Problem solving, complexity analysis and coding patterns', 'TECHNOLOGY', now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resource_categories WHERE name = 'Algorithms & Data Structures');

INSERT INTO resource_categories (id, name, description, industry, created_at, updated_at)
SELECT gen_random_uuid(), 'Cloud & DevOps', 'Cloud platforms, containers, CI/CD and site reliability', 'TECHNOLOGY', now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resource_categories WHERE name = 'Cloud & DevOps');

INSERT INTO resource_categories (id, name, description, industry, created_at, updated_at)
SELECT gen_random_uuid(), 'Frontend Engineering', 'Modern web, JavaScript frameworks and performance', 'TECHNOLOGY', now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resource_categories WHERE name = 'Frontend Engineering');

INSERT INTO resource_categories (id, name, description, industry, created_at, updated_at)
SELECT gen_random_uuid(), 'AI & Machine Learning', 'Foundations, LLMs, MLOps and applied AI', 'TECHNOLOGY', now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resource_categories WHERE name = 'AI & Machine Learning');

INSERT INTO resource_categories (id, name, description, industry, created_at, updated_at)
SELECT gen_random_uuid(), 'Behavioral Interviews', 'Communication, STAR method and storytelling for interviews', 'CONSULTING', now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resource_categories WHERE name = 'Behavioral Interviews');

INSERT INTO resource_categories (id, name, description, industry, created_at, updated_at)
SELECT gen_random_uuid(), 'Product Management', 'Product discovery, strategy and execution', 'CONSULTING', now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resource_categories WHERE name = 'Product Management');

INSERT INTO resource_categories (id, name, description, industry, created_at, updated_at)
SELECT gen_random_uuid(), 'Case Interviews', 'Consulting case frameworks, mental math and structured thinking', 'CONSULTING', now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resource_categories WHERE name = 'Case Interviews');

INSERT INTO resource_categories (id, name, description, industry, created_at, updated_at)
SELECT gen_random_uuid(), 'Personal Finance & Investing', 'Budgeting, index investing, FIRE and wealth building', 'FINANCE', now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resource_categories WHERE name = 'Personal Finance & Investing');

INSERT INTO resource_categories (id, name, description, industry, created_at, updated_at)
SELECT gen_random_uuid(), 'Growth Marketing', 'Acquisition, activation, retention and analytics', 'MARKETING', now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resource_categories WHERE name = 'Growth Marketing');

INSERT INTO resource_categories (id, name, description, industry, created_at, updated_at)
SELECT gen_random_uuid(), 'Learning Science', 'Evidence-based learning, memory and deliberate practice', 'EDUCATION', now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resource_categories WHERE name = 'Learning Science');

INSERT INTO resource_categories (id, name, description, industry, created_at, updated_at)
SELECT gen_random_uuid(), 'Digital Health', 'Telemedicine, clinical AI and health-tech products', 'HEALTHCARE', now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resource_categories WHERE name = 'Digital Health');

-- ── System Design (7 resources) ──────────────────────────────────────────────

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'System Design Interview — Step-by-Step Framework',
  'Grokking the system design interview: a structured approach covering requirements gathering, capacity estimation, API design, data modeling and trade-offs for 20+ real-world systems.',
  'https://www.youtube.com/watch?v=i53Gi_K3o7I',
  'VIDEO', 'BEGINNER', 'TECHNOLOGY',
  'https://picsum.photos/seed/sysdesign-video-1/640/360',
  (SELECT id FROM resource_categories WHERE name = 'System Design' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'System Design Interview — Step-by-Step Framework');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Designing Data-Intensive Applications (Kleppmann)',
  'The definitive book on building reliable, scalable and maintainable systems. Covers replication, partitioning, transactions, distributed consensus and stream processing.',
  'https://dataintensive.net/',
  'BOOK', 'ADVANCED', 'TECHNOLOGY',
  'https://picsum.photos/seed/ddia-book/640/360',
  (SELECT id FROM resource_categories WHERE name = 'System Design' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Designing Data-Intensive Applications (Kleppmann)');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'System Design Primer — GitHub',
  'The most starred system design repository on GitHub. Covers scalability, CAP theorem, consistency patterns, CDN, load balancing, databases, caches and real system examples.',
  'https://github.com/donnemartin/system-design-primer',
  'ARTICLE', 'INTERMEDIATE', 'TECHNOLOGY',
  'https://picsum.photos/seed/sys-primer/640/360',
  (SELECT id FROM resource_categories WHERE name = 'System Design' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'System Design Primer — GitHub');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'How Discord Stores Billions of Messages',
  'Engineering deep-dive into Discord''s migration from MongoDB to Cassandra. Real trade-offs around write amplification, hot partitions and read latency at billions-of-rows scale.',
  'https://discord.com/blog/how-discord-stores-billions-of-messages',
  'ARTICLE', 'ADVANCED', 'TECHNOLOGY',
  'https://picsum.photos/seed/discord-arch/640/360',
  (SELECT id FROM resource_categories WHERE name = 'System Design' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'How Discord Stores Billions of Messages');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Designing Instagram — System Design Walkthrough',
  'Full video walkthrough designing a photo-sharing app at Instagram scale: CDN, object storage, feed ranking, follower graph and notification pipeline.',
  'https://www.youtube.com/watch?v=VJpfO6KdyWE',
  'VIDEO', 'INTERMEDIATE', 'TECHNOLOGY',
  'https://picsum.photos/seed/insta-design/640/360',
  (SELECT id FROM resource_categories WHERE name = 'System Design' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Designing Instagram — System Design Walkthrough');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Google SRE Book — Free Online',
  'Google''s Site Reliability Engineering book. Covers error budgets, SLOs, monitoring, on-call, incident management and eliminating toil. Essential for any reliability-focused engineer.',
  'https://sre.google/sre-book/table-of-contents/',
  'BOOK', 'ADVANCED', 'TECHNOLOGY',
  'https://picsum.photos/seed/sre-google/640/360',
  (SELECT id FROM resource_categories WHERE name = 'System Design' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Google SRE Book — Free Online');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'ByteByteGo System Design Newsletter',
  'Weekly system design deep-dives from the authors of the best-selling system design interview book. Visual diagrams covering URL shorteners, payment systems, search autocomplete and more.',
  'https://blog.bytebytego.com/',
  'ARTICLE', 'INTERMEDIATE', 'TECHNOLOGY',
  'https://picsum.photos/seed/bytebytego/640/360',
  (SELECT id FROM resource_categories WHERE name = 'System Design' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'ByteByteGo System Design Newsletter');

-- ── Algorithms & Data Structures (7 resources) ───────────────────────────────

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Data Structures & Algorithms — Full Free Course (freeCodeCamp)',
  'Six-hour video course covering arrays, linked lists, trees, graphs, sorting and dynamic programming with animated visualizations. Perfect starting point before LeetCode.',
  'https://www.youtube.com/watch?v=RBSGKlAvoiM',
  'VIDEO', 'BEGINNER', 'TECHNOLOGY',
  'https://picsum.photos/seed/dsa-fcc/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Algorithms & Data Structures' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Data Structures & Algorithms — Full Free Course (freeCodeCamp)');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'NeetCode — Blind 75 Solved',
  'Video solutions to every Blind 75 LeetCode problem, explained with clear thinking process, time/space complexity analysis and alternative approaches.',
  'https://neetcode.io/',
  'VIDEO', 'INTERMEDIATE', 'TECHNOLOGY',
  'https://picsum.photos/seed/neetcode-75/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Algorithms & Data Structures' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'NeetCode — Blind 75 Solved');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Big-O Cheat Sheet',
  'The essential reference card for time and space complexity of every common data structure and sorting algorithm. Print it and keep it at your desk.',
  'https://www.bigocheatsheet.com/',
  'ARTICLE', 'BEGINNER', 'TECHNOLOGY',
  'https://picsum.photos/seed/bigo-cheat/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Algorithms & Data Structures' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Big-O Cheat Sheet');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  '14 Patterns to Solve Any Coding Interview Question',
  'Identifies the 14 underlying patterns (sliding window, two pointers, merge intervals, BFS, dynamic programming, etc.) that appear in 90% of coding interview questions.',
  'https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ef',
  'ARTICLE', 'INTERMEDIATE', 'TECHNOLOGY',
  'https://picsum.photos/seed/14patterns/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Algorithms & Data Structures' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = '14 Patterns to Solve Any Coding Interview Question');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'LeetCode Top 150 Interview Questions',
  'The official curated problem set covering all topics tested in FAANG coding rounds. Organized by pattern with difficulty levels and hints.',
  'https://leetcode.com/studyplan/top-interview-150/',
  'QUIZ', 'INTERMEDIATE', 'TECHNOLOGY',
  'https://picsum.photos/seed/lc-top150/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Algorithms & Data Structures' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'LeetCode Top 150 Interview Questions');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Introduction to Algorithms (MIT OpenCourseWare)',
  'MIT''s 6.006 and 6.046 lecture videos for free. Rigorous coverage of recurrences, divide-and-conquer, graph algorithms and NP-completeness.',
  'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/',
  'VIDEO', 'ADVANCED', 'TECHNOLOGY',
  'https://picsum.photos/seed/mit-algo/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Algorithms & Data Structures' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Introduction to Algorithms (MIT OpenCourseWare)');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Cracking the Coding Interview — Author Q&A',
  'Gayle McDowell explains the methodology behind CTCI: how to think out loud, handle hints, recover from bugs and leave interviewers with the right impression.',
  'https://www.youtube.com/watch?v=v4CD1O4zkGI',
  'VIDEO', 'BEGINNER', 'TECHNOLOGY',
  'https://picsum.photos/seed/ctci-author/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Algorithms & Data Structures' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Cracking the Coding Interview — Author Q&A');

-- ── Cloud & DevOps (7 resources) ─────────────────────────────────────────────

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'AWS Cloud Practitioner — Full Exam Prep (freeCodeCamp)',
  'Complete 14-hour AWS CLF-C02 course. Covers IAM, EC2, S3, RDS, Lambda, VPC, CloudFormation and the Well-Architected Framework. Enough to pass the exam and understand cloud fundamentals.',
  'https://www.youtube.com/watch?v=SOTamWNgDKc',
  'VIDEO', 'BEGINNER', 'TECHNOLOGY',
  'https://picsum.photos/seed/aws-ccp/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Cloud & DevOps' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'AWS Cloud Practitioner — Full Exam Prep (freeCodeCamp)');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Docker & Kubernetes — The Practical Guide',
  'Hands-on course: build Docker images, manage volumes, write multi-stage Dockerfiles, deploy to Kubernetes with Helm, configure Ingress and set up CI/CD pipelines.',
  'https://www.youtube.com/watch?v=bhBSlnQcq2k',
  'VIDEO', 'INTERMEDIATE', 'TECHNOLOGY',
  'https://picsum.photos/seed/docker-k8s/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Cloud & DevOps' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Docker & Kubernetes — The Practical Guide');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Kubernetes the Hard Way (Kelsey Hightower)',
  'The gold-standard Kubernetes deep-dive. Bootstrap every component from scratch to understand how control planes, kubelets, etcd and networking actually work.',
  'https://github.com/kelseyhightower/kubernetes-the-hard-way',
  'ARTICLE', 'ADVANCED', 'TECHNOLOGY',
  'https://picsum.photos/seed/k8s-hardway/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Cloud & DevOps' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Kubernetes the Hard Way (Kelsey Hightower)');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'The DevOps Handbook — Summary & Key Concepts',
  'Covers the Three Ways (flow, feedback, continual learning) with real case studies from Netflix, Amazon and Google on deploying hundreds of times per day safely.',
  'https://itrevolution.com/product/the-devops-handbook/',
  'BOOK', 'INTERMEDIATE', 'TECHNOLOGY',
  'https://picsum.photos/seed/devops-hb/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Cloud & DevOps' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'The DevOps Handbook — Summary & Key Concepts');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'GitHub Actions Full Tutorial — CI/CD Pipelines',
  'Build and deploy full CI/CD workflows: linting, testing, Docker builds, Kubernetes deployments, environment secrets and matrix jobs in GitHub Actions.',
  'https://www.youtube.com/watch?v=R8_veQiYBjI',
  'VIDEO', 'INTERMEDIATE', 'TECHNOLOGY',
  'https://picsum.photos/seed/ghactions/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Cloud & DevOps' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'GitHub Actions Full Tutorial — CI/CD Pipelines');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Terraform from Zero to Hero',
  'Learn Infrastructure-as-Code with Terraform: providers, state management, modules, workspaces, remote backends and full AWS/GCP deployment examples.',
  'https://www.youtube.com/watch?v=7xngnjfIlK4',
  'VIDEO', 'INTERMEDIATE', 'TECHNOLOGY',
  'https://picsum.photos/seed/terraform-hero/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Cloud & DevOps' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Terraform from Zero to Hero');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Incident Response & Postmortem Culture at Google',
  'How Google runs blameless postmortems, measures MTTR, and turns incidents into systemic improvements. Includes a template and worked examples.',
  'https://sre.google/workbook/postmortem-culture/',
  'ARTICLE', 'ADVANCED', 'TECHNOLOGY',
  'https://picsum.photos/seed/postmortem/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Cloud & DevOps' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Incident Response & Postmortem Culture at Google');

-- ── Frontend Engineering (6 resources) ───────────────────────────────────────

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'JavaScript Patterns — patterns.dev',
  'Comprehensive free guide to design patterns, rendering patterns and performance patterns in modern JavaScript and React. Covers HOCs, compound components, virtualization and more.',
  'https://www.patterns.dev/',
  'ARTICLE', 'INTERMEDIATE', 'TECHNOLOGY',
  'https://picsum.photos/seed/jspatterns/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Frontend Engineering' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'JavaScript Patterns — patterns.dev');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'React Full Course for Beginners (freeCodeCamp)',
  'Seven-hour zero-to-hero React course: JSX, state, hooks, useEffect, context, forms, routing with React Router and deployment. Build three real projects.',
  'https://www.youtube.com/watch?v=bMknfKXIFA8',
  'VIDEO', 'BEGINNER', 'TECHNOLOGY',
  'https://picsum.photos/seed/react-fcc/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Frontend Engineering' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'React Full Course for Beginners (freeCodeCamp)');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Web.dev — Core Web Vitals & Performance',
  'Google''s official guide to measuring and optimizing LCP, INP and CLS. Includes lab tools, field data, optimization techniques and before/after case studies.',
  'https://web.dev/explore/performance',
  'ARTICLE', 'INTERMEDIATE', 'TECHNOLOGY',
  'https://picsum.photos/seed/webvitals/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Frontend Engineering' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Web.dev — Core Web Vitals & Performance');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'TypeScript Full Course — Zero to Expert',
  'From TypeScript basics (types, interfaces, generics) to advanced patterns (conditional types, mapped types, template literal types) and integration with React and Node.',
  'https://www.youtube.com/watch?v=30LWjhZzg50',
  'VIDEO', 'INTERMEDIATE', 'TECHNOLOGY',
  'https://picsum.photos/seed/ts-full/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Frontend Engineering' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'TypeScript Full Course — Zero to Expert');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Syntax.fm — The Web Developer Podcast',
  'Weekly podcast by Wes Bos & Scott Tolinski covering the latest in JavaScript, CSS, tooling, frameworks and developer experience. 700+ episodes of practical advice.',
  'https://syntax.fm/',
  'PODCAST', 'INTERMEDIATE', 'TECHNOLOGY',
  'https://picsum.photos/seed/syntaxfm/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Frontend Engineering' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Syntax.fm — The Web Developer Podcast');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'The Accessibility Project — Inclusive Web Development',
  'A community-driven guide to web accessibility: WCAG checklist, ARIA patterns, keyboard navigation, screen reader testing and color contrast tools.',
  'https://www.a11yproject.com/',
  'ARTICLE', 'BEGINNER', 'TECHNOLOGY',
  'https://picsum.photos/seed/a11y/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Frontend Engineering' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'The Accessibility Project — Inclusive Web Development');

-- ── AI & Machine Learning (7 resources) ──────────────────────────────────────

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'ChatGPT Prompt Engineering for Developers (DeepLearning.ai)',
  'Free one-hour course by Isa Fulford & Andrew Ng. Covers prompt principles, iterative refinement, summarization, inference, transformation and building a chatbot. Practical Jupyter notebooks.',
  'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/',
  'VIDEO', 'BEGINNER', 'TECHNOLOGY',
  'https://picsum.photos/seed/prompt-eng/640/360',
  (SELECT id FROM resource_categories WHERE name = 'AI & Machine Learning' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'ChatGPT Prompt Engineering for Developers (DeepLearning.ai)');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Neural Networks: Zero to Hero — Andrej Karpathy',
  'Build everything from scratch in Python: micrograd, makemore, GPT. The best practical deep-learning series on the internet, from the former Tesla AI Director.',
  'https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ',
  'VIDEO', 'INTERMEDIATE', 'TECHNOLOGY',
  'https://picsum.photos/seed/karpathy/640/360',
  (SELECT id FROM resource_categories WHERE name = 'AI & Machine Learning' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Neural Networks: Zero to Hero — Andrej Karpathy');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'RAG from Scratch — LangChain Tutorial',
  'Build a Retrieval-Augmented Generation pipeline from zero: document loaders, text splitters, embeddings, vector stores, retrievers and a Q&A chain with source citations.',
  'https://www.youtube.com/watch?v=sVcwVQRHIc8',
  'VIDEO', 'INTERMEDIATE', 'TECHNOLOGY',
  'https://picsum.photos/seed/rag-lc/640/360',
  (SELECT id FROM resource_categories WHERE name = 'AI & Machine Learning' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'RAG from Scratch — LangChain Tutorial');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Attention Is All You Need — The Transformer Paper',
  'The 2017 Google Brain paper that introduced the Transformer architecture. Essential reading for understanding the foundation of every modern LLM.',
  'https://arxiv.org/abs/1706.03762',
  'ARTICLE', 'ADVANCED', 'TECHNOLOGY',
  'https://picsum.photos/seed/transformer/640/360',
  (SELECT id FROM resource_categories WHERE name = 'AI & Machine Learning' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Attention Is All You Need — The Transformer Paper');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Fast.ai — Practical Deep Learning for Coders',
  'World-class free course: top-down approach to deep learning with PyTorch. Chapter 1 to fine-tuning LLMs, vision models, tabular data and recommendation systems.',
  'https://www.fast.ai/',
  'VIDEO', 'INTERMEDIATE', 'TECHNOLOGY',
  'https://picsum.photos/seed/fastai/640/360',
  (SELECT id FROM resource_categories WHERE name = 'AI & Machine Learning' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Fast.ai — Practical Deep Learning for Coders');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'ML Engineering for Production (MLOps) — Coursera',
  'Andrew Ng''s MLOps specialization: model deployment, data drift, pipelines, monitoring and A/B testing in production. Four-course series with hands-on labs.',
  'https://www.coursera.org/specializations/machine-learning-engineering-for-production-mlops',
  'VIDEO', 'ADVANCED', 'TECHNOLOGY',
  'https://picsum.photos/seed/mlops/640/360',
  (SELECT id FROM resource_categories WHERE name = 'AI & Machine Learning' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'ML Engineering for Production (MLOps) — Coursera');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Hugging Face NLP Course — Free',
  'The official Hugging Face course: tokenizers, transformers, fine-tuning, datasets, evaluation and deployment with the Inference API. Fully free with notebooks.',
  'https://huggingface.co/learn/nlp-course',
  'ARTICLE', 'INTERMEDIATE', 'TECHNOLOGY',
  'https://picsum.photos/seed/hf-nlp/640/360',
  (SELECT id FROM resource_categories WHERE name = 'AI & Machine Learning' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Hugging Face NLP Course — Free');

-- ── Behavioral Interviews (7 resources) ──────────────────────────────────────

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Tell Me About Yourself — Perfect Answer Formula',
  'The definitive guide to answering the most common interview opener. Covers the Present-Past-Future formula, what to leave out and how to tailor the answer to any role.',
  'https://www.youtube.com/watch?v=kayOhGRcNt0',
  'VIDEO', 'BEGINNER', 'CONSULTING',
  'https://picsum.photos/seed/tmay/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Behavioral Interviews' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Tell Me About Yourself — Perfect Answer Formula');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'STAR Method Complete Guide with 30 Examples',
  'Situation, Task, Action, Result explained with 30 worked examples across leadership, conflict, failure, and innovation. Includes a personal story bank template.',
  'https://www.themuse.com/advice/star-interview-method',
  'ARTICLE', 'BEGINNER', 'CONSULTING',
  'https://picsum.photos/seed/star-method/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Behavioral Interviews' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'STAR Method Complete Guide with 30 Examples');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Amazon Leadership Principles — Full Interview Prep',
  'Deep dive into all 16 Amazon Leadership Principles with example questions, ideal answer structures and real stories that demonstrate each principle.',
  'https://www.amazon.jobs/content/en/our-workplace/leadership-principles',
  'ARTICLE', 'INTERMEDIATE', 'CONSULTING',
  'https://picsum.photos/seed/amazon-lp/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Behavioral Interviews' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Amazon Leadership Principles — Full Interview Prep');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  '30 Behavioral Interview Questions & Model Answers',
  'Video walkthrough of the 30 most common behavioral questions at FAANG. Includes model STAR answers, common mistakes and delivery tips for nervous interviewees.',
  'https://www.youtube.com/watch?v=0cj89M2_yFk',
  'VIDEO', 'INTERMEDIATE', 'CONSULTING',
  'https://picsum.photos/seed/30behav/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Behavioral Interviews' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = '30 Behavioral Interview Questions & Model Answers');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'How to Answer "What is Your Greatest Weakness?"',
  'Turns the most dreaded interview question into an opportunity. Three frameworks (genuine-growth, skill-irrelevant, reframe) with worked examples for each.',
  'https://www.youtube.com/watch?v=BuXwHsYOLMQ',
  'VIDEO', 'BEGINNER', 'CONSULTING',
  'https://picsum.photos/seed/weakness-q/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Behavioral Interviews' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'How to Answer "What is Your Greatest Weakness?"');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Salary Negotiation: How to Negotiate a Job Offer',
  'Evidence-based negotiation tactics from an MIT researcher. Scripts for counter-offers, multiple competing offers, equity negotiation and avoiding common mistakes.',
  'https://www.youtube.com/watch?v=km2Hd_xgo9Q',
  'VIDEO', 'INTERMEDIATE', 'CONSULTING',
  'https://picsum.photos/seed/salary-neg/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Behavioral Interviews' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Salary Negotiation: How to Negotiate a Job Offer');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Behavioral Interview Practice Questions Bank',
  'Interactive question bank with 120 behavioral questions sorted by theme (leadership, conflict, failure, ambiguity). Track which you have answered and score your responses.',
  'https://www.tryexponent.com/practice/behavioral',
  'QUIZ', 'INTERMEDIATE', 'CONSULTING',
  'https://picsum.photos/seed/behav-bank/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Behavioral Interviews' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Behavioral Interview Practice Questions Bank');

-- ── Product Management (6 resources) ──────────────────────────────────────────

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Inspired: How to Create Products Customers Love (SVPG)',
  'Marty Cagan''s seminal PM book: empowered product teams, discovery vs delivery, OKRs and the role of the product manager at world-class companies.',
  'https://www.svpg.com/books/inspired-how-to-create-tech-products-customers-love-2nd-edition/',
  'BOOK', 'INTERMEDIATE', 'CONSULTING',
  'https://picsum.photos/seed/inspired-pm/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Product Management' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Inspired: How to Create Products Customers Love (SVPG)');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Lenny''s Newsletter & Podcast — Product Strategy',
  'Weekly deep dives on metrics, growth, retention and product strategy from ex-Airbnb PM Lenny Rachitsky. Interviews with PMs from Slack, Figma, Notion and Stripe.',
  'https://www.lennysnewsletter.com/',
  'PODCAST', 'INTERMEDIATE', 'CONSULTING',
  'https://picsum.photos/seed/lennys/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Product Management' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Lenny''s Newsletter & Podcast — Product Strategy');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Product Sense Interview — Step-by-Step Framework',
  'How to design a product for any prompt: clarify goals, identify users, prioritize pain points, brainstorm solutions, define metrics and prioritize features.',
  'https://www.youtube.com/watch?v=yUOC-Y0f5ZQ',
  'VIDEO', 'BEGINNER', 'CONSULTING',
  'https://picsum.photos/seed/prod-sense/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Product Management' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Product Sense Interview — Step-by-Step Framework');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Working Backwards — Amazon''s Product Approach',
  'How Amazon uses Press Releases and FAQs to start from the customer and work backwards. Includes real examples and a template you can use today.',
  'https://www.productboard.com/blog/working-backwards-amazon-product-approach/',
  'ARTICLE', 'INTERMEDIATE', 'CONSULTING',
  'https://picsum.photos/seed/working-back/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Product Management' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Working Backwards — Amazon''s Product Approach');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'OKRs at Google — How Objectives & Key Results Work',
  'The definitive video on how Google uses OKRs from John Doerr. Covers setting ambitious objectives, defining measurable key results and avoiding common OKR pitfalls.',
  'https://www.youtube.com/watch?v=mJB83EZtAjc',
  'VIDEO', 'INTERMEDIATE', 'CONSULTING',
  'https://picsum.photos/seed/okr-google/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Product Management' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'OKRs at Google — How Objectives & Key Results Work');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'ProductHunt Interview Playbook — Practice Questions',
  'Interactive bank of 80+ PM interview questions: product design, strategy, estimation, metrics and execution. Includes community answer examples and scoring rubrics.',
  'https://www.productmanagementexercises.com/',
  'QUIZ', 'INTERMEDIATE', 'CONSULTING',
  'https://picsum.photos/seed/pm-exercise/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Product Management' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'ProductHunt Interview Playbook — Practice Questions');

-- ── Case Interviews (6 resources) ────────────────────────────────────────────

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'McKinsey Case Interview — Full Example with Feedback',
  'Official McKinsey video of a full 45-minute case interview with candidate and interviewer debrief. Best way to understand what interviewers actually look for.',
  'https://www.youtube.com/watch?v=0nVeFtSYItQ',
  'VIDEO', 'BEGINNER', 'CONSULTING',
  'https://picsum.photos/seed/mckinsey-case/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Case Interviews' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'McKinsey Case Interview — Full Example with Feedback');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Case Interview Frameworks — The Complete Reference',
  'Every framework you need: profitability, market entry, M&A, pricing, growth, operations and due diligence. Includes decision trees for selecting the right framework.',
  'https://www.consultingprep.com/case-interview-frameworks/',
  'ARTICLE', 'BEGINNER', 'CONSULTING',
  'https://picsum.photos/seed/case-fw/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Case Interviews' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Case Interview Frameworks — The Complete Reference');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Mental Math for Consulting Interviews',
  'Master the estimation tricks top consultants use: rounding, percentage shortcuts, market sizing heuristics and practice problems at interview speed.',
  'https://www.preplounge.com/en/bootcamp.php/case-interview-maths',
  'ARTICLE', 'INTERMEDIATE', 'CONSULTING',
  'https://picsum.photos/seed/mental-math/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Case Interviews' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Mental Math for Consulting Interviews');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'BCG Case Interview — Practice with a Current Consultant',
  'A BCG consultant walks through a real market sizing and profitability case, explaining how to structure your thinking, ask for data and build recommendations.',
  'https://www.youtube.com/watch?v=T8eKdqJzFRw',
  'VIDEO', 'INTERMEDIATE', 'CONSULTING',
  'https://picsum.photos/seed/bcg-case/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Case Interviews' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'BCG Case Interview — Practice with a Current Consultant');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'PrepLounge — Interactive Case Practice Platform',
  'The leading platform for consulting case practice: 2,000+ cases, peer matching, video practice and feedback from McKinsey/BCG/Bain alumni coaches.',
  'https://www.preplounge.com/',
  'QUIZ', 'INTERMEDIATE', 'CONSULTING',
  'https://picsum.photos/seed/preplounge/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Case Interviews' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'PrepLounge — Interactive Case Practice Platform');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Hypothesis-Driven Problem Solving — McKinsey Method',
  'How McKinsey consultants use hypothesis trees, MECE thinking and issue trees to structure ambiguous business problems. With a worked client engagement example.',
  'https://www.youtube.com/watch?v=kDwR6Ey8juw',
  'VIDEO', 'ADVANCED', 'CONSULTING',
  'https://picsum.photos/seed/hypothesis/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Case Interviews' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Hypothesis-Driven Problem Solving — McKinsey Method');

-- ── Personal Finance & Investing (7 resources) ────────────────────────────────

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'The Psychology of Money — 20 Lessons (Book Summary)',
  'Morgan Housel''s key lessons: wealth is what you don''t spend, luck vs skill, tails drive everything, and why reasonable > rational for long-term investing.',
  'https://www.youtube.com/watch?v=ZLwJxuCbxMM',
  'VIDEO', 'BEGINNER', 'FINANCE',
  'https://picsum.photos/seed/psych-money/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Personal Finance & Investing' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'The Psychology of Money — 20 Lessons (Book Summary)');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'How to Build a Zero-Based Budget That Works',
  'Step-by-step guide to zero-based budgeting: tracking every dollar, separating fixed vs variable expenses, automating savings and recovering from over-spending.',
  'https://www.ramitsethi.com/guides/',
  'ARTICLE', 'BEGINNER', 'FINANCE',
  'https://picsum.photos/seed/zero-budget/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Personal Finance & Investing' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'How to Build a Zero-Based Budget That Works');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Index Funds vs Active Investing — The Data',
  'Evidence-based breakdown of why 92% of actively managed funds underperform their index benchmark over 20 years. How to build a three-fund portfolio.',
  'https://www.youtube.com/watch?v=fvGLnthJDsg',
  'VIDEO', 'INTERMEDIATE', 'FINANCE',
  'https://picsum.photos/seed/index-funds/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Personal Finance & Investing' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Index Funds vs Active Investing — The Data');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Financial Independence: The 4% Rule Explained',
  'The Trinity Study, safe withdrawal rates, sequence-of-returns risk and how to calculate your FI number. Includes calculators and common objections addressed.',
  'https://www.mrmoneymustache.com/2012/05/29/how-much-do-i-need-for-retirement/',
  'ARTICLE', 'INTERMEDIATE', 'FINANCE',
  'https://picsum.photos/seed/4pct-rule/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Personal Finance & Investing' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Financial Independence: The 4% Rule Explained');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Planet Money — Economics Made Understandable',
  'NPR''s award-winning economics podcast. Each 20-min episode explains one economic concept through a compelling real-world story. 1,000+ episodes archived.',
  'https://www.npr.org/podcasts/510289/planet-money',
  'PODCAST', 'BEGINNER', 'FINANCE',
  'https://picsum.photos/seed/planet-money/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Personal Finance & Investing' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Planet Money — Economics Made Understandable');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'The Intelligent Investor — Key Chapters Explained',
  'Benjamin Graham''s chapter-by-chapter breakdown: Mr. Market, margin of safety, defensive vs enterprising investor and why most investors should just buy an index fund.',
  'https://www.youtube.com/watch?v=R52KOQLFnoo',
  'VIDEO', 'ADVANCED', 'FINANCE',
  'https://picsum.photos/seed/intell-inv/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Personal Finance & Investing' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'The Intelligent Investor — Key Chapters Explained');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Personal Finance 101 — Complete Bogleheads Guide',
  'The Bogleheads investment philosophy: live below your means, never carry high-interest debt, tax-advantaged accounts, three-fund portfolio, rebalancing and staying the course.',
  'https://www.bogleheads.org/wiki/Bogleheads%27_investment_philosophy',
  'ARTICLE', 'BEGINNER', 'FINANCE',
  'https://picsum.photos/seed/bogleheads/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Personal Finance & Investing' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Personal Finance 101 — Complete Bogleheads Guide');

-- ── Growth Marketing (6 resources) ───────────────────────────────────────────

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'AARRR Pirate Metrics — Growth Framework Explained',
  'Dave McClure''s Acquisition-Activation-Retention-Revenue-Referral framework: how to measure each stage, identify your biggest leak and prioritize growth experiments.',
  'https://www.youtube.com/watch?v=irjgfW0BIrw',
  'VIDEO', 'BEGINNER', 'MARKETING',
  'https://picsum.photos/seed/aarrr/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Growth Marketing' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'AARRR Pirate Metrics — Growth Framework Explained');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Andrew Chen''s Essays on Growth & Virality',
  'Archive of 300+ essays from the a16z general partner and author of The Cold Start Problem. Deep dives on network effects, viral loops and growth plateaus.',
  'https://andrewchen.com/',
  'ARTICLE', 'ADVANCED', 'MARKETING',
  'https://picsum.photos/seed/andrew-chen/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Growth Marketing' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Andrew Chen''s Essays on Growth & Virality');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Google Analytics 4 Full Course — From Zero',
  'Complete GA4 setup and analysis course: events, conversions, audiences, attribution, Looker Studio dashboards and migration from Universal Analytics.',
  'https://www.youtube.com/watch?v=Zk8Ty78gHOA',
  'VIDEO', 'INTERMEDIATE', 'MARKETING',
  'https://picsum.photos/seed/ga4/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Growth Marketing' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Google Analytics 4 Full Course — From Zero');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Building a Content-Led Growth Engine',
  'How HubSpot, Ahrefs and Notion grew to millions of users through content. Covers SEO strategy, topical authority, distribution, repurposing and measuring content ROI.',
  'https://www.youtube.com/watch?v=WGBjxJLzqVM',
  'VIDEO', 'INTERMEDIATE', 'MARKETING',
  'https://picsum.photos/seed/content-led/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Growth Marketing' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Building a Content-Led Growth Engine');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'My First Million — Startup Ideas & Business Models',
  'Sam Parr & Shaan Puri break down business models, growth strategies and founder stories. One of the top business podcasts for aspiring entrepreneurs.',
  'https://www.mfmpod.com/',
  'PODCAST', 'INTERMEDIATE', 'MARKETING',
  'https://picsum.photos/seed/mfm/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Growth Marketing' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'My First Million — Startup Ideas & Business Models');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'A/B Testing Mastery — Statistical Significance Explained',
  'How to design valid A/B tests: sample size calculation, avoiding peeking, multi-variate tests, novelty effects and making decisions from inconclusive results.',
  'https://www.optimizely.com/optimization-glossary/ab-testing/',
  'ARTICLE', 'INTERMEDIATE', 'MARKETING',
  'https://picsum.photos/seed/abtesting/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Growth Marketing' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'A/B Testing Mastery — Statistical Significance Explained');

-- ── Learning Science (6 resources) ───────────────────────────────────────────

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Learning How to Learn — Free Coursera Course',
  'The most enrolled online course ever. Barbara Oakley and Terry Sejnowski explain focused vs diffuse mode, spaced repetition, chunking and the Pomodoro technique.',
  'https://www.coursera.org/learn/learning-how-to-learn',
  'VIDEO', 'BEGINNER', 'EDUCATION',
  'https://picsum.photos/seed/learn-learn/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Learning Science' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Learning How to Learn — Free Coursera Course');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Make It Stick: The Science of Successful Learning',
  'Cognitive science research distilled into practice: retrieval practice beats re-reading, interleaving beats blocked practice, and desirable difficulties enhance retention.',
  'https://www.hup.harvard.edu/catalog.php?isbn=9780674729018',
  'BOOK', 'INTERMEDIATE', 'EDUCATION',
  'https://picsum.photos/seed/make-it-stick/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Learning Science' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Make It Stick: The Science of Successful Learning');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'The Feynman Technique — Learn Anything Faster',
  'Richard Feynman''s four-step method: study the topic, teach it to a child, identify gaps, go back and simplify. Demonstrated with a complex concept in real time.',
  'https://www.youtube.com/watch?v=_f-qkGJBPts',
  'VIDEO', 'BEGINNER', 'EDUCATION',
  'https://picsum.photos/seed/feynman/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Learning Science' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'The Feynman Technique — Learn Anything Faster');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Spaced Repetition: The Complete Guide',
  'The science of the forgetting curve and how spaced repetition software (Anki) can make you remember almost anything indefinitely with minimal daily review time.',
  'https://www.masterofmemory.com/spaced-repetition/',
  'ARTICLE', 'INTERMEDIATE', 'EDUCATION',
  'https://picsum.photos/seed/spaced-rep/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Learning Science' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Spaced Repetition: The Complete Guide');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Deliberate Practice — The Science of Expert Performance',
  'James Clear on Anders Ericsson''s research: why naive practice plateaus, how deliberate practice works, the role of coaches and how to design practice sessions.',
  'https://jamesclear.com/deliberate-practice-theory',
  'ARTICLE', 'ADVANCED', 'EDUCATION',
  'https://picsum.photos/seed/delib-prac/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Learning Science' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Deliberate Practice — The Science of Expert Performance');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Building a Second Brain — Tiago Forte Method',
  'How to capture, organise and share your knowledge using a digital note-taking system. CODE method: Capture, Organise, Distill, Express. Works with any tool.',
  'https://www.youtube.com/watch?v=OP3dA2GcAh8',
  'VIDEO', 'INTERMEDIATE', 'EDUCATION',
  'https://picsum.photos/seed/basb/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Learning Science' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Building a Second Brain — Tiago Forte Method');

-- ── Digital Health (7 resources) ──────────────────────────────────────────────

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Introduction to Digital Health — WHO & FutureLearn',
  'Free WHO-backed course: telemedicine, electronic health records, health informatics, mobile health apps and the global landscape of digital health innovation.',
  'https://www.futurelearn.com/courses/digital-health',
  'VIDEO', 'BEGINNER', 'HEALTHCARE',
  'https://picsum.photos/seed/digi-health/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Digital Health' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Introduction to Digital Health — WHO & FutureLearn');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'AI in Healthcare — Stanford Medicine Podcast',
  'Stanford Medicine faculty discuss clinical AI applications: radiology AI, NLP for clinical notes, sepsis prediction models and the challenges of AI deployment in hospitals.',
  'https://open.spotify.com/show/5Bk4P7FvlGnGrW8vFiZ8Nt',
  'PODCAST', 'INTERMEDIATE', 'HEALTHCARE',
  'https://picsum.photos/seed/ai-health/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Digital Health' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'AI in Healthcare — Stanford Medicine Podcast');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'FDA Digital Health Center of Excellence — Guidance',
  'Official FDA guidelines for Software as a Medical Device (SaMD), AI/ML in medical devices, predetermined change control plans and clinical decision support software.',
  'https://www.fda.gov/medical-devices/digital-health-center-excellence',
  'ARTICLE', 'ADVANCED', 'HEALTHCARE',
  'https://picsum.photos/seed/fda-digital/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Digital Health' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'FDA Digital Health Center of Excellence — Guidance');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Building Health Tech Products — Andreessen Horowitz',
  'a16z''s bio team on the unique challenges of health-tech: FDA pathways, reimbursement, clinical validation, EHR integration and navigating the US health system.',
  'https://a16z.com/category/bio-health/',
  'ARTICLE', 'INTERMEDIATE', 'HEALTHCARE',
  'https://picsum.photos/seed/a16z-health/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Digital Health' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Building Health Tech Products — Andreessen Horowitz');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'HIPAA Compliance for Engineers — Full Guide',
  'Technical guide to HIPAA: PHI definition, covered entities, BAAs, encryption requirements, audit logs, breach notification and what engineers must do to stay compliant.',
  'https://www.aptible.com/hipaa/',
  'ARTICLE', 'INTERMEDIATE', 'HEALTHCARE',
  'https://picsum.photos/seed/hipaa/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Digital Health' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'HIPAA Compliance for Engineers — Full Guide');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'Telemedicine Product Design — Real Case Studies',
  'How Teladoc, Hims, and One Medical designed their patient experience: triage flows, provider matching, prescription delivery and retention in telehealth.',
  'https://www.mckinsey.com/industries/healthcare/our-insights/telehealth-a-quarter-trillion-dollar-post-covid-19-reality',
  'ARTICLE', 'ADVANCED', 'HEALTHCARE',
  'https://picsum.photos/seed/telemed/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Digital Health' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'Telemedicine Product Design — Real Case Studies');

INSERT INTO resources (id, title, description, url, type, level, industry, thumb_url, category_id, created_at, updated_at)
SELECT gen_random_uuid(),
  'HL7 FHIR for Developers — Getting Started',
  'FHIR R4 specification explained for developers: resources, REST API, OAuth SMART on FHIR, bulk export and how to integrate with major EHR systems.',
  'https://www.hl7.org/fhir/overview.html',
  'ARTICLE', 'ADVANCED', 'HEALTHCARE',
  'https://picsum.photos/seed/fhir/640/360',
  (SELECT id FROM resource_categories WHERE name = 'Digital Health' LIMIT 1), now(), now()
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE title = 'HL7 FHIR for Developers — Getting Started');

COMMIT;
