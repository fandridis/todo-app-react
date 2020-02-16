import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Button.scss';

const Button = ({
  children,
  className,
  onClick,
  size,
  isBlock,
  isText,
  variant,
}) => {
  const buttonClasses = classnames(
    `
      Btn
      Btn--${variant}
      Btn--${size}
      `,
    className,
    {
      'Btn--block': isBlock,
      'Btn--text': isText,
    },
  );

  return (
    <button
      className={buttonClasses}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['primary', 'danger']),
  isBlock: PropTypes.bool,
  isText: PropTypes.bool,
};

Button.defaultProps = {
  size: 'medium',
  variant: 'primary',
  className: '',
  isBlock: false,
  isText: false,
  onClick: () => {},
};

export default Button;
