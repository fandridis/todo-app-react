import React, {
  useState, useRef, useEffect, useLayoutEffect,
} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';
import './TextField.scss';

const ESC_KEY = 27;
const KEY_ENTER = 13;

const TextFieldComponent = React.forwardRef(
  (
    {
      value,
      variant,
      type,
      placeholder,
      isClearable,
      isBlock,
      onChange,
      onSubmit,
      onBlur,
      onFocus,
      disabled,
      hasError,
      className,
    },
    ref,
  ) => {
    const inputRef = ref || useRef(null);
    const [isEmpty, setIsEmpty] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
      if (
        (onChange && typeof value === 'undefined')
        || (!onChange && typeof value !== 'undefined')
      ) {
        console.error(
          'If you want to make the TextField a controlled component please use both the value and the onChange props.',
        );
      }
    }, []);

    useLayoutEffect(() => {
      if (inputRef.current.value) {
        setIsEmpty(false);
      }
    }, [inputRef]);

    const handleChange = (e) => {
      setIsEmpty(!e.target.value);
      setName(e.target.value);

      // if (onChange) {
      //   onChange(e);
      // }
    };

    const handleClear = () => {
      inputRef.current.value = '';
      inputRef.current.focus();

      handleChange({ target: { value: '' } });
    };

    const handleKeyDown = (e) => {
      if (e.keyCode === KEY_ENTER) {
        if (onSubmit) {
          onSubmit(name);
          handleClear();
        }
      } else if (e.keyCode === ESC_KEY) {
        handleClear();
      }
    };

    const handleFocus = () => {
      setIsFocused(true);

      if (onFocus) {
        onFocus();
      }
    };

    const handleBlur = () => {
      setIsFocused(false);

      if (onBlur) {
        onBlur();
      }
    };


    const TextFieldContainerClass = classnames(
      `
      TextField-container
      TextField-container--${variant}
    `,
      {
        isBlock,
        isEmpty,
        hasError,
        disabled,
        isFocused,
      },
      className,
    );

    const TextFieldClass = classnames('TextField', {
      withClear: isClearable,
    });

    return (
      <div className={TextFieldContainerClass}>
        <input
          ref={inputRef}
          className={TextFieldClass}
          type={type}
          placeholder={placeholder}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
        />

        {isClearable && (
          <div className="TextField-clear">
            <MdClose size="32" onClick={handleClear} />
          </div>
        )}
      </div>
    );
  },
);

TextFieldComponent.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  variant: PropTypes.oneOf(['outline', 'filled']),
  type: PropTypes.string,
  placeholder: PropTypes.string,
  isClearable: PropTypes.bool,
  isBlock: PropTypes.bool,
  disabled: PropTypes.bool,
  hasError: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

TextFieldComponent.defaultProps = {
  variant: 'outline',
  type: 'text',
  value: '',
  placeholder: '',
  className: '',
  isClearable: false,
  hasError: false,
  isBlock: false,
  disabled: false,
  onBlur: () => {},
  onFocus: () => {},
  onChange: () => {},
  onSubmit: () => {},
};

export default TextFieldComponent;
