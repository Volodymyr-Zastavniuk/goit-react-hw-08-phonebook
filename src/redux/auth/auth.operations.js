import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from 'redux/selectors';
import { publicApi, token } from 'services/baseApi';

export const authRegisterThunk = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await publicApi.post('/users/signup', credentials);
      token.set(data.token);
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authLoginThunk = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await publicApi.post('/users/login', credentials);
      console.log(data);
      token.set(data.token);
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authLogoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await publicApi.post('/users/logout');
      token.remove();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authRefreshUserThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const persistedToken = getToken(thunkAPI.getState());
    console.log('refff', persistedToken);
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      token.set(persistedToken);
      const { data } = await publicApi.get('/users/current');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
