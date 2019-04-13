// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const API_URL = process.env.API_URL;

export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyCQT5guyAxftXF0yMRUbiFSKzri7PcFWPo",
    authDomain: "dungeons-a0a52.firebaseapp.com",
    databaseURL: "https://dungeons-a0a52.firebaseio.com",
    projectId: "dungeons-a0a52",
    storageBucket: "dungeons-a0a52.appspot.com",
    messagingSenderId: "60302596117"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
