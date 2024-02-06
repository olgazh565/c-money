import style from './ExchangeRates.module.scss';
import GreenIcon from '../../../assets/green-up.svg?react';
import RedIcon from '../../../assets/red-down.svg?react';
import {nanoid} from '@reduxjs/toolkit';
import {Preloader} from '../../Common/Preloader/Preloader';
import {useSelector} from 'react-redux';
import {useWebsocket} from '../../../hooks/useWebsocket';

export const ExchangeRates = () => {
  const {status} = useSelector(state => state.currencies);
  const rates = useWebsocket();

  return (
    <div className={style.ratesWrapper}>
      <h3 className={style.ratesTitle}>
        Изменение курса в режиме реального времени
      </h3>
      <div className={style.tbody}>
        {status === 'loading' &&
          <Preloader
            size={80}
            wrapperStyle={
              {
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '50px'
              }
            } />
        }
        {rates.length !== 0 && rates.map(rate => (
          <div className={style.tr} key={nanoid()}>
            <span className={style.tdFist}>
              {`${rate.from}/${rate.to}`}
            </span>

            <span className={style.tdSecond}></span>

            <span className={style.tdThird}>{rate.rate}
              {rate.change === 1 ? <GreenIcon /> : <RedIcon />}
            </span>
          </div>
        ))}

      </div>
    </div>
  );
};

