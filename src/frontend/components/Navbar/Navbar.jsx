import { Link } from 'react-router-dom';
import { LinksContainer } from '..';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={`container ${styles.navCenter}`}>
        <Link to='/'>
          <h3 className={styles.logo}>
            Gada <span className={styles.logoTheme}>Elec.</span>
          </h3>
        </Link>
        <SearchBar />
        <LinksContainer />
      </div>
    </nav>
  );
};

export default Navbar;
