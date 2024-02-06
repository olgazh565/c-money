import PropTypes from 'prop-types';
import {Layout} from '../Layout/Layout';

export const Main = ({children}) => (
  <main>
    <Layout>
      {children}
    </Layout>
  </main>
);

Main.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]),
};
