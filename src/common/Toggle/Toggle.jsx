import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Toggle.scss';

const KEY_ENTER = 13;

function Toggle({ isOn, onToggle }) {
  const handleToggle = () => {
    onToggle(!isOn);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === KEY_ENTER) {
      e.stopPropagation();
      // e.target.blur();
      onToggle(!isOn);
    }
  };


  const toggleClasses = classnames('toggle-component', {
    active: isOn,
  });

  return (
    <div
      className={toggleClasses}
      role="button"
      tabIndex="0"
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
    >
      <div className="toggle-button" />
    </div>
  );
}

Toggle.propTypes = {
  isOn: PropTypes.bool,
  onToggle: PropTypes.func,
};

Toggle.defaultProps = {
  isOn: false,
  onToggle: () => {},
};

export default Toggle;
