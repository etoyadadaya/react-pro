import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from './LoginPage';
import { ProfilePage } from './ProfilePage';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicPage } from './PublicPage';
import { AuthProvider } from './AuthProvider';
import { React19ExamplesPage } from 'pages/react19Examples';

export function AppRouter() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/public" replace />} />
        <Route path="/public" element={<PublicPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/react19" element={<React19ExamplesPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<Navigate to="/public" replace />} />
      </Routes>
    </AuthProvider>
  );
}
