import { type SubmitEvent, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../model/useAuth';
import { API_URL } from '../model/constants';

type LoginResponse = {
  accessToken?: string;
};

export function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, login, refreshUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('введите email и password');
      return;
    }

    try {
      setError(null);
      setIsSubmitting(true);

      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data: LoginResponse = await response.json();

      if (!data.accessToken) {
        throw new Error('токен не получен');
      }

      await login(data.accessToken);
      await refreshUser();

      navigate('/profile', { replace: true });
    } catch {
      setError('не удалось войти');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <h1>Страница логина</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Почта</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="password">Пароль</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Входим...' : 'Войти'}
        </button>
      </form>

      {error ? <p role="alert">{error}</p> : null}

      <p>
        Публичная страница: <Link to="/public">/public</Link>
      </p>
    </main>
  );
}
