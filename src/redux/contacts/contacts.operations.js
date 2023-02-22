import { privateApi } from 'services/baseApi';
const { createAsyncThunk } = require('@reduxjs/toolkit');

export const fetchContacts = createAsyncThunk(
  '/contacts/fetchAllContacts',
  async (_, thunkAPI) => {
    try {
      const { data } = await privateApi.get('/contacts');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addContact = createAsyncThunk(
  '/contacts/addContacts',
  async (contact, thunkAPI) => {
    try {
      const { data } = await privateApi.post('/contacts', contact);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteContact = createAsyncThunk(
  '/contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const { data } = await privateApi.delete(`/contacts/${id}`);
      return data.id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
