import { useState } from 'react';
import classnames from 'classnames';

type Props = {
  notCompleted: number,
  completed: number,
  changeFilter: (filter: string) => void,
};

export const Filter:React.FC<Props> = (
  {
    notCompleted,
    completed,
    changeFilter,
  },
) => {
  const [selected, setSelected] = useState('all');

  const handleClick = (value: string) => {
    changeFilter(value);
    setSelected(value);
  };

  return (
    // todo loop of filters
    // todo interface for filterTypes
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${notCompleted} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classnames(
            'filter__link',
            {
              selected: selected === 'all',
            },
          )}
          onClick={() => handleClick('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classnames(
            'filter__link',
            {
              selected: selected === 'active',
            },
          )}
          onClick={() => handleClick('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classnames(
            'filter__link',
            {
              selected: selected === 'completed',
            },
          )}
          onClick={() => handleClick('completed')}
        >
          Completed
        </a>
      </nav>

      {completed > 0 && (
        <button
          type="button"
          className="todoapp__clear-completed"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
