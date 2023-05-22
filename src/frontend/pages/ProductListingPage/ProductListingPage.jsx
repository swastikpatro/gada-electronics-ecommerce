import { Filters, ProductsList } from '../../components';
import { useAllProductsContext } from '../../contexts/ProductsContextProvider';
import styles from './ProductListingPage.module.css';
import { BiUpArrowAlt } from 'react-icons/bi';

const ProductListingPage = () => {
  const { products: productsFromContext } = useAllProductsContext();

  const handleUpClick = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  //  on hard refresh on productListing page, when there is no products in productsContext, show this!!
  if (productsFromContext.length < 1) {
    return <main className='full-page'></main>;
  }

  return (
    <main
      id='filters'
      className={`container ${styles.productsAndFilterContainer} full-page`}
    >
      <Filters />
      <ProductsList />
      <button className={styles.redirectToTopLink} onClick={handleUpClick}>
        <BiUpArrowAlt />
      </button>
    </main>
  );
};

export default ProductListingPage;
