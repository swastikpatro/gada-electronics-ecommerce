import { ProductCard, Title } from '../../components';
import EmptyList from '../../components/EmptyList/EmptyList';
import { ToastType } from '../../constants/constants';
import { useAllProductsContext } from '../../contexts/ProductsContextProvider';
import { toastHandler } from '../../utils/utils';
import styles from './WishlistPage.module.css';

const WishListPage = () => {
  const { wishlist: wishlistFromContext, clearWishlistDispatch } =
    useAllProductsContext();

  const handleClearWishlist = () => {
    clearWishlistDispatch();
    toastHandler(ToastType.Success, 'Cleared Wishlist Successfully');
  };

  if (wishlistFromContext.length < 1) {
    return <EmptyList listName='wishlist' />;
  }

  return (
    <main className={`full-page ${styles.wishlistPage}`}>
      <Title>Wishlist ({wishlistFromContext.length})</Title>

      <div className={`container ${styles.wishlistsContainer}`}>
        {wishlistFromContext.map((singleWishItem) => (
          <ProductCard key={singleWishItem._id} product={singleWishItem} />
        ))}
      </div>

      {/* made a api in wishlist controller for this functionality. */}
      <button
        className='btn btn-danger btn-padding-desktop btn-center mt-2'
        onClick={handleClearWishlist}
      >
        Clear Wishlist
      </button>
    </main>
  );
};

export default WishListPage;
