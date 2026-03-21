import { createBrowserRouter } from 'react-router-dom';
import { TaskPage } from 'pages/tasks';
import { LoginPage } from 'pages/login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <TaskPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);
