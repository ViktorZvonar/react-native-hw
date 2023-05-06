import { createSlice } from "@reduxjs/toolkit";
import {
  authRegister,
  authLogin,
  authLogOut,
  authStateChange,
} from "./authOperations";

const initialState = {
  userId: null,
  login: null,
  email: null,
  loading: false,
  error: null,
  isLogin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => {
      state.userId = payload.id;
      state.login = payload.login;
      state.email = payload.email;
    },
  },

  extraReducers: {
    [authRegister.pending]: (store) => {
      store.loading = true;
      store.error = null;
    },
    [authRegister.fulfilled]: (store, { payload }) => {
      store.loading = false;
      const { uid, displayName, email } = payload;
      store.userId = uid;
      store.login = displayName;
      store.email = email;
      store.isLogin = true;
    },
    [authRegister.rejected]: (store, { payload }) => {
      store.error = payload;
    },

    [authLogin.pending]: (store) => {
      store.loading = true;
      store.error = null;
    },
    [authLogin.fulfilled]: (store, { payload }) => {
      store.loading = false;
      const { uid, displayName, email } = payload;
      store.userId = uid;
      store.login = displayName;
      store.email = email;
      store.isLogin = true;
    },
    [authLogin.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },

    [authLogOut.pending]: (store) => {
      store.loading = true;
      store.error = null;
    },
    [authLogOut.fulfilled]: (store) => {
      store.userId = null;
      store.login = null;
      store.email = null;
      store.loading = false;
      store.isLogin = false;
    },
    [authLogOut.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },

    [authStateChange.pending]: (store) => {
      store.loading = true;
      store.error = null;
    },
    [authStateChange.fulfilled]: (store, { payload }) => {
      store.isLogin = payload;
      store.loading = false;
    },
    [authStateChange.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
  },
});

export default authSlice.reducer;

// [authCurrent.pending]: (store) => {
//   store.loading = true;
//   store.error = null;
// },
// [authCurrent.fulfilled]: (store, { payload }) => {
//   store.loading = false;
//   const { uid, displayName, email } = payload;
//   store.userId = uid;
//   store.login = displayName;
//   store.email = email;
// },
// [authCurrent.rejected]: (store, { payload }) => {
//   store.loading = false;
//   store.error = payload;
// },
