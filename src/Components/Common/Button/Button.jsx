import style from './Button.module.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Button = ({
  text,
  classname,
  type,
  onClick,
  children,
  disabled,
}) => (
  <button
    className={classNames(style.button, classname)}
    type={type}
    disabled={disabled}
    onClick={onClick}
  >
    {children && children}
    {text}
  </button>
);

Button.propTypes = {
  text: PropTypes.string,
  classname: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

