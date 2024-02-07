import {useDispatch, useSelector} from 'react-redux';
import {Button} from '../Common/Button/Button';
import style from './Login.module.scss';
import {useForm} from 'react-hook-form';
import {fetchToken} from '../../features/tokenSlice';
import {useEffect} from 'react';
import {AlertMessage} from '../Common/Alert/AlertMessage';
import {useNavigate} from 'react-router-dom';
import {Preloader} from '../Common/Preloader/Preloader';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const Login = () => {
  const schema = yup
    .object({
      login: yup
        .string()
        .required('Введите логин')
        .matches(/^[A-Za-z]+$/i, 'Логин может содержать только латиницу')
        .min(6, 'Длина логина менее 6 символов')
        .max(20, 'Длина логина более 20 символов'),
      password: yup
        .string()
        .required('Введите пароль')
        .matches(/^[A-Za-z]+$/i, 'Пароль может содержать только латиницу')
        .min(6, 'Длина пароля менее 6 символов')
        .max(20, 'Длина пароля более 20 символов'),
    });

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitSuccessful,
    },
    reset,
  } = useForm(
    {resolver: yupResolver(schema)},
  );
  const {token, status, error} = useSelector(state => state.token);
  const disabled = status === 'loading';
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(fetchToken(data));
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({login: '', password: ''});
    }
  }, [reset, isSubmitSuccessful]);

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    !token && (
      <>
        {error && <AlertMessage text={error} />}

        <div className={style.container}>

          <div className={style.wrapper}>

            <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
              <legend className={style.title}>
                Вход в аккаунт
              </legend>

              <div className={style.inputWrapper}>
                <span className={style.error}>
                  {errors.login?.message}
                </span>
                <label className={style.label} htmlFor='login'>
                  Логин
                </label>

                <input
                  className={style.input}
                  name='login'
                  id='login'
                  type='text'
                  disabled={disabled}
                  aria-invalid={!!errors.login}
                  {...register('login')}
                />
              </div>

              <div className={style.inputWrapper}>
                <span className={style.error}>
                  {errors.password?.message}
                </span>
                <label className={style.label} htmlFor='password'>
                  Пароль
                </label>

                <input
                  className={style.input}
                  name='password'
                  id='password'
                  type='password'
                  disabled={disabled}
                  aria-invalid={!!errors.password}
                  {...register('password')}
                />
              </div>

              <Button
                classname={style.button}
                text='Войти'
                type='submit'
                disabled={disabled}
              >
                {status === 'loading' &&
                  <Preloader
                    size={35}
                    wrapperStyle={{
                      position: 'absolute',
                      bottom: '-50px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                  />}
              </Button>

            </form>
          </div>
        </div>
      </>
    )
  );
};

