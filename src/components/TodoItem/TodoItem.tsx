import classnames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoItem:React.FC<Props> = (
  {
    todo,
  },
) => {
  const { title, completed } = todo;

  return (
    <div className={classnames({
      todo: true,
      completed,
    })}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
        />
      </label>

      <span className="todo__title">{title}</span>
      <button
        type="button"
        className="todo__remove"
      >
        ×
      </button>
    </div>
  );
};
