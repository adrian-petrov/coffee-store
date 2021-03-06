import React from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Dashboard from '../../components/admin/Dashboard';

function AdminPage({ history }: RouteComponentProps) {
  const { updateAuthState } = React.useContext(AuthContext);

  async function handleLogout() {
    try {
      const response = await axios.get('/admin/logout');
      if (response.data.signedOut) {
        updateAuthState({
          isAuthenticated: false,
          authUser: '',
        });
        window.localStorage.removeItem('isAuthenticated');
        window.localStorage.removeItem('authUser');
        history.push('/admin/login');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return <Dashboard handleLogout={handleLogout} />;
}
export default AdminPage;
