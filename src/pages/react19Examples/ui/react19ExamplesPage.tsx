import { Link } from 'react-router-dom';
import { ActionStateWithReducer } from 'features/react19Examples/ui/ActionStateWithReducer';
import { FormWithAsyncSave } from 'features/react19Examples/ui/FormWithAsyncSave';
import { TodoListOptimistic } from 'features/react19Examples/ui/TodoListOptimistic';

export const React19ExamplesPage = () => {
  return (
    <main>
      <h1>Примеры React 19</h1>
      <p>Демонстрация useActionState, useOptimistic и оптимистичного UI.</p>
      <p>
        Назад: <Link to="/public">/public</Link>
      </p>

      <FormWithAsyncSave />
      <TodoListOptimistic />
      <ActionStateWithReducer />
    </main>
  );
};
