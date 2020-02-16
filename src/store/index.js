import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const initialState = {
  todos: [],
  actionHistory: [],
  isRecordingActions: true,
};

const reducer = (state = initialState, action) => {
  if (action.type === 'ADD_TODO') {
    return {
      ...state,
      todos: [...state.todos, action.payload],
    };
  }

  if (action.type === 'TOGGLE_TODO') {
    const updatedTodos = state.todos.map((todo) => {
      if (todo.id === action.payload) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });

    return {
      ...state,
      todos: updatedTodos,
    };
  }

  if (action.type === 'DELETE_TODO') {
    const updatedTodos = state.todos.filter((todo) => todo.id !== action.payload);

    return {
      ...state,
      todos: updatedTodos,
    };
  }

  if (action.type === 'UPDATE_TODO') {
    const updatedTodos = state.todos.map((todo) => {
      if (todo.id === action.payload.id) {
        return {
          ...todo,
          name: action.payload.newName,
          description: action.payload.newDescription,
        };
      }
      return todo;
    });

    return {
      ...state,
      todos: updatedTodos,
    };
  }

  if (action.type === 'LOG_ACTION') {
    return {
      ...state,
      actionHistory: [action.payload, ...state.actionHistory],
    };
  }

  if (action.type === 'CLEAR_ACTION_HISTORY') {
    return {
      ...state,
      actionHistory: [],
    };
  }

  if (action.type === 'IS_RECORDING_ACTIONS') {
    return {
      ...state,
      isRecordingActions: action.payload,
    };
  }

  return state;
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
