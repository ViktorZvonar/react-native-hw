import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";

const authRegister = createAsyncThunk(
  "auth/register",
  async ({ email, password, login }, { rejectWithValue }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await Promise.all([
        updateProfile(user, { displayName: login }),
        updateEmail(user, email),
      ]);
      console.log("User data after registration:", user);
      return {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
      };
    } catch ({ response }) {
      const { status, data } = response;
      const error = {
        status,
        message: data._message,
      };
      return rejectWithValue(error);
    }
  }
);

const authLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { uid, displayName, email: userEmail } = credentials.user;
      console.log("User data after login:", {
        uid,
        displayName,
        email: userEmail,
      });
      return { uid, displayName, email: userEmail };
    } catch ({ response }) {
      const { status, data } = response;
      const error = {
        status,
        message: data.message,
      };
      return rejectWithValue(error);
    }
  }
);

const authLogOut = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const result = await signOut(auth);
      return result;
    } catch ({ response }) {
      const { status, data } = response;
      const error = {
        status,
        message: data.message,
      };
      return rejectWithValue(error);
    }
  }
);

const authStateChange = createAsyncThunk(
  "auth/stateChange",
  async (_, { rejectWithValue }) => {
    try {
      const result = await new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
          auth,
          async (user) => {
            if (user) {
              const { uid, displayName, email } = user;
              await updateProfile(user, { displayName });
              resolve({ uid, displayName, email, isAuth: true });
            } else {
              resolve({ isAuth: false });
            }
          },
          (error) => {
            reject(error);
          }
        );

        return () => unsubscribe();
      });
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export { authRegister, authLogOut, authLogin, authStateChange };
