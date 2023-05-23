import { Link } from 'react-router-dom';
import { CartProductCard, Price, Title } from '../../components';
import EmptyList from '../../components/EmptyList/EmptyList';
import styles from './CartPage.module.css';
import { useAllProductsContext } from '../../contexts/ProductsContextProvider';

const CartPage = () => {
  const { cart: cartFromContext } = useAllProductsContext();

  if (cartFromContext.length < 1) {
    return <EmptyList listName='cart' />;
  }

  return (
    <main className={`full-page ${styles.cartListPage}`}>
      <Title>Cart ({cartFromContext.length})</Title>

      <div className={`container ${styles.cartCenter}`}>
        <section className={styles.cartListContainer}>
          {cartFromContext.map((singleCartItem) => (
            <CartProductCard
              key={singleCartItem._id}
              singleCartItem={singleCartItem}
            />
          ))}
          {/* made a api in cart controller for this functionality. */}
          <button className='btn btn-danger btn-padding-desktop btn-center'>
            Clear Cart
          </button>
        </section>

        {/* this will come from cartContext */}
        <article className={styles.checkout}>
          <h3 className='text-center'>Cart Price Details</h3>
          <hr />
          <article className={styles.row}>
            <span>Name Item From Cart (2)</span>
            <Price amount={110192} />
          </article>
          <article className={styles.row}>
            <span>Name Item From Cart (2)</span>
            <Price amount={110192} />
          </article>
          <article className={styles.row}>
            <span>Name Item From Cart (2)</span>
            <Price amount={110192} />
          </article>
          <article className={styles.row}>
            <span>Name Item From Cart (2)</span>
            <Price amount={110192} />
          </article>

          <hr />
          <article className={`${styles.row} ${styles.totalPrice}`}>
            <span>Total Price:</span>
            <Price amount={110192} />
          </article>

          <Link to='/checkout' className='btn btn-center'>
            Checkout
          </Link>
        </article>
      </div>
    </main>
  );
};

export default CartPage;
