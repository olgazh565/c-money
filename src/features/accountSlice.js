import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from '../api/const';

export const fetchAccount = createAsyncThunk(
  'account/fetchAccount',
  (id, {getState}) => {
    const {token} = getState().token;

    return axios(`${API_URL}/account/${id}`, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    })
      .then(response => response.data)
      .catch(err => {
        throw new Error(err);
      });
  }
);

const initialState = {
  account: {},
  status: '',
  error: '',
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    clearAccountData: (state) => {
      state.status = '';
      state.error = '';
      state.account = {};
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccount.pending, (state) => {
        state.status = 'loading';
        state.error = '';
        state.account = {};
      })
      .addCase(fetchAccount.fulfilled, (state, action) => {
        state.status = 'success';
        state.account = action.payload.payload;
        state.error = action.payload.error;
      })
      .addCase(fetchAccount.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      });
  }
});

export default accountSlice.reducer;
export const {clearAccountData} = accountSlice.actions;

