import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_URL} from '../api/const';
import axios from 'axios';

export const transferFunds = createAsyncThunk(
  'funds/transferFunds',
  (data, {getState}) => {
    const token = getState().token.token;

    return axios.post(`${API_URL}/transfer-funds`,
      data,
      {
        headers: {
          'Authorization': `Basic ${token}`
        },
      }
    )
      .then(response => response.data)
      .catch(err => {
        throw new Error(err);
      });
  }
);

const initialState = {
  status: '',
  error: '',
  transferData: {},
};

const transferFundsSlice = createSlice({
  name: 'funds',
  initialState,
  reducers: {
    clearTransferData: (state) => {
      state.status = '';
      state.transferData = {};
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(transferFunds.pending, (state) => {
        state.status = 'loading';
        state.error = '';
        state.transferData = {};
      })
      .addCase(transferFunds.fulfilled, (state, action) => {
        state.status = 'success';
        state.transferData = action.payload?.payload;
        state.error = action.payload.error;
      })
      .addCase(transferFunds.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      });
  }
});

export default transferFundsSlice.reducer;
export const {clearTransferData} = transferFundsSlice.actions;
