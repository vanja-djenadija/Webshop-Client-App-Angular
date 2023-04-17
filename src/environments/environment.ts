// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: false,
  API_URL: 'http://localhost:9000',
  JWT_KEY: "jwt-webshop",
  REFRESH_TOKEN_KEY: 'refresh-webshop',
  USER_KEY: 'user-webshop',
  HTTP_OPTIONS_KEY: 'http-options-key',
  firebase: {
    apiKey: "AIzaSyBE8SDKQSjXPyvDEhOHvHbrvjqIhSGv59g",
    authDomain: "webshop-image.firebaseapp.com",
    projectId: "webshop-image",
    storageBucket: "webshop-image.appspot.com",
    messagingSenderId: "883524624017",
    appId: "1:883524624017:web:b3a730dc05396d4e906930",
    measurementId: "G-RHMWRH7KFE"
  }
};


const app = initializeApp(environment.firebase);
const storage = getStorage(app);
getAnalytics(app);
export default storage;
