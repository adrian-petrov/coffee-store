import React from 'react';

import AdminPage from '../pages/AdminPage';
import AuthRoute from './AuthRoute';

const AdminLayout: React.FC = () => (
  <AuthRoute>
    <AdminPage />
  </AuthRoute>
);

export default AdminLayout;
