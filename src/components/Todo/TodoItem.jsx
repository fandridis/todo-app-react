import React, { useCallback, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import teeheo from '@fandridis/teeheo';
import { useToast } from 'fantoastic';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
  MdCheckBoxOutlineBlank, MdCheckBox, MdDeleteForever, MdEdit, MdDone, MdClose,
} from 'react-icons/md';
import './Todo.scss';

function TodoItem({
  id,
  name,
  description,
  isCompleted,
}) {
  const isHistoryOn = useSelector((state) => state.isRecordingActions, shallowEqual);
  const dispatch = useDispatch();
  const [inEditMode, setInEditMode] = useState(false);
  const editNameRef = useRef(null);
  const editDescriptionRef = useRef(null);
  const toast = useToast();

  const handleToggleEdit = (e) => {
    if (e) { e.stopPropagation(); }

    setInEditMode((prevValue) => !prevValue);
  };

  const handleToggleTodo = useCallback(
    (e) => {
      e.stopPropagation();

      dispatch({
        type: 'TOGGLE_TODO',
        payload: id,
      });

      if (!isHistoryOn) { return; }

      const action = isCompleted ? 'uncomplete' : 'complete';
      const message = isCompleted ? `Uncompleted the todo (${name})` : `Completed the todo (${name})`;

      dispatch({
        type: 'LOG_ACTION',
        payload: {
          id: teeheo.uuid4(),
          action,
          message,
          createdAt: new Date(),
        },
      });
    },
    [dispatch, isCompleted, name, isHistoryOn],
  );

  const handleDeleteTodo = useCallback(
    (e) => {
      e.stopPropagation();

      dispatch({
        type: 'DELETE_TODO',
        payload: id,
      });

      if (!isHistoryOn) { return; }

      const action = 'delete';
      const message = `Deleted the todo (${name})`;

      dispatch({
        type: 'LOG_ACTION',
        payload: {
          id: teeheo.uuid4(),
          action,
          message,
          createdAt: new Date(),
        },
      });
    },
    [dispatch, name, isHistoryOn],
  );

  const handleSaveChanges = () => {
    const newName = editNameRef.current.value;
    const newDescription = editDescriptionRef.current.value;

    if (!newName) {
      return toast.add('You need to specify a name first', {
        position: 'top',
        variant: 'primary',
        duration: '5000',
        persist: false,
        withCloseIcon: true,
      });
    }

    dispatch({
      type: 'UPDATE_TODO',
      payload: { id, newName, newDescription },
    });

    if (!isHistoryOn) { return null; }

    const action = 'update';
    const message = `Updated the todo (${name})`;

    dispatch({
      type: 'LOG_ACTION',
      payload: {
        id: teeheo.uuid4(),
        action,
        message,
        createdAt: new Date(),
      },
    });

    handleToggleEdit();

    return null;
  };

  const renderEditMode = () => (
    <div className="TodoItem__details TodoItem__details--edit">
      <input
        ref={editNameRef}
        defaultValue={name}
        className="name-edit"
        placeholder="Add a name"
      />
      <input
        ref={editDescriptionRef}
        defaultValue={description}
        className="description-edit"
        placeholder="Add an option description"
      />
    </div>
  );

  const renderViewMode = () => (
    <div className="TodoItem__details TodoItem__details--view">
      <span className="name-view">{name}</span>
      <span className="description-view">{description}</span>
    </div>
  );


  return (
    <div className="TodoItem">
      <div className="TodoItem__checkbox-container">
        {isCompleted
          ? <MdCheckBox size={28} onClick={handleToggleTodo} />
          : <MdCheckBoxOutlineBlank size={28} onClick={handleToggleTodo} />}
      </div>
      <div className="TodoItem__details-container">
        {inEditMode
          ? renderEditMode()
          : renderViewMode()}
      </div>
      <div className="TodoItem__actions-container">
        {inEditMode
          ? (
            <>
              <MdDone className="cursor-pointer save-icon" size={28} onClick={handleSaveChanges} />
              <MdClose className="cursor-pointer cancel-icon" size={28} onClick={handleToggleEdit} />
            </>
          )
          : (
            <>
              <MdEdit className="cursor-pointer edit-icon" size={28} onClick={handleToggleEdit} />
              <MdDeleteForever className="cursor-pointer delete-icon" size={28} onClick={handleDeleteTodo} />
            </>
          )}

      </div>
    </div>
  );
}

TodoItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  isCompleted: PropTypes.bool,
};

TodoItem.defaultProps = {
  description: '',
  isCompleted: false,
};

export default TodoItem;
