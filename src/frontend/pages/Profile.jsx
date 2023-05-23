import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContextProvider';
import { removeLocalStorage } from '../utils/utils';
import { localStorageKeys } from '../constants/constants';
import { useAllProductsContext } from '../contexts/ProductsContextProvider';
import { useFiltersContext } from '../contexts/FiltersContextProvider';

const Profile = () => {
  const navigate = useNavigate();
  const { updateUserAuth, user } = useAuthContext();
  const { clearWishlistDispatch, clearCartDispatch } = useAllProductsContext();

  const { clearFilters } = useFiltersContext();

  const handleLogout = () => {
    updateUserAuth(null);
    removeLocalStorage(localStorageKeys.User);

    clearWishlistDispatch();
    clearCartDispatch();
    clearFilters();
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
