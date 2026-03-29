import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../model/useAuth';

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout, isLoading } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  return (
    <main>
      <h1>Страница профиля</h1>
      <p>Имя пользователя: {user ?? 'анонимный пользователь'}</p>
      <button type="button" onClick={handleLogout}>
        Выйти
      </button>
      <p>
        Публичная страница страница: <Link to="/public">/public</Link>
      </p>
    </main>
  );
}
