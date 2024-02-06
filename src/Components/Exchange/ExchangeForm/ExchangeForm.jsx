import style from './ExchangeForm.module.scss';
import {Currencies} from './Currencies/Currencies';
import {Form} from './Form/Form';
import {useSelector} from 'react-redux';
import {Preloader} from '../../Common/Preloader/Preloader';

export const ExchangeForm = () => {
  const {status} = useSelector(state => state.currencies);

  return (
    <div className={style.rightWrapper}>
      <div className={style.wrapper}>
        <h3 className={style.title}>Обмен валюты</h3>
        {status === 'success' && <Form />}
        {status === 'loading' &&
          <Preloader
            size={60}
            wrapperStyle={{padding: '20px'}}
          />
        }
      </div>

      <Currencies />
    </div>
  );
};
