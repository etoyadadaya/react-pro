import { Link } from 'react-router-dom';

export function PublicPage() {
  return (
    <main>
      <h1>Публичная страница</h1>
      <p>Эта страница доступна без авторизации.</p>
      <ul>
        <li>
          <Link to="/login">Войти</Link>
        </li>
        <li>
          <Link to="/profile">Профиль</Link>
        </li>
        <li>
          <Link to="/react19">Примеры React 19</Link>
        </li>
      </ul>
    </main>
  );
}
