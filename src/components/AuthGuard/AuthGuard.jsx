import { Navigate, Outlet } from 'react-router-dom';
import { Buffer } from 'buffer';

export const AuthGuard = () => {
  const token = localStorage.getItem('token');

  if (token) {
    const userInfo = JSON.parse(
      Buffer.from(token.split('.')[1], 'BASE64').toString()
    );
    return userInfo.role ? (
      <Outlet />
    ) : (
      <Navigate replace to={'/'} />
    );
  }
  return <Navigate replace to={'/'} />;
};

export default AuthGuard;
