import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toastHandler } from '../utils/utils';
import { ToastType, customToastId } from '../constants/constants';

const useNavigateIfRegistered = (user) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
      toastHandler(
        ToastType.Error,
        'You are already registered',
        customToastId
      );
    }
  }, []);
};

export default useNavigateIfRegistered;
