import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_URL} from '../api/const';
import axios from 'axios';

export const fetchCurrenciesList = createAsyncThunk(
  'currenciesList/fetchCurrenciesList',
  (_, {getState}) => {
    const {token} = getState().token;

    return axios(`${API_URL}/all-currencies`, {
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
  status: 'loading',
  error: '',
  currenciesList: [],
};

const currenciesListSlice = createSlice({
  name: 'currenciesList',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrenciesList.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchCurrenciesList.fulfilled, (state, action) => {
        state.status = 'success';
        state.currenciesList = action.payload.payload;
        state.error = action.payload.error.message;
      })
      .addCase(fetchCurrenciesList.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      });
  }
});

export default currenciesListSlice.reducer;
