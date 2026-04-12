import { useOptimistic, useState } from 'react';
import { initialTodos } from '../model/constants';
import type { Todo } from '../model/types';

export const TodoListOptimistic = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (currentTodos: Todo[], newTodo: Todo) => [...currentTodos, newTodo]
  );

  const handleSubmit = async (formData: FormData) => {
    const text = String(formData.get('todo') ?? '').trim();

    if (!text) {
      return;
    }

    const optimisticTodo: Todo = {
      id: Date.now(),
      text,
      optimistic: true,
    };

    addOptimisticTodo(optimisticTodo);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setTodos((current) => [
      ...current,
      {
        id: optimisticTodo.id,
        text: optimisticTodo.text,
      },
    ]);
  };

  return (
    <section>
      <h2>Optimistic todo list</h2>

      <form
        action={async (formData) => {
          await handleSubmit(formData);
        }}
      >
        <input name="todo" placeholder="Новая задача" required />
        <button type="submit">Добавить</button>
      </form>

      <ul>
        {optimisticTodos.map((todo) => (
          <li key={todo.id}>
            {todo.text} {todo.optimistic ? 'saving...' : ''}
          </li>
        ))}
      </ul>
    </section>
  );
};
