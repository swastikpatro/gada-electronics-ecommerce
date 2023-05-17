import { dataMain } from '../../assets/data';
import { ProductCard, Title } from '../../components';
import styles from './WishlistPage.module.css';

const WishListPage = () => {
  const wishlist = dataMain.slice(0, 10);
  // const wishlist = dataMain.slice(0, 0);

  if (wishlist.length < 1) {
    return (
      <main className={`half-page ${styles.wishlistPage}`}>
        <Title>Wishlist</Title>
        <p>Your wishlist is empty! ☹️</p>
      </main>
    );
  }

  return (
    <main className={`full-page ${styles.wishlistPage}`}>
      <Title>Wishlist ({wishlist.length})</Title>

      <div className={`container ${styles.wishlistsContainer}`}>
        {wishlist.map((singleWishItem) => (
          <ProductCard key={singleWishItem._id} product={singleWishItem} />
        ))}
      </div>
    </main>
  );
};

export default WishListPage;
