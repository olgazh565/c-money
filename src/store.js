import {combineReducers, configureStore} from '@reduxjs/toolkit';
import tokenReducer from './features/tokenSlice';
import accountsListReducer from './features/accountsListSlice';
import accountReducer from './features/accountSlice';
import transferFundsReducer from './features/transferFundsSlice';
import newAccountReducer from './features/newAccountSlice';
import currenciesReducer from './features/currenciesSlice';
import currenciesListReducer from './features/currenciesListSlice';
import yearReducer from './features/yearSlice';

const rootReducer = combineReducers({
  token: tokenReducer,
  accountsList: accountsListReducer,
  account: accountReducer,
  transferFunds: transferFundsReducer,
  newAccount: newAccountReducer,
  currencies: currenciesReducer,
  currenciesList: currenciesListReducer,
  year: yearReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
