import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from '../api/const';

export const fetchToken = createAsyncThunk(
  'token/fetchToken',
  ({login, password}, {getState}) => (
    axios.post(`${API_URL}/login`, {login, password})
      .then(({data}) => ({data, login}))
      .catch(err => {
        throw new Error(err);
      })
  )
);

const initialState = {
  token: localStorage.getItem('token') || '',
  status: '',
  error: '',
  user: localStorage.getItem('userName') || '',
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    deleteToken: (state) => {
      state.token = '';
      state.error = null;

      localStorage.removeItem('token');
      localStorage.removeItem('userName');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchToken.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchToken.fulfilled, (state, action) => {
        state.status = 'success';
        state.token = action.payload.data?.payload?.token;
        state.error = action.payload.data.error;
        state.user = action.payload.login;

        if (action.payload.data?.payload?.token) {
          localStorage.setItem('token', action.payload.data?.payload?.token);
          localStorage.setItem('userName', action.payload.login);
        }
      })
      .addCase(fetchToken.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      });
  }
});

export default tokenSlice.reducer;
export const {deleteToken} = tokenSlice.actions;
