import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUserInfo } from '../../Store';

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const userInfo = useSelector(selectUserInfo);
  return userInfo ? <>{children}</> : <Navigate to="/login" />;
}
