/*export const environment = {
  production: false,
  apiUrl: 'http://localhost:8081',
  keycloak: {
    url: 'http://localhost:8082',
    realm: 'myapp-realm',
    clientId: 'angular-client'
  }
};
*/

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8081',
  quizApiUrl: 'http://localhost:8082',
  keycloak: {
    url: 'http://localhost:8780',
    realm: 'myapp-realm',
    clientId: 'angular-client'
  },
  initOptions: {
    onLoad: 'check-sso', // Ou 'login-required' pour forcer le login
    checkLoginIframe: false // ❌ DESACTIVE CECI (très important pour le local)
  }
};