import { createSlice } from '@reduxjs/toolkit';
import { authInitState } from './auth.init-state';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {
  authLoginThunk,
  authLogoutThunk,
  authRefreshUserThunk,
  authRegisterThunk,
} from './auth.operations';

// const handlePending = state => {
//   state.isLoading = true;
// };

const handleAuthError = (state, { error }) => {
  state.user = { name: null, email: null };
  state.isLoggedIn = false;
  state.token = null;
  state.error = error;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitState,
  extraReducers: builder => {
    builder
      .addCase(authLoginThunk.pending, state => (state.isLoading = true))
      .addCase(authLoginThunk.rejected, handleAuthError)
      .addCase(authLoginThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(authRegisterThunk.pending, state => (state.isLoading = true))
      .addCase(authRegisterThunk.rejected, handleAuthError)
      .addCase(authRegisterThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(authLogoutThunk.pending, state => (state.isLoading = true))
      .addCase(authLogoutThunk.rejected, handleAuthError)
      .addCase(authLogoutThunk.fulfilled, state => {
        state.user = { name: null, email: null };
        state.isLoggedIn = false;
        state.token = null;
      })
      .addCase(authRefreshUserThunk.pending, state => (state.isLoading = true))
      .addCase(authRefreshUserThunk.rejected, handleAuthError)
      .addCase(authRefreshUserThunk.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoggedIn = true;
      });
  },
});

export const authReducer = persistReducer(
  {
    key: 'auth',
    storage,
    whitelist: ['token'],
  },
  authSlice.reducer
);
