import style from './Footer.module.scss';
import LogoSVG from '../../assets/logo.svg?react';
import {Layout} from '../Layout/Layout';

export const Footer = () => (
  <footer>
    <Layout>
      <div className={style.footer}>
        <LogoSVG />
        <span className={style.copy}>
          &copy; C-Money, 2022
        </span>
      </div>
    </Layout>
  </footer>
);
