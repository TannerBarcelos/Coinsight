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
  const [isAuth, setIsAuth] = useState(false);
  const [popupAuthMessage, setPopupAuthMessage] = useState('');

  const signUp = async (email, password) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredentials;
      setCurrentUser(user);
      setIsAuth(true);
      setPopupAuthMessage('Successfully registered! Enjoy the app');
    } catch (error) {
      setIsAuth(false);
      setPopupAuthMessage('An error has occured with registration');
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
      setIsAuth(true);
      setPopupAuthMessage('Successfully logged in');
    } catch (error) {
      setIsAuth(false);
      setPopupAuthMessage('There was a problem signing in');
    }
  };

  const value = {
    currentUser,
    isAuth,
    signUp,
    signIn,
    popupAuthMessage,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
