import React, { useState } from 'react';
import { withToastProvider } from 'fantoastic';
import TodoList from '../Todo/TodoList';
import ActionHistoryList from '../ActionHistory/ActionHistoryList';
import './App.scss';

function App() {
  const [isActionHistoryOpen, setIsActionHistoryOpen] = useState(false);

  const handleToggleActionHistory = () => setIsActionHistoryOpen((prevValue) => !prevValue);

  return (
    <div className="App">
      <TodoList />
      <ActionHistoryList isOpen={isActionHistoryOpen} onToggle={handleToggleActionHistory} />
    </div>
  );
}

const AppWithToastProvider = withToastProvider(App);
export default AppWithToastProvider;
