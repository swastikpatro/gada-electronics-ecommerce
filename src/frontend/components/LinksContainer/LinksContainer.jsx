/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import styles from './LinksContainer.module.css';
import { FaRegUserCircle } from 'react-icons/fa';
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { useAuthContext } from '../../contexts/AuthContextProvider';
import { useAllProductsContext } from '../../contexts/ProductsContextProvider';
import ItemCount from './ItemCount';

const LinksContainer = () => {
  // from userContext I will get whether its login or not
  const { user } = useAuthContext();

  const { wishlist: wishlistFromContext, cart: cartFromContext } =
    useAllProductsContext();

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
        <ItemCount count={wishlistFromContext.length} />
      </NavLink>

      <NavLink className={navStyle} to='/cart'>
        <AiOutlineShoppingCart />
        <ItemCount count={cartFromContext.length} />
      </NavLink>
    </div>
  );
};

export default LinksContainer;
