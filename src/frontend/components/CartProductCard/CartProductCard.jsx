import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { calculateDiscountPercent } from '../../utils/utils';
import Price from '../Price';
import styles from './CardProductCard.module.css';
import { Link } from 'react-router-dom';

const CartProductCard = ({ singleCartItem }) => {
  const { _id, name, price, originalPrice, image } = singleCartItem;

  const discountPercent = calculateDiscountPercent(price, originalPrice);

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
            <AiFillMinusCircle />
            <div>2</div>
            <AiFillPlusCircle />
          </footer>
        </div>
      </main>

      <footer className={`btn-container ${styles.cartBtnContainer}`}>
        <button className='btn btn-danger'>Remove From Cart</button>
        <button className='btn'>Move to Wishlist</button>
      </footer>
    </article>
  );
};

export default CartProductCard;
