import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContextProvider';
import { removeLocalStorage, toastHandler } from '../../utils/utils';
import { ToastType, LOCAL_STORAGE_KEYS } from '../../constants/constants';
import { useAllProductsContext } from '../../contexts/ProductsContextProvider';
import { useFiltersContext } from '../../contexts/FiltersContextProvider';
import styles from './Profile.module.css';

const Profile = () => {
  const navigate = useNavigate();
  const {
    updateUserAuth,
    user: { firstName, lastName, email },
  } = useAuthContext();
  const {
    clearCartInContext,
    clearWishlistInContext,
    clearAddressInContext,
    timedMainPageLoader,
  } = useAllProductsContext();

  const { clearFilters } = useFiltersContext();

  const handleLogout = async () => {
    await timedMainPageLoader();
    updateUserAuth({ user: null, token: null });
    removeLocalStorage(LOCAL_STORAGE_KEYS.User);
    removeLocalStorage(LOCAL_STORAGE_KEYS.Token);

    clearCartInContext();
    clearWishlistInContext();
    clearFilters();
    clearAddressInContext();
    toastHandler(ToastType.Success, 'Logged out sucessfully');

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
