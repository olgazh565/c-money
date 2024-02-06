import {useDispatch, useSelector} from 'react-redux';
import {Button} from '../../../Common/Button/Button';
import style from './Form.module.scss';
import {useEffect} from 'react';
import {nanoid} from '@reduxjs/toolkit';
import {
  clearExchangeStatus,
  exchangeCurrencies
} from '../../../../features/currenciesSlice';
import {useForm, Controller} from 'react-hook-form';
import {fetchCurrenciesList} from '../../../../features/currenciesListSlice';
import {AlertMessage} from '../../../Common/Alert/AlertMessage';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const Form = () => {
  const dispatch = useDispatch();
  const {error, exchangeStatus} = useSelector(state => state.currencies);
  const {
    status: listStatus,
    currenciesList
  } = useSelector(state => state.currenciesList);

  const schema = yup
    .object({
      from: yup
        .string()
        .required('Выберите валюту'),
      to: yup
        .string()
        .required('Выберите валюту'),
      amount: yup
        .number()
        .required('Введите сумму')
        .transform((value) =>
          ((isNaN(value) || value === null || value === undefined) ? 0 : value))
        .positive('Введите сумму'),
    });

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: {
      errors,
      isSubmitSuccessful,
      isSubmitting,
    }
  } = useForm({
    from: '',
    to: '',
    amount: '',
    resolver: yupResolver(schema),
  });

  const selectedValueFrom = watch('from');
  const selectedValueTo = watch('to');
  const disabled = isSubmitting || exchangeStatus === 'loading';

  useEffect(() => {
    if (!currenciesList.length) {
      dispatch(fetchCurrenciesList());
    }
  }, [dispatch, currenciesList]);

  const onSubmit = (data) => {
    dispatch(exchangeCurrencies(data));
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [reset, isSubmitSuccessful]);

  useEffect(() => {
    let timerId;

    if (exchangeStatus || error) {
      timerId = setTimeout(() => {
        dispatch(clearExchangeStatus());
      }, 3500);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [exchangeStatus, error, dispatch]);

  return (
    <>
      <form
        className={style.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={style.inputsWrapper}>
          <div className={style.inputWrapper}>
            <span className={style.selectError}>{errors.from?.message}</span>

            <label className={style.label}>Откуда</label>

            <Controller
              control={control}
              name='from'
              render={({field}) => (
                <select
                  className={style.input}
                  disabled={disabled}
                  aria-invalid={!!errors.from}
                  onChange={field.onChange}
                  value={field.value}
                  {...register('from')}
                >
                  <option readOnly value=''>Валюта</option>
                  {(listStatus === 'success' && currenciesList.length) &&

                    currenciesList
                      .filter(item => item !== selectedValueTo)
                      .map(item => (
                        <option key={nanoid()} value={item}>{item}</option>
                      ))
                  }
                </select>
              )}
            />
          </div>

          <div className={style.inputWrapper}>
            <span className={style.selectError}>{errors.to?.message}</span>
            <label className={style.label}>Куда</label>

            <Controller
              control={control}
              name='to'
              render={({field}) => (
                <select
                  className={style.input}
                  disabled={disabled}
                  aria-invalid={!!errors.to}
                  onChange={field.onChange}
                  value={field.value}
                  {...register('to')}
                >
                  <option readOnly value=''>Валюта</option>
                  {(listStatus === 'success' && currenciesList.length) &&
                    currenciesList
                      .filter(item => item !== selectedValueFrom)
                      .map(item => (
                        <option key={nanoid()} value={item}>{item}</option>
                      ))
                  }
                </select>
              )}
            />
          </div>

          <div className={style.inputWrapper}>
            <label className={style.label}>Сумма</label>
            <input
              className={style.input}
              name='amount'
              disabled={disabled}
              aria-invalid={!!errors.amount}
              {...register('amount')}
            />
          </div>
          <span className={style.formError}>{errors.amount?.message}</span>
        </div>

        <Button
          classname={style.button}
          type='submit'
          text='Обменять'
          disabled={disabled}
        />

      </form>

      {error && <AlertMessage text={error} />}
      {(exchangeStatus === 'success' && !error) &&
        <AlertMessage text='Exchange success' error={false} />}
    </>
  );
};
