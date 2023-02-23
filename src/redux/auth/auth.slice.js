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

export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitState,
  reducers: {},
  extraReducers: builder => {
    builder
      // .addCase(authLoginThunk.pending, handlePending)
      .addCase(authLoginThunk.rejected, state => {
        state.error = 'login';
        // state.isRefreshing = false;
      })
      .addCase(authLoginThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
        // state.isRefreshing = false;
        state.error = null;
      })
      // .addCase(authRegisterThunk.pending, handlePending)
      .addCase(authRegisterThunk.rejected, state => {
        state.error = 'register';
        // state.isRefreshing = false;
      })
      .addCase(authRegisterThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
        // state.isRefreshing = false;
        state.error = null;
      })
      // .addCase(authLogoutThunk.pending, state => state)
      // .addCase(authLogoutThunk.rejected, () => authInitState)
      .addCase(authLogoutThunk.fulfilled, state => {
        state.user = { name: null, email: null };
        state.isLoggedIn = false;
        state.token = null;
      })

      .addCase(authRefreshUserThunk.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(authRefreshUserThunk.rejected, () => authInitState)
      .addCase(authRefreshUserThunk.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
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
