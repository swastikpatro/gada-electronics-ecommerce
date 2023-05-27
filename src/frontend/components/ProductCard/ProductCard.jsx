/* eslint-disable react/prop-types */
import {
  AiFillCheckCircle,
  AiFillHeart,
  AiFillStar,
  AiOutlineHeart,
} from 'react-icons/ai';
import styles from './ProductCard.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Price from '../Price';
import {
  LOGIN_TOAST,
  calculateDiscountPercent,
  isPresent,
} from '../../utils/utils';
import { useAllProductsContext } from '../../contexts/ProductsContextProvider';
import { useAuthContext } from '../../contexts/AuthContextProvider';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isCardInWishlistPage = location.pathname === '/wishlist';

  const { user } = useAuthContext();
  const {
    wishlist: wishlistFromContext,
    cart: cartFromContext,
    addToCartDispatch,
    moveToCartDispatch,
    addToWishlistDispatch,
    removeFromWishlistDispatch,
  } = useAllProductsContext();

  const { colors, stock } = product;
  const inStock = stock > 0;

  const [activeColorObj, setActiveColorObj] = useState(colors[0]);

  const [isBothDisable, setIsBothBtnDisable] = useState(false);

  const isProductInCart = isPresent(
    isCardInWishlistPage
      ? product._id
      : `${product._id}${activeColorObj.color}`,
    cartFromContext
  );

  const isProductInWishlist = isPresent(
    isCardInWishlistPage
      ? product._id
      : `${product._id}${activeColorObj.color}`,
    wishlistFromContext
  );

  let productBtnText = '';

  // If card is in wishlist page & product is in cartContext show- "already in cart" else show 'move to cart'
  if (isCardInWishlistPage && isProductInCart) {
    productBtnText = 'already in Cart';
  }
  if (isCardInWishlistPage && !isProductInCart) {
    productBtnText = 'move to cart';
  }
  // In productListing page, if this product is in cart- "go to cart" else show 'add to cart'
  if (!isCardInWishlistPage && isProductInCart) {
    productBtnText = 'go to cart';
  }
  if (!isCardInWishlistPage && !isProductInCart) {
    productBtnText = 'add to cart';
  }

  const discountPercent = calculateDiscountPercent(
    product.price,
    product.originalPrice
  );

  // functions

  // this is accepting dispatch functions on conditonal basis depending on the page
  const handleCartBtnClick = async (dispatchFunction) => {
    // for wishlist page, there will be a user always

    if (!user) {
      LOGIN_TOAST();
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    if (isProductInCart) {
      navigate('/cart');
      return;
    }

    setIsBothBtnDisable(true);
    // dispatch function takes a product
    await dispatchFunction({
      ...product,
      _id: isCardInWishlistPage
        ? product._id
        : `${product._id}${activeColorObj.color}`,
      colors: [activeColorObj],
    });
    setIsBothBtnDisable(false);
  };

  const handleWishlistBtnClick = async () => {
    if (!user) {
      LOGIN_TOAST();
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    setIsBothBtnDisable(true);

    if (isProductInWishlist) {
      // delete from wishlist
      await removeFromWishlistDispatch(
        isCardInWishlistPage
          ? product._id
          : `${product._id}${activeColorObj.color}`
      );
      setIsBothBtnDisable(false);
      return;
    }

    await addToWishlistDispatch({
      ...product,
      _id: `${product._id}${activeColorObj.color}`,
      colors: [activeColorObj],
    });
    setIsBothBtnDisable(false);
  };

  return (
    <article
      className={
        inStock
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
        onClick={handleWishlistBtnClick}
        disabled={isBothDisable || !inStock}
        className={
          isProductInWishlist
            ? `${styles.heartContainer} ${styles.coloredHeart}`
            : styles.heartContainer
        }
      >
        {isProductInWishlist ? <AiFillHeart /> : <AiOutlineHeart />}
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

        <div
          className={
            isCardInWishlistPage
              ? styles.colorsContainerDefault
              : styles.colorsContainer
          }
        >
          {product.colors.map((colorObj, index) => (
            <span
              key={index}
              style={{ background: colorObj.color }}
              {...(!isCardInWishlistPage &&
                inStock && {
                  onClick: () => setActiveColorObj(colorObj),
                })}
            >
              {colorObj.color === activeColorObj.color &&
                inStock &&
                !isCardInWishlistPage && <AiFillCheckCircle />}
            </span>
          ))}
        </div>

        <footer className={styles.footer}>
          <button
            disabled={isBothDisable || !inStock}
            className={
              isProductInCart
                ? `btn btn-padding-desktop ${styles.cardBtn} ${styles.goToCartBtn}`
                : `btn btn-padding-desktop ${styles.cardBtn}`
            }
            onClick={() =>
              handleCartBtnClick(
                isCardInWishlistPage ? moveToCartDispatch : addToCartDispatch
              )
            }
          >
            {productBtnText}
          </button>
        </footer>
      </div>
    </article>
  );
};

export default ProductCard;
