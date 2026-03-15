import { memo } from 'react';
import type { Task } from '../model/types';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
}

export const TaskCard = memo(({ task, onToggle }: TaskCardProps) => {
  return (
    <div className={styles.card}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className={styles.checkbox}
      />

      <span className={task.completed ? styles.completed : ''}>
        {task.title}
      </span>
    </div>
  );
});
