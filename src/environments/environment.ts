// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: '*',
  //apiAuthUrl: 'http://localhost:5000/api/v1',
  //apiGestionUrl: 'http://localhost:5010/api/v1',
  apiAuthUrl: 'https://autenticacion-service.azurewebsites.net/api/v1',
  apiGestionUrl: 'https://gestion-service.azurewebsites.net/api/v1',
  apiPatronesMedidasUrl: 'https://patrones-medidas-service.azurewebsites.net/api',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
