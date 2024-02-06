import {useEffect} from 'react';
import {Button} from '../../Common/Button/Button';
import style from './Transaction.module.scss';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {transferFunds} from '../../../features/transferFundsSlice';
import PropTypes from 'prop-types';
import {AlertMessage} from '../../Common/Alert/AlertMessage';
import {Preloader} from '../../Common/Preloader/Preloader';

export const Transaction = ({id}) => {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitSuccessful,
      isSubmitting,
    },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const {status, error} = useSelector(state => state.transferFunds);
  const disabled = isSubmitting || status === 'loading';

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({to: '', amount: ''});
    }
  }, [reset, isSubmitSuccessful]);

  const onSubmit = (data) => {
    data.from = id;
    dispatch(transferFunds(data));
  };

  return (
    <>
      <div className={style.transaction}>
        <h3 className={style.title}>Перевод</h3>

        <form
          className={style.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={style.inputWrap}>
            {errors.to && (
              <span className={style.error}>{errors.to.message}</span>
            )}
            <label className={style.label} htmlFor='to'>Счет</label>
            <input
              className={style.input}
              name='to'
              aria-invalid={!!errors.to}
              disabled={disabled}
              {...register('to', {
                required: {
                  value: true,
                  message: 'Укажите номер счета получателя',
                },
                minLength: {
                  value: 26,
                  message: 'Длина счета менее 26 символов'
                },
                maxLength: {
                  value: 26,
                  message: 'Длина счета более 26 символов'
                },
                pattern: {
                  value: /^[\d]{26}$/g,
                  message: 'Номер счета должен содержать только цифры'
                },
                validate: value => value !== id ||
                  'Неверно указан номер счета получателя'
              }
              )}
            />
          </div>

          <div className={style.inputWrap}>
            {errors.amount && (
              <span className={style.error}>{errors.amount.message}</span>
            )}
            <label className={style.label} htmlFor='amount'>Сумма</label>
            <input
              className={style.input}
              name='amount'
              aria-invalid={!!errors.amount}
              disabled={disabled}
              {...register('amount', {
                required: {
                  value: true,
                  message: 'Укажите сумму для перевода',
                },
                validate: value => parseInt(value) > 0 ||
                  'Введите положительную сумму перевода'
              })}
            />
          </div>

          <Button
            classname={style.button}
            type='submit'
            text='Перевести'
            disabled={disabled}
          />

        </form>

        {status === 'loading' &&
          <Preloader
            size={40}
            wrapperStyle={{
              position: 'absolute',
              bottom: '-70px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />}

      </div>

      {(status === 'success' && error) &&
        <AlertMessage text={error} dir={'up'} />}
      {(status === 'success' && !error) &&
        <AlertMessage text='Transfer success' dir={'up'} error={false} />
      }
      {(status === 'error' && error) &&
        <AlertMessage text={error} dir={'up'} />
      }
    </>
  );
};

Transaction.propTypes = {
  id: PropTypes.string,
};
