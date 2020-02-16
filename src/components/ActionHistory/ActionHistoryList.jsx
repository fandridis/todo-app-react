import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { useToast } from 'fantoastic';
import ActionHistoryItem from './ActionHistoryItem';
import Button from '../../common/Button/Button';
import Toggle from '../../common/Toggle/Toggle';
import './ActionHistory.scss';

function ActionHistoryList({ isOpen, onToggle }) {
  const actionHistory = useSelector((state) => state.actionHistory, shallowEqual);
  const isHistoryOn = useSelector((state) => state.isRecordingActions, shallowEqual);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleToggleHistory = () => {
    dispatch({
      type: 'IS_RECORDING_ACTIONS',
      payload: !isHistoryOn,
    });
  };

  const handleClearHistory = useCallback(
    () => {
      dispatch({
        type: 'CLEAR_ACTION_HISTORY',
        payload: null,
      });

      toast.add('History cleared successfully', {
        position: 'top',
        variant: 'danger',
        duration: '5000',
        persist: false,
        withCloseIcon: true,
      });
    },
    [dispatch],
  );

  const ActionHistoryContainerClasses = classnames('ActionHistory-container', {
    'ActionHistory-container--visible': isOpen,
  });

  return (
    <div className={ActionHistoryContainerClasses}>
      <div className="ActionHistory__header">
        <div className="ActionHistory__toggle-icon">
          { isOpen
            ? <MdArrowForward onClick={onToggle} size={36} />
            : <MdArrowBack onClick={onToggle} size={36} />}
        </div>
        <div className="ActionHistory__title">
          <p>Action History</p>
          <Toggle isOn={isHistoryOn} onToggle={handleToggleHistory} />
        </div>
      </div>

      <div className="ActionHistory__list">
        {actionHistory.map((record) => (
          <ActionHistoryItem
            key={record.id}
            id={record.id}
            message={record.message}
            timestamp={record.createdAt}
            action={record.action}
          />
        ))}
      </div>

      <div className="ActionHistory__footer">
        <Button variant="danger" onClick={handleClearHistory} isBlock>Clear history</Button>
      </div>
    </div>
  );
}

ActionHistoryList.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func,
};

ActionHistoryList.defaultProps = {
  onToggle: () => {},
};

export default ActionHistoryList;
