import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from '../api/const';

export const createAccount = createAsyncThunk(
  'newAccount/createAccount',
  (_, {getState}) => {
    const token = getState().token.token;

    return axios.post(`${API_URL}/create-account`, '', {
      headers: {
        'Authorization': `Basic ${token}`
      },
    })
      .then(response => response.data)
      .catch(err => {
        throw new Error(err);
      });
  }
);

const initialState = {
  status: '',
  error: '',
  newAccount: {},
};

const createAccountSlice = createSlice({
  name: 'newAccount',
  initialState,
  reducers: {
    clearNewAccountData: (state) => {
      state.status = '';
      state.error = '';
      state.newAccount = {};
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.pending, (state) => {
        state.status = 'loading';
        state.error = '';
        state.newAccount = {};
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.status = 'success';
        state.newAccount = action.payload.payload;
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      });
  }
});

export default createAccountSlice.reducer;
export const {clearNewAccountData} = createAccountSlice.actions;
