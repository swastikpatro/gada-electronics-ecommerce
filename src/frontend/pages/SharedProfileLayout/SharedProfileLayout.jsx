import { Link, Outlet, useMatch } from 'react-router-dom';
import styles from './SharedProfileLayout.module.css';

const SharedProfileLayout = () => {
  const isProfileActive = useMatch('/profile');
  const isAddressActive = useMatch('/profile/address');

  return (
    <section className={`half-page ${styles.pageCenter}`}>
      <main>
        <header>
          <Link
            className={
              isProfileActive ? styles.activeLinkCSS : styles.notActiveLinkCSS
            }
            to='/profile'
          >
            Profile
          </Link>

          <Link
            className={
              isAddressActive ? styles.activeLinkCSS : styles.notActiveLinkCSS
            }
            to='/profile/address'
          >
            Address
          </Link>
        </header>
        <hr />

        <Outlet />
      </main>
    </section>
  );
};

export default SharedProfileLayout;
