/* eslint-disable react/prop-types */
import { AiFillHeart, AiFillStar, AiOutlineHeart } from 'react-icons/ai';
import styles from './ProductCard.module.css';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Price from '../Price';
import { calculateDiscountPercent } from '../../utils/utils';

const ProductCard = ({ product }) => {
  // instead of creating State find it from wishlist content, if found show colored, else non-colored
  const [isWishlist, setIsWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);

  // functions
  const handleCart = () => {
    // find that in cart from cartContext here
    // add to cart, if that product is not present in the cart
    // else onClick of the button, navigate('/cart')
  };

  const handleWishlist = () => {
    // find that in wishlist from wishListContext here
    // add to cart and remove from wishlist, if that product is not present in the cart
    // else onClick of the button. navigate('/cart')
  };

  const isCardInWishlistPage = location.pathname === '/wishlist';

  // ignore line 34 to 53 // a different way to implement line 55 to 70
  // const { productBtnText } = [
  //   {
  //     condition: isCardInWishlistPage && isInCart,
  //     productBtnText: 'already in Cart',
  //   },
  //   {
  //     condition: isCardInWishlistPage && !isInCart,
  //     productBtnText: 'move to cart',
  //   },
  //   {
  //     condition: !isCardInWishlistPage && isInCart,
  //     productBtnText: 'go to cart',
  //   },
  //   {
  //     condition: !isCardInWishlistPage && !isInCart,
  //     productBtnText: 'add to cart',
  //   },
  // ].find(({ condition }) => condition);

  // console.log({ productBtnText }); // working

  let productBtnText = '';

  // If card is in wishlist page & product is in cartContext show- "already in cart" else show 'move to cart'
  if (isCardInWishlistPage && isInCart) {
    productBtnText = 'already in Cart';
  }
  if (isCardInWishlistPage && !isInCart) {
    productBtnText = 'move to cart';
  }
  // In productListing page, if this product is in cart- "go to cart" else show 'add to cart'
  if (!isCardInWishlistPage && isInCart) {
    productBtnText = 'go to cart';
  }
  if (!isCardInWishlistPage && !isInCart) {
    productBtnText = 'add to cart';
  }

  // the above is made for UI purpose
  const discountPercent = calculateDiscountPercent(
    product.price,
    product.originalPrice
  );

  // console.log({ [product.name]: product.colors });

  return (
    <article
      className={
        product.inStock
          ? styles.productStyle
          : `${styles.productStyle} ${styles.disabledProduct}`
      }
    >
      <div className={styles.imgContainer}>
        <Link to={`/products/${product._id}`}>
          <img src={product.image} alt={product.name} />
        </Link>
      </div>

      <button
        onClick={() => setIsWishlist(!isWishlist)}
        className={
          isWishlist
            ? `${styles.heartContainer} ${styles.coloredHeart}`
            : styles.heartContainer
        }
      >
        {isWishlist ? <AiFillHeart /> : <AiOutlineHeart />}
      </button>

      <div className={styles.cardInfo}>
        <header className={styles.cardHeader}>
          <p>{product.name}</p>
          <span className={styles.rating}>
            {product.stars} <AiFillStar />
          </span>
        </header>

        <main className={styles.cardMain}>
          <Price amount={product.price} />
          {discountPercent > 0 && (
            <>
              <Price amount={product.originalPrice} />
              <span className={styles.discount}> ({discountPercent}% off)</span>
            </>
          )}
        </main>

        <div className={styles.colorsContainer}>
          {product.colors.map((color, index) => (
            <span key={index} style={{ background: color }}></span>
          ))}
          {/* {console.log({ colors: product.colors })} */}
        </div>

        <footer className={styles.footer}>
          <button
            className={
              isInCart
                ? `btn ${styles.cardBtn} ${styles.goToCartBtn}`
                : `btn ${styles.cardBtn}`
            }
            onClick={isCardInWishlistPage ? handleWishlist : handleCart}
          >
            {productBtnText}
          </button>
        </footer>
      </div>
    </article>
  );
};

export default ProductCard;
