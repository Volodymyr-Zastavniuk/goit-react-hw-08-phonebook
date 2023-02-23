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
      .addCase(authLoginThunk.rejected, state => {
        state.error = 'login';
      })
      .addCase(authLoginThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;

        state.error = null;
      })
      .addCase(authRegisterThunk.rejected, state => {
        state.error = 'register';
      })
      .addCase(authRegisterThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;

        state.error = null;
      })
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
