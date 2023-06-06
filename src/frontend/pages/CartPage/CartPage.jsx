import { Link } from 'react-router-dom';
import { CartProductCard, Price, Title } from '../../components';
import EmptyList from '../../components/EmptyList/EmptyList';
import styles from './CartPage.module.css';
import { useAllProductsContext } from '../../contexts/ProductsContextProvider';
import { toastHandler } from '../../utils/utils';
import { ToastType } from '../../constants/constants';

const CartPage = () => {
  const {
    cart: cartFromContext,
    clearCartDispatch,
    cartDetails: { totalCount, totalAmount },
  } = useAllProductsContext();

  const handleClearCart = () => {
    clearCartDispatch();
    toastHandler(ToastType.Success, 'Cleared Cart Successfully');
  };

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
          <button
            className='btn btn-danger btn-padding-desktop btn-center mt-2'
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        </section>

        {/* this will come from cartContext */}
        <article className={styles.checkout}>
          <h3 className='text-center'>Cart Price Details</h3>
          <hr />

          <div className={styles.detailsContainer}>
            {cartFromContext.map(
              ({ _id, name, qty, price, colors: [{ color }] }) => (
                <article key={_id} className={styles.row}>
                  <span>
                    {name}{' '}
                    <span
                      className={styles.colorCircle}
                      style={{ background: color }}
                    ></span>
                    ({qty})
                  </span>
                  <Price amount={price * qty} />
                </article>
              )
            )}
          </div>

          <hr />
          <article className={`${styles.row} ${styles.totalPrice}`}>
            <span>Total Price ({totalCount}):</span>
            <Price amount={totalAmount} />
          </article>

          <Link to='/checkout' className='btn text-center btn-width-100'>
            Checkout
          </Link>
        </article>
      </div>
    </main>
  );
};

export default CartPage;
