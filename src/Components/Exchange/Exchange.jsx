import style from './Exchange.module.scss';
import {ExchangeRates} from './ExchangeRates/ExchangeRates';
import {ExchangeForm} from './ExchangeForm/ExchangeForm';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {fetchCurrencies} from '../../features/currenciesSlice';

export const Exchange = () => {
  const {token} = useSelector(state => state.token);
  const {currencies} = useSelector(state => state.currencies);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currencies.length) {
      dispatch(fetchCurrencies());
    }
  }, [dispatch, currencies]);

  return (
    token && (
      <div className={style.container}>
        <h2 className={style.title}>Обмен валюты</h2>

        <div className={style.wrapper}>
          <ExchangeRates />
          <ExchangeForm />
        </div>

      </div>
    )
  );
};
