import React, { useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import teeheo from '@fandridis/teeheo';
import TodoItem from './TodoItem';
import TextField from '../../common/TextField/TextField';
import Button from '../../common/Button/Button';
import Quote from '../Quote/Quote';
import './Todo.scss';

function TodoList() {
  const todos = useSelector((state) => state.todos, shallowEqual);
  const isHistoryOn = useSelector((state) => state.isRecordingActions, shallowEqual);
  const completedTodos = useSelector((state) => state.todos.filter((todo) => todo.isCompleted), shallowEqual);
  const dispatch = useDispatch();

  const createTodo = useCallback(
    (name) => {
      if (!name) { return; }

      const createdAt = new Date();
      const description = '';

      dispatch({
        type: 'ADD_TODO',
        payload: {
          id: teeheo.uuid4(),
          name,
          description,
          createdAt,
        },
      });

      if (!isHistoryOn) { return; }

      const action = 'create';
      const message = `Created the todo (${name})`;

      dispatch({
        type: 'LOG_ACTION',
        payload: {
          id: teeheo.uuid4(),
          action,
          message,
          createdAt,
        },
      });
    },
    [dispatch, isHistoryOn],
  );

  const handleSubmit = (name) => {
    createTodo(name);
  };

  const handleClearCompleted = () => {
    completedTodos.forEach((todo) => {
      dispatch({
        type: 'DELETE_TODO',
        payload: todo.id,
      });

      if (!isHistoryOn) { return; }

      const action = 'delete';
      const message = `Deleted the todo (${todo.name})`;

      dispatch({
        type: 'LOG_ACTION',
        payload: {
          id: teeheo.uuid4(),
          action,
          message,
          createdAt: new Date(),
        },
      });
    });
  };

  return (
    <div className="TodoList">

      <div className="TodoList__text-field-container">
        <TextField onSubmit={handleSubmit} placeholder="Do something great..." isBlock isClearable />
      </div>

      <div className="TodoList__list-container">

        {todos.length === 0
          ? <Quote />
          : todos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              name={todo.name}
              description={todo.description}
              isCompleted={todo.isCompleted}
              createdAt={todo.createdAt}
            />
          ))}
      </div>

      <div className="TodoList__footer-container">
        <div className="todos-remaining">
          {todos.length - completedTodos.length}
          {' '}
          tasks remaining
        </div>
        <div className="todos-clear-completed">
          <Button isText onClick={handleClearCompleted}>Clear all completed</Button>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
