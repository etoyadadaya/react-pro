import { LoginForm } from 'features/loginForm';
import { memo } from 'react';

export const LoginPage = memo(() => {
  return (
    <div>
      <LoginForm />
    </div>
  );
});
