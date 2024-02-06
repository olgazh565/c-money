import {Outlet} from 'react-router-dom';
import {Footer} from '../Components/Footer/Footer';
import {Header} from '../Components/Header/Header';
import {Main} from '../Components/Main/Main';

export const Root = () => (
  <>
    <Header />
    <Main>
      <Outlet/>
    </Main>
    <Footer />
  </>
);

