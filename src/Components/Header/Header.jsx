import {Layout} from '../Layout/Layout';
import style from './Header.module.scss';
import LogoSVG from '../../assets/logo.svg?react';
import ArrowSVG from '../../assets/arrow.svg?react';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {deleteToken} from '../../features/tokenSlice';

export const Header = () => {
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.token);

  return (
    <header className={style.header}>
      <Layout>
        <div className={style.container}>
          <NavLink to='/login' className={style.logo}>
            <LogoSVG />
          </NavLink>

          {token && <nav className={style.nav}>
            <NavLink to='/'>
              Счета
            </NavLink>
            <NavLink to='/exchange'>
              Обмен
            </NavLink>
            <NavLink
              className={style.exit}
              onClick={() => {
                dispatch(deleteToken());
              }}>
              Выйти
              <ArrowSVG className={style.arrow} />
            </NavLink>
          </nav>}

        </div>
      </Layout>
    </header>
  );
};


