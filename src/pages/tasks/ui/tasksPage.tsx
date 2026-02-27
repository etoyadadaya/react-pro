import { TaskWidget } from 'widgets/task';
import './tasksPage.module.css';

export const TaskPage = () => {
  return (
    <div className="task-page">
      <div className="container">
        <h1>Мои задачи</h1>
        <TaskWidget />
      </div>
    </div>
  );
};
