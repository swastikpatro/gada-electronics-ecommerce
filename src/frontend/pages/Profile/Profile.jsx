import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContextProvider';
import { removeLocalStorage } from '../../utils/utils';
import { localStorageKeys } from '../../constants/constants';
import { useAllProductsContext } from '../../contexts/ProductsContextProvider';
import { useFiltersContext } from '../../contexts/FiltersContextProvider';
import styles from './Profile.module.css';

const Profile = () => {
  const navigate = useNavigate();
  const {
    updateUserAuth,
    user: { firstName, lastName, email },
  } = useAuthContext();
  const { clearCartInContext, clearWishlistInContext, timedMainPageLoader } =
    useAllProductsContext();

  const { clearFilters } = useFiltersContext();

  const handleLogout = async () => {
    await timedMainPageLoader();
    updateUserAuth({ user: null, token: null });
    removeLocalStorage(localStorageKeys.User);
    removeLocalStorage(localStorageKeys.Token);

    clearCartInContext();
    clearWishlistInContext();
    clearFilters();

    navigate('/');
  };

  return (
    <div className={styles.profile}>
      <p className={styles.row}>
        <span>Name:</span> {`${firstName} ${lastName}`}
      </p>

      <p className={styles.row}>
        <span>Email:</span> {email}
      </p>

      <button className='btn btn-danger' onClick={handleLogout}>
        logout
      </button>
    </div>
  );
};

export default Profile;
