/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import classnames from 'classnames';
import { getTodos } from './api/todos';
import { Form } from './components/Form';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Filter } from './components/Filter';

const USER_ID = 6686;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState('all');

  const activeTodos = todos.filter(todo => !todo.completed).length;
  const completedTodos = todos.filter(todo => todo.completed).length;

  useEffect(() => {
    getTodos(USER_ID)
      .then(data => setTodos(data));
  }, []);

  const changeFilter = (filter: string) => {
    setFilterType(filter);
  };

  const filterTodos = useCallback((todosList: Todo[], filter: string) => {
    switch (filter) {
      case 'all':
        return todosList;
      case 'active':
        return todosList.filter(todo => !todo.completed);
      case 'completed':
        return todosList.filter(todo => todo.completed);
      default:
        return todosList;
    }
  }, [todos]);

  const visibleTodos = useMemo(
    () => filterTodos(todos, filterType),
    [filterTodos, filterType],
  );

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {activeTodos > 0 && (
            <button
              type="button"
              className={classnames({
                'todoapp__toggle-all': true,
                active: activeTodos,
              })}
            />
          )}

          {/* Add a todo on form submit */}
          <Form />
        </header>
        {todos.length > 0 && (
          <>
            <TodoList
              todos={visibleTodos}
            />
            <Filter
              notCompleted={activeTodos}
              completed={completedTodos}
              changeFilter={changeFilter}
            />
          </>
        )}
      </div>
      {/* <Notification /> */}
    </div>
  );
};
