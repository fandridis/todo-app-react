import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import dayjs from 'dayjs';
import './ActionHistory.scss';

function ActionHistoryItem({ message, timestamp, action }) {
  const messageClasses = classnames(
    'ActionHistoryItem__message',
    `ActionHistoryItem__message--${action}`,
  );

  return (
    <div className="ActionHistoryItem">
      <span className="ActionHistoryItem__timestamp">
        {dayjs(timestamp).format('DD-MM-YYYY')}
      </span>
      <span className={messageClasses}>
        {message}
      </span>
    </div>
  );
}

ActionHistoryItem.propTypes = {
  action: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  timestamp: PropTypes.instanceOf(Date).isRequired,
};

ActionHistoryItem.defaultProps = {

};

export default ActionHistoryItem;
