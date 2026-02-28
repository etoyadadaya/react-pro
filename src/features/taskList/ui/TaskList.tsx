import { TaskCard } from 'entities/task/ui/TaskCard';
import { useTasks } from '../model/useTasks';
import { FilterButton } from 'shared/ui/FilterButton/FilterButton';
import type { Task } from 'entities/task/model/types';

const initialTasks: Task[] = [
  { id: '1', title: 'Изучить FSD', completed: false },
  { id: '2', title: 'Написать код', completed: true },
  { id: '3', title: 'Сдать задание', completed: false },
];

export const TaskList = () => {
  const { tasks, filter, setFilter, toggleTask, removeTask } =
    useTasks(initialTasks);

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
