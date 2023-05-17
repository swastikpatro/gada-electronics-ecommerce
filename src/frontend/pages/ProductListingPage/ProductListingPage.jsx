import { Filters, ProductsList } from '../../components';
import styles from './ProductListingPage.module.css';
import { BiUpArrowAlt } from 'react-icons/bi';

const ProductListingPage = () => {
  const handleUpClick = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

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
