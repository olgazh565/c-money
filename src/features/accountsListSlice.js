import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from '../api/const';

export const fetchAccountsList = createAsyncThunk(
  'accountsList/fetchAccountsList',
  (_, {getState}) => {
    const {token} = getState().token;
    if (!token) return;

    return axios(`${API_URL}/accounts`, {
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
  accountsList: [],
  status: '',
  error: '',
};

const accountsListSlice = createSlice({
  name: 'accountsList',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountsList.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchAccountsList.fulfilled, (state, action) => {
        state.status = 'success';
        state.accountsList = action.payload.payload;
        state.error = action.payload.error;
      })
      .addCase(fetchAccountsList.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload.error;
      });
  }
});

export default accountsListSlice.reducer;
