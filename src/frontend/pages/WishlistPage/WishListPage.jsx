import { dataMain } from '../../assets/data';
import { ProductCard, Title } from '../../components';
import EmptyList from '../../components/EmptyList/EmptyList';
import styles from './WishlistPage.module.css';

const WishListPage = () => {
  const wishlist = dataMain.slice(0, 10);
  // const wishlist = dataMain.slice(0, 0);

  if (wishlist.length < 1) {
    return <EmptyList listName='wishlist' />;
  }

  return (
    <main className={`full-page ${styles.wishlistPage}`}>
      <Title>Wishlist ({wishlist.length})</Title>

      <div className={`container ${styles.wishlistsContainer}`}>
        {wishlist.map((singleWishItem) => (
          <ProductCard key={singleWishItem._id} product={singleWishItem} />
        ))}
      </div>

      {/* made a api in wishlist controller for this functionality. */}
      <button className='btn btn-danger btn-padding-desktop btn-center'>
        Clear Wishlist
      </button>
    </main>
  );
};

export default WishListPage;
