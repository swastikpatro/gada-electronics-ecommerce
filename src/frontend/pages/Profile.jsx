import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContextProvider';
import { removeLocalStorage } from '../utils/utils';
import { localStorageKeys } from '../constants/constants';

const Profile = () => {
  const navigate = useNavigate();
  const { updateUserAuth, user } = useAuthContext();

  const handleLogout = () => {
    updateUserAuth(null);
    removeLocalStorage(localStorageKeys.User);
    navigate('/');
  };

  return (
    <main className='half-page'>
      <div className='container'>
        <p> Name: {user.username}</p>
        <p> Email: {user.email}</p>

        <button className='btn btn-danger' onClick={handleLogout}>
          logout
        </button>
      </div>
    </main>
  );
};

export default Profile;
