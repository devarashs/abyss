import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { selectUserInfo } from '../../Store';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const userInfo = useSelector(selectUserInfo);
  return userInfo ? <>{children}</> : <Navigate to="/login" />;
}
