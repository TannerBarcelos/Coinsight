import React, { createContext, useContext, useState } from 'react';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  const signUp = async (email, password) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredentials;
      setCurrentUser(user);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async (email, password) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredentials;
      setCurrentUser(user);
      console.log(user);
    } catch (error) {
      console.log('Code', error.code);
      console.log('Message', error.message);
    }
  };

  const value = {
    currentUser,
    signUp,
    signIn,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
