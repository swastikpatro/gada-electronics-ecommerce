import { useAllProductsContext } from '../../contexts/ProductsContextProvider';
import styles from './OrderPage.module.css';

const Order = () => {
  const { orderDetails: orderDetailsFromContext } = useAllProductsContext();
  console.log({ orderDetailsFromContext });
  return <section>OrderPage</section>;
};

export default Order;
