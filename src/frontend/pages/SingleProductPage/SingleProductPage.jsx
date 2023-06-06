import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getSingleProductService } from '../../Services/services';
import styles from './SingleProductPage.module.css';
import { Error, Price } from '../../components';
import {
  LOGIN_TOAST,
  calculateDiscountPercent,
  isPresent,
} from '../../utils/utils';
import { AiFillCheckCircle, AiFillStar } from 'react-icons/ai';
import { useAllProductsContext } from '../../contexts/ProductsContextProvider';
import { useAuthContext } from '../../contexts/AuthContextProvider';

const SingleProductPage = () => {
  const { productId } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    wishlist: wishlistFromContext,
    cart: cartFromContext,
    showMainPageLoader,
    hideMainPageLoader,
    addToCartDispatch,
    addToWishlistDispatch,
  } = useAllProductsContext();

  const [singleProductState, setSingleProductState] = useState({
    isSinglePageLoading: true,
    singleProductData: [],
    isSinglePageError: false,
  });

  const [activeColorObj, setActiveColorObj] = useState(null);
  const [isWishlistBtnDisable, setIsWishlistBtnDisable] = useState(false);
  const [isCartBtnDisable, setIsCartBtnDisable] = useState(false);

  const fetchSingleProduct = async () => {
    setSingleProductState({ ...singleProductState, isSinglePageLoading: true });

    showMainPageLoader();

    try {
      const product = await getSingleProductService(productId);

      hideMainPageLoader();
      setSingleProductState({
        isSinglePageLoading: false,
        singleProductData: product,
        isSinglePageError: false,
      });
      setActiveColorObj(product?.colors[0]);
    } catch (error) {
      console.error(error.response);

      hideMainPageLoader();

      setSingleProductState({
        ...singleProductState,
        isSinglePageLoading: false,
        isSinglePageError: true,
      });
    }
  };

  useEffect(() => {
    fetchSingleProduct();
    // eslint-disable-next-line
  }, [productId]);

  // if the user is in single product page (of oneplus 10R), clicks on the suggestions Link (eg oneplus air 2020), only the productId in the url of singleProductPage changes but as the singleProductPage was already mounted, it doesnot fetch again the new product, so added productId in the dependency list

  const { isSinglePageLoading, singleProductData, isSinglePageError } =
    singleProductState;

  if (isSinglePageLoading) {
    return <main className='full-page'></main>;
  }

  if (isSinglePageError) {
    return <Error errorText='Error: Product Not Found' />;
  }

  const {
    _id: singlePageProductId,
    name,
    price,
    originalPrice,
    image,
    colors,
    company,
    description,
    category,
    isShippingAvailable,
    stock,
    reviewCount,
    stars,
  } = singleProductData;

  const discountPercent = calculateDiscountPercent(price, originalPrice);
  const inStock = stock > 0;

  const isSinglePageProductInCart = isPresent(
    `${singlePageProductId}${activeColorObj?.color}`,
    cartFromContext
  );

  const isSinglePageProductInWishlist = isPresent(
    `${singlePageProductId}${activeColorObj?.color}`,
    wishlistFromContext
  );

  const handleCartBtnClick = async () => {
    if (!user) {
      LOGIN_TOAST();
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    if (isSinglePageProductInCart) {
      navigate('/cart');
      return;
    }

    setIsCartBtnDisable(true);
    await addToCartDispatch({
      ...singleProductData,
      _id: `${singleProductData._id}${activeColorObj.color}`,
      colors: [activeColorObj],
    });
    setIsCartBtnDisable(false);
  };

  const handleWishlistBtnClick = async () => {
    if (!user) {
      LOGIN_TOAST();
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    if (isSinglePageProductInWishlist) {
      navigate('/wishlist');
      return;
    }

    setIsWishlistBtnDisable(true);
    await addToWishlistDispatch({
      ...singleProductData,
      _id: `${singleProductData._id}${activeColorObj.color}`,
      colors: [activeColorObj],
    });
    setIsWishlistBtnDisable(false);
  };

  const handleColorClick = (colorData) => setActiveColorObj(colorData);

  return (
    <main className={`container half-page ${styles.productPageCenter}`}>
      <div className={styles.imageContainer}>
        <img src={image} alt={name} />
      </div>

      <div className={styles.productContent}>
        <h3 className='primary-color-text'>{name}</h3>
        <div className={styles.userReview}>
          <span className={styles.rating}>
            {stars} <AiFillStar />
          </span>
          <p>({reviewCount} customer reviews)</p>
        </div>

        <div className={styles.price}>
          <Price amount={price} />
          {discountPercent > 0 && (
            <>
              <Price amount={originalPrice} />
              <span className={styles.discount}> ({discountPercent}% off)</span>
            </>
          )}
        </div>

        <p className={styles.desc}>{description}</p>

        <div className={styles.row}>
          <span>Availability:</span>
          <p>{inStock ? 'In Stock' : 'Out Of Stock'}</p>
        </div>

        <div className={styles.row}>
          <span>Shipping Available:</span>
          <p>{isShippingAvailable ? 'Yes' : 'No'}</p>
        </div>

        <div className={styles.row}>
          <span>Category:</span>
          <p>{category}</p>
        </div>

        <div className={styles.row}>
          <span>Company:</span>
          <p>{company}</p>
        </div>

        <div className={styles.row}>
          <span>Color{colors.length > 1 && 's'}:</span>

          <div
            className={
              inStock
                ? styles.colorsContainer
                : `${styles.colorsContainer} ${styles.cursorDefault}`
            }
          >
            {colors.map((colorObj, index) => (
              <div
                {...(inStock && { onClick: () => handleColorClick(colorObj) })}
                key={index}
                style={{ background: colorObj.color }}
              >
                {colorObj.color === activeColorObj.color && inStock && (
                  <AiFillCheckCircle />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <span>Available Stock:</span>
          <p>{activeColorObj.colorQuantity}</p>
        </div>

        <hr />

        <div className='btn-container'>
          <button
            className={`btn btn-padding-desktop ${
              isSinglePageProductInCart && 'btn-activated'
            }`}
            disabled={!inStock || isCartBtnDisable}
            onClick={handleCartBtnClick}
          >
            {isSinglePageProductInCart ? 'Go to Cart' : 'Add To Cart'}
          </button>

          <button
            onClick={handleWishlistBtnClick}
            className={`btn btn-hipster btn-padding-desktop ${
              isSinglePageProductInWishlist && 'btn-hipster-activated'
            }`}
            disabled={!inStock || isWishlistBtnDisable}
          >
            {isSinglePageProductInWishlist
              ? 'Go to Wishlist'
              : 'Add To Wishlist'}
          </button>
        </div>
      </div>
    </main>
  );
};

export default SingleProductPage;
