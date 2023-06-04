import { useState } from 'react';
import { Filters, ProductsList } from '../../components';
import { useAllProductsContext } from '../../contexts/ProductsContextProvider';
import styles from './ProductListingPage.module.css';
import { useIsMobile } from '../../hooks';

const ProductListingPage = () => {
  const { products: productsFromContext } = useAllProductsContext();

  const [isFilterContainerVisible, setIsFilterContainerVisible] =
    useState(false);
  const isMobile = useIsMobile();

  //  on hard refresh on productListing page, when there is no products in productsContext, show this!!
  if (productsFromContext.length < 1) {
    return <main className='full-page'></main>;
  }

  const handleFilterToggle = () => {
    setIsFilterContainerVisible(!isFilterContainerVisible);
  };

  return (
    <main
      id='filters'
      className={`${styles.productsAndFilterContainer} ${
        isFilterContainerVisible && styles.showFilters
      }`}
    >
      <Filters
        handleFilterToggle={handleFilterToggle}
        isFilterContainerVisible={isFilterContainerVisible}
        isMobile={isMobile}
      />

      <ProductsList
        handleFilterToggle={handleFilterToggle}
        isFilterContainerVisible={isFilterContainerVisible}
        isMobile={isMobile}
      />
    </main>
  );
};

export default ProductListingPage;
