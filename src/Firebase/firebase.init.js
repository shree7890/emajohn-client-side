import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

// initialize app

const initializeAuthentication = () => {
  initializeApp(firebaseConfig);
};

export default initializeAuthentication;
