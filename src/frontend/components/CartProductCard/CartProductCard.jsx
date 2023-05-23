import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { calculateDiscountPercent } from '../../utils/utils';
import Price from '../Price';
import styles from './CardProductCard.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAllProductsContext } from '../../contexts/ProductsContextProvider';
import { cartActionType } from '../../constants/constants';

const CartProductCard = ({ singleCartItem }) => {
  const {
    moveToWishlistDispatch,
    removeFromCartDispatch,
    addOrRemoveQuantityInCart,
  } = useAllProductsContext();
  const { _id, name, price, originalPrice, image, qty } = singleCartItem;

  const discountPercent = calculateDiscountPercent(price, originalPrice);

  const [isAllBtnsDisabled, setIsAllBtnsDisabled] = useState(false);

  const handleMoveToWishlist = async () => {
    setIsAllBtnsDisabled(true);
    await moveToWishlistDispatch(singleCartItem);
    setIsAllBtnsDisabled(false);
  };

  const handleDeleteFromCart = async () => {
    setIsAllBtnsDisabled(true);
    await removeFromCartDispatch(singleCartItem._id);
    setIsAllBtnsDisabled(false);
  };

  const handleQuantityClick = async (type) => {
    setIsAllBtnsDisabled(true);
    await addOrRemoveQuantityInCart(singleCartItem._id, type);
    setIsAllBtnsDisabled(false);
  };

  return (
    <article className={styles.cartItem}>
      <main className={styles.cartItemMain}>
        {/* child 1 */}
        <div className={styles.imgContainer}>
          <Link to={`/products/${_id}`}>
            <img src={image} alt={name} />
          </Link>
        </div>

        {/* child 2 */}
        <div className={styles.itemInfo}>
          <h3>{name}</h3>
          <div className={styles.cardMain}>
            <Price amount={price} />
            {discountPercent > 0 && (
              <>
                <Price amount={originalPrice} />
                <span className={styles.discount}>
                  {' '}
                  ({discountPercent}% off)
                </span>
              </>
            )}
          </div>

          <footer className={styles.counter}>
            <button
              onClick={
                qty === 1
                  ? handleDeleteFromCart
                  : () => handleQuantityClick(cartActionType.DECREMENT)
              }
              disabled={isAllBtnsDisabled}
            >
              <AiFillMinusCircle />
            </button>
            <div>{qty}</div>
            <button
              onClick={() => handleQuantityClick(cartActionType.DECREMENT)}
              disabled={isAllBtnsDisabled}
            >
              <AiFillPlusCircle />
            </button>
          </footer>
        </div>
      </main>

      <footer className={`btn-container ${styles.cartBtnContainer}`}>
        <button
          className='btn btn-danger'
          disabled={isAllBtnsDisabled}
          onClick={handleDeleteFromCart}
        >
          Remove From Cart
        </button>
        <button
          className='btn'
          disabled={isAllBtnsDisabled}
          onClick={handleMoveToWishlist}
        >
          Move to Wishlist
        </button>
      </footer>
    </article>
  );
};

export default CartProductCard;
