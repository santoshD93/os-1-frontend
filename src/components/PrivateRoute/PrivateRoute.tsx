import store2 from 'store2';
import { Navigate } from 'react-router-dom';
import { LocalRoutes, StorageKey } from '../../consts';

export const PrivateRoute = ({ children }: { children: JSX.Element}) => {
  const token = store2.get(StorageKey.Token);
  
  if (!token) {
    return <Navigate to={LocalRoutes.SignIn} />
  }

  // authorized so return child components
  return children;
}