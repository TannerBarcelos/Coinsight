import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [isAuth, setIsAuth] = useState(false);

  const signUp = async (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // listen for auth changes from the server (Firebase)
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsAuth(true);
    });
    return unsub;
  }, []);

  const value = {
    currentUser,
    isAuth,
    signUp,
    signIn,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
