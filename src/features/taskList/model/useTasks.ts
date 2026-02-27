import { useState } from 'react';
import type { Task } from 'entities/task/model/types';

export type Filter = 'all' | 'completed' | 'incomplete';

export function useTasks(initial: Task[]) {
  const [tasks, setTasks] = useState<Task[]>(initial);
  const [filter, setFilter] = useState<Filter>('all');

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return {
    tasks: filteredTasks,
    filter,
    setFilter,
    toggleTask,
    removeTask,
  };
}
