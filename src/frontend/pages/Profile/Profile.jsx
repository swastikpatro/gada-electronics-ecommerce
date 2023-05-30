import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContextProvider';
import { removeLocalStorage } from '../../utils/utils';
import { localStorageKeys } from '../../constants/constants';
import { useAllProductsContext } from '../../contexts/ProductsContextProvider';
import { useFiltersContext } from '../../contexts/FiltersContextProvider';
import styles from './Profile.module.css';

const Profile = () => {
  const navigate = useNavigate();
  const { updateUserAuth, user } = useAuthContext();
  const { clearWishlistDispatch, clearCartDispatch, timedMainPageLoader } =
    useAllProductsContext();

  const { clearFilters } = useFiltersContext();

  const handleLogout = async () => {
    await timedMainPageLoader();
    updateUserAuth(null);
    removeLocalStorage(localStorageKeys.User);

    clearWishlistDispatch();
    clearCartDispatch();
    clearFilters();

    navigate('/');
  };

  return (
    <div className={styles.profile}>
      <p className={styles.row}>
        <span>Name:</span> {user.username}
      </p>

      <p className={styles.row}>
        <span>Email:</span> {user.email}
      </p>

      <button className='btn btn-danger' onClick={handleLogout}>
        logout
      </button>
    </div>
  );
};

export default Profile;
