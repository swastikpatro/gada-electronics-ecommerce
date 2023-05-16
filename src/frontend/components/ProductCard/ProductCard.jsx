/* eslint-disable react/prop-types */
import { AiFillHeart, AiFillStar, AiOutlineHeart } from 'react-icons/ai';
import styles from './ProductCard.module.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Price from '../Price';
import { calculateDiscountPercent } from '../../utils/utils';

// {
//     _id: 'redmi-7',
//     name: 'mi watch 2 lite',
//     price: 2280,
//     originalPrice: 7999,
//     featured: true,
//     // img to add
//     image:
//       'https://res.cloudinary.com/dtbd1y4en/image/upload/v1683909641/mi-watch-2-lite_ofbl7m.jpg',
//     colors: ['#00ff00', '#000', '#ffb900'],
//     company: 'redmi',
//     description:
//       'For this model, screen size is 3.94 cm and rectangular in shape.  Special Feature includes Rate Monitor, Oxymeter (SpO2), Music Player, Camera. Jethalal uses it to track his heart beat 🧡, when Babita ji comes!',
//     category: 'smartwatch',
//     isShippingAvailable: true,
//     inStock: true,
//     reviewCount: 508,
//     stars: 3.5,
//   }

const ProductCard = ({ product }) => {
  // instead of creating State find it from wishlist content, if found show colored, else non-colored
  const [isWishlist, setIsWishlist] = useState(false);
  const [isCart, setIsCart] = useState(false);
  const navigate = useNavigate();
  // the above is made for UI purpose
  const discountPercent = calculateDiscountPercent(
    product.price,
    product.originalPrice
  );

  const handleToCart = () => {
    // that find in cart from cartContext here
    if (isCart) {
      navigate('/cart');
      return;
    }
    setIsCart(!isCart);
  };

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
              <span> ({discountPercent}% off)</span>
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
            onClick={handleToCart}
            className={
              isCart
                ? `btn ${styles.cartBtn} ${styles.goToCartBtn}`
                : `btn ${styles.cartBtn}`
            }
          >
            {isCart ? 'go to cart' : 'add to cart'}
          </button>
        </footer>
      </div>
    </article>
  );
};

export default ProductCard;
