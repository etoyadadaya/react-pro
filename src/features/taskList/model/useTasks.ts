import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Task } from 'entities/task/model/types';
import { useGetTasksQuery } from 'entities/task/api/tasksApi';

export type Filter = 'all' | 'completed' | 'incomplete';

export function useTasks() {
  const { data } = useGetTasksQuery();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === 'completed') return task.completed;
      if (filter === 'incomplete') return !task.completed;
      return true;
    });
  }, [tasks, filter]);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const removeTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  useEffect(() => {
    if (tasks.length === 0 && data && data.length > ~0) {
      setTasks(data);
    }
  }, [data, tasks.length]);

  return {
    tasks: filteredTasks,
    filter,
    setFilter,
    toggleTask,
    removeTask,
  };
}
