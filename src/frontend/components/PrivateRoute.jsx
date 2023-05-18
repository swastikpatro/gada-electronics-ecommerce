import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContextProvider';

const PrivateRoute = ({ children }) => {
  const { user } = useAuthContext();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate to='/login' state={{ from: location?.pathname }}></Navigate>
    );
  }

  return children;
};

export default PrivateRoute;
