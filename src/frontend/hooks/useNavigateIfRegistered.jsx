import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useNavigateIfRegistered = (user) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user]);
};

export default useNavigateIfRegistered;
