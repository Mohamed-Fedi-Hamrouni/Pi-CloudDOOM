export const environment = {
  production: false,
  apiUrl: 'http://localhost:8081',
  interviewApiUrl: 'http://localhost:8082',
  trainingApiUrl: 'http://localhost:8083',
  mentorshipApiUrl: 'http://localhost:8084',
  quizApiUrl: 'http://localhost:8085',
  communityApiUrl: 'http://localhost:8086',
  resourceApiUrl: 'http://localhost:8087',
  kokoroUrl: "/kokoro",
   
  simli: {
    enabled: true,
    apiKey: "137oepkxxr7ofk6mi69alo",
    faceId: "cace3ef7-a4c4-425d-a8cf-a5358eb0c427",
  },
  keycloak: {
    url: 'http://localhost:8080',
    realm: 'myapp-realm',
    clientId: 'angular-client'
  }

};
