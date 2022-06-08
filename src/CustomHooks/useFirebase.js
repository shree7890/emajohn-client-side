import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from "../Firebase/firebase.init";
initializeAuthentication();
const useFirebase = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const signup = async (email, password, username) => {
    setIsLoading(true);
    //create user
    await createUserWithEmailAndPassword(auth, email, password);
    // update profile

    await updateProfile(auth.currentUser, {
      displayName: username,
    });
    const user = auth.currentUser;
    setCurrentUser({ ...user });
    setIsLoading(false);
  };
  // login email and password
  const login = (email, password) => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setCurrentUser(result.user);
      })
      .finally(() => setIsLoading(false));
  };
  // logout

  const logout = () => {
    return signOut(auth);
  };

  // state observer

  useEffect(() => {
    const unSubsCribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser({});
      }
      setIsLoading(false);
    });

    return unSubsCribe;
  }, []);

  // google sign in
  const googleSignIn = () => {
    setIsLoading(true);
    return signInWithPopup(auth, googleProvider)
      .then((result) => {
        setCurrentUser(result.user);
      })
      .finally(() => setIsLoading(false));
  };

  return {
    currentUser,
    login,
    logout,
    signup,
    setCurrentUser,
    googleSignIn,
    isLoading,
  };
};

export default useFirebase;
