import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_URL} from '../api/const';
import axios from 'axios';

export const fetchCurrencies = createAsyncThunk(
  'currencies/fetchCurrencies',
  (_, {getState}) => {
    const {token} = getState().token;

    return axios(`${API_URL}/currencies`, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    })
      .then(response => {
        if (response.status !== 200 && response.message) {
          throw new Error(response.message);
        }
        return response.data;
      })
      .catch(err => {
        throw new Error(err);
      });
  }
);

export const exchangeCurrencies = createAsyncThunk(
  'currencies/exchangeCurrencies',
  (data, {getState}) => {
    const {token} = getState().token;

    return axios.post(`${API_URL}/currency-buy`,
      data,
      {
        headers: {
          'Authorization': `Basic ${token}`
        }
      })
      .then(response => {
        if (response.status !== 200 && response.message) {
          throw new Error(response.message);
        }
        return response.data;
      })
      .catch(err => {
        throw new Error(err);
      });
  }
);

const initialState = {
  status: '',
  exchangeStatus: '',
  error: '',
  currencies: [],
};

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    clearExchangeStatus: (state) => {
      state.exchangeStatus = '';
      state.error = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencies.pending, (state) => {
        state.status = 'loading';
        state.exchangeStatus = '';
        state.error = '';
      })
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
        state.status = 'success';
        state.currencies = Object.values(action.payload.payload);
        state.error = action.payload.error;
      })
      .addCase(fetchCurrencies.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload.error?.message;
      })
      .addCase(exchangeCurrencies.pending, (state) => {
        state.exchangeStatus = 'loading';
        state.error = '';
      })
      .addCase(exchangeCurrencies.fulfilled, (state, action) => {
        state.exchangeStatus = 'success';

        if (action.payload.payload) {
          state.currencies = Object.values(action.payload.payload);
        }
        state.error = action.payload.error;
      })
      .addCase(exchangeCurrencies.rejected, (state, action) => {
        state.exchangeStatus = 'error';
        state.error = action.payload.error.message;
      });
  }
});

export default currenciesSlice.reducer;
export const {clearExchangeStatus} = currenciesSlice.actions;
