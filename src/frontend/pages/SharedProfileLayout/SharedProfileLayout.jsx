import { Link, Outlet, useMatch } from 'react-router-dom';
import styles from './SharedProfileLayout.module.css';

const SharedProfileLayout = () => {
  const isProfileActive = useMatch('/profile');
  const isAddressActive = useMatch('/profile/address');
  // const isOrdersActive = useMatch('/profile/order');

  const showActiveCSS = (isPageActive) => {
    return isPageActive ? styles.activeLinkCSS : styles.notActiveLinkCSS;
  };
  return (
    <section className={`half-page ${styles.pageCenter}`}>
      <main>
        <header>
          <Link className={showActiveCSS(isProfileActive)} to='/profile'>
            Profile
          </Link>

          <Link
            className={showActiveCSS(isAddressActive)}
            to='/profile/address'
          >
            Address
          </Link>

          {/* <Link className={showActiveCSS(isOrdersActive)} to='/profile/order'>
            Orders
          </Link> */}
        </header>
        <hr />

        <Outlet />
      </main>
    </section>
  );
};

export default SharedProfileLayout;
