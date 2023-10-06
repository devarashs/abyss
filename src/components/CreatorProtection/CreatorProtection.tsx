import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUserInfo } from '../../Store';

export function CreatorProtection({ children }: ProtectedRouteProps) {
  const userInfo = useSelector(selectUserInfo);
  return userInfo && userInfo.isCreator ? <>{children}</> : <Navigate to="/login" />;
}
