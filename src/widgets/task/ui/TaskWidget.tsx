import { TaskList } from 'features/taskList/ui/TaskList';

export const TaskWidget = () => {
  return (
    <div
      style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}
    >
      <h2>Виджет задач</h2>
      <TaskList />
    </div>
  );
};
