import {useSelector} from 'react-redux';
import style from './Currencies.module.scss';
import {nanoid} from '@reduxjs/toolkit';
import {Preloader} from '../../../Common/Preloader/Preloader';

export const Currencies = () => {
  const {
    status,
    exchangeStatus,
    currencies
  } = useSelector(state => state.currencies);

  return (
    <div>
      <h3 className={style.currencyTitle}>
        Мои валюты
      </h3>
      {status === 'success' &&
        <ul>
          {((status === 'success' || exchangeStatus === 'success') &&
            currencies.length !== 0) &&
            currencies.map(item => (
              <li key={nanoid()} className={style.item}>
                <span className={style.code}>{item.code}</span>
                <span className={style.amount}>
                  {Number((item.amount).toFixed(2)).toLocaleString('ru')}
                </span>
              </li>
            ))
          }
        </ul>
      }
      {status === 'loading' &&
        <Preloader
          size={60}
          wrapperStyle={
            {
              display: 'flex',
              width: '100%',
              paddingTop: '30px'
            }}
        />
      }
    </div>
  );
};
