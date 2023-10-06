import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUserInfo } from '../../Store';

export function AdminProtection({ children }: ProtectedRouteProps) {
  const userInfo = useSelector(selectUserInfo);
  return userInfo && userInfo.isAdmine ? <>{children}</> : <Navigate to="/login" />;
}
