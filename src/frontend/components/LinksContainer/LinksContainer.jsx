/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import styles from './LinksContainer.module.css';
import { FaRegUserCircle } from 'react-icons/fa';
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { useAuthContext } from '../../contexts/AuthContextProvider';

const ItemCount = ({ count }) => {
  if (count < 1) return;
  return <span className={styles.itemCount}>{count}</span>;
};

const LinksContainer = () => {
  // from userContext I will get whether its login or not
  const { user } = useAuthContext();
  const navStyle = ({ isActive }) => {
    const outputClass = styles.link;
    if (isActive) return `${outputClass} ${styles.active}`;
    return outputClass;
  };
  //  length will come from both wishlist and cart and passed as count

  return (
    <div className={styles.linksContainer}>
      <NavLink className={styles.exploreLink} to='/products'>
        Explore
      </NavLink>

      <NavLink className={navStyle} to={'/profile'}>
        {user ? <FaRegUserCircle /> : <div className={styles.login}>Login</div>}
      </NavLink>

      <NavLink className={navStyle} to='/wishlist'>
        <AiOutlineHeart />
        <ItemCount count={0} />
      </NavLink>

      <NavLink className={navStyle} to='/cart'>
        <AiOutlineShoppingCart />
        <ItemCount count={2} />
      </NavLink>
    </div>
  );
};

export default LinksContainer;
