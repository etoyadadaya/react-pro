import { TaskCard } from 'entities/task/ui/TaskCard';
import { useTasks } from '../model/useTasks';
import { FilterButton } from 'shared/ui/FilterButton/FilterButton';

export const TaskList = () => {
  const { tasks, filter, setFilter, toggleTask, removeTask } = useTasks();

  return (
    <div>
      <div>
        <FilterButton
          label="Все"
          active={filter === 'all'}
          onClick={() => setFilter('all')}
        />

        <FilterButton
          label="Выполненные"
          active={filter === 'completed'}
          onClick={() => setFilter('completed')}
        />

        <FilterButton
          label="Невыполненные"
          active={filter === 'incomplete'}
          onClick={() => setFilter('incomplete')}
        />
      </div>

      <div>
        {tasks.map((task) => (
          <div key={task.id} style={{ display: 'flex', alignItems: 'center' }}>
            <TaskCard task={task} onToggle={toggleTask} />
            <button onClick={() => removeTask(task.id)}>Удалить</button>
          </div>
        ))}
      </div>
    </div>
  );
};
