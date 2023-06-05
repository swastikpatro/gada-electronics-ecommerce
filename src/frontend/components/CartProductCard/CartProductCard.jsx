import {
  calculateDiscountPercent,
  isPresent,
  toastHandler,
} from '../../utils/utils';
import Price from '../Price';
import styles from './CardProductCard.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAllProductsContext } from '../../contexts/ProductsContextProvider';
import { ToastType, INCREMENT_DECRMENT_TYPE } from '../../constants/constants';

const CartProductCard = ({ singleCartItem }) => {
  const navigate = useNavigate();

  const {
    wishlist: wishlistFromContext,
    moveToWishlistDispatch,
    removeFromCartDispatch,
    addOrRemoveQuantityInCart,
  } = useAllProductsContext();

  const isProductInWishlist = isPresent(
    singleCartItem._id,
    wishlistFromContext
  );

  const { _id, name, price, originalPrice, image, qty, colors } =
    singleCartItem;

  const { color, colorQuantity } = colors[0];

  const discountPercent = calculateDiscountPercent(price, originalPrice);

  const [isAllBtnsDisabled, setIsAllBtnsDisabled] = useState(false);

  const handleWishlistBtnClick = async () => {
    if (isProductInWishlist) {
      navigate('/wishlist');
      return;
    }

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
    await addOrRemoveQuantityInCart({
      productId: singleCartItem._id,
      type,
      colorBody: color,
    });
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

          <div
            style={{ background: color }}
            className={styles.colorCircle}
          ></div>

          <footer className={styles.counter}>
            <button
              onClick={
                qty === 1
                  ? handleDeleteFromCart
                  : () => handleQuantityClick(INCREMENT_DECRMENT_TYPE.DECREMENT)
              }
              disabled={isAllBtnsDisabled}
            >
              <span>-</span>
            </button>

            <div>{qty}</div>

            <button
              onClick={
                qty === colorQuantity
                  ? () => toastHandler(ToastType.Warn, 'Stock Limit exceeded')
                  : () => handleQuantityClick(INCREMENT_DECRMENT_TYPE.INCREMENT)
              }
              disabled={isAllBtnsDisabled}
            >
              <span>+</span>
            </button>
          </footer>
        </div>
      </main>

      <footer className={`btn-container ${styles.cartBtnContainer}`}>
        <button
          className='btn'
          disabled={isAllBtnsDisabled}
          onClick={handleWishlistBtnClick}
        >
          {isProductInWishlist ? 'Go to Wishlist' : 'Move to Wishlist'}
        </button>

        <button
          className='btn btn-danger'
          disabled={isAllBtnsDisabled}
          onClick={handleDeleteFromCart}
        >
          Remove From Cart
        </button>
      </footer>
    </article>
  );
};

export default CartProductCard;
