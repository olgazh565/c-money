import {Oval} from 'react-loader-spinner';
import PropTypes from 'prop-types';

export const Preloader = ({size, wrapperStyle}) => (
  <Oval
    visible={true}
    height={size}
    width={size}
    color='#B865D6'
    secondaryColor='#4B00CA'
    ariaLabel='oval-loading'
    strokeWidth='3'
    wrapperStyle={wrapperStyle}
  />
);

Preloader.propTypes = {
  size: PropTypes.number,
  wrapperStyle: PropTypes.object,
};
