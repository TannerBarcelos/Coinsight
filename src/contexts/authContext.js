import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

// Create a new context instance
const AuthContext = createContext();

// Create our Provider - this is the function which will contain functions and variables we can use globally in the app
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  const signUp = async (email, password) =>
    createUserWithEmailAndPassword(auth, email, password); //firebase func for auth with email and pass

  const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password); //firebase func for auth with email and pass

  const logOut = () => signOut(auth); //firebase func for auth to logout

  // listen for auth changes from the server (Firebase)
  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  const value = {
    currentUser,
    signUp,
    signIn,
    logOut,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Export our context as a hook to use anywhere to hook into our data
export const useAuth = () => useContext(AuthContext);
// Can see all auth docs on firebase website - their docs are immaculate
