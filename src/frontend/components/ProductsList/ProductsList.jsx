import { useEffect, useState } from 'react';
import { useFiltersContext } from '../../contexts/FiltersContextProvider';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductsList.module.css';
import {
  DELAY_DEBOUNCED_MS,
  TOTAL_SKELETONS_LENGTH,
} from '../../constants/constants';
import SkeletonProductCard from '../ProductCard/SkeletonProductCard';
import { RiFilter2Fill } from 'react-icons/ri';

const ProductsList = ({
  handleFilterToggle,
  isFilterContainerVisible,
  isMobile,
}) => {
  const {
    filteredProducts,
    filters: filtersObjFromContext,
    applyFilters,
    updatePaginatedIndex,
    paginateIndex,
    displayableProductsLength: totalProductsLength,
  } = useFiltersContext();

  const [isFilterLoading, setIsFilterLoading] = useState(false);

  const filteredProductsLength = filteredProducts.length;

  const showFilterButtonJSXInMobile = isMobile && (
    <button
      className={`${styles.showFilterBtn} center-div`}
      onClick={handleFilterToggle}
    >
      <RiFilter2Fill />
    </button>
  );

  const overlayJSXInMobile = isMobile && isFilterContainerVisible && (
    <div className={styles.overlay} onClick={handleFilterToggle}></div>
  );

  useEffect(() => {
    setIsFilterLoading(true);

    const timer = setTimeout(() => {
      applyFilters();

      setIsFilterLoading(false);
    }, DELAY_DEBOUNCED_MS);

    return () => {
      clearTimeout(timer);
    };

    // eslint-disable-next-line
  }, [filtersObjFromContext]);

  // if is filtering, show skeleton cards
  if (isFilterLoading) {
    const skeletons = new Array(TOTAL_SKELETONS_LENGTH).fill(null);

    return (
      <section className={styles.productListSection}>
        <div>
          {overlayJSXInMobile}

          <header className={styles.listHeader}>
            <p className='primary-color-text font-size-one-half'>Loading...</p>
          </header>

          <div className={styles.productsCenter}>
            {skeletons.map((_, index) => (
              <SkeletonProductCard key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (filteredProductsLength < 1) {
    return (
      <section className={styles.errorContainer}>
        {overlayJSXInMobile}

        <p className='error-text'>
          No products matched your filters combination ☹️
        </p>

        {showFilterButtonJSXInMobile}
      </section>
    );
  }

  return (
    <section className={styles.productListSection}>
      {overlayJSXInMobile}

      {showFilterButtonJSXInMobile}

      <header className={styles.listHeader}>
        <p className='primary-color-text font-size-one-half'>
          {totalProductsLength} Product
          {totalProductsLength !== 1 && 's'} Found
        </p>

        <p className={styles.pageCount}>
          Page {paginateIndex + 1} of {filteredProductsLength}
        </p>
      </header>

      <div className={styles.productsCenter}>
        {filteredProducts[paginateIndex].map((singleProduct) => (
          <ProductCard key={singleProduct._id} product={singleProduct} />
        ))}
      </div>

      {filteredProductsLength > 1 && (
        <div className={styles.paginateBtnContainer}>
          <button
            className='btn btn-activated'
            onClick={() =>
              updatePaginatedIndex(
                paginateIndex === 0
                  ? filteredProductsLength - 1
                  : paginateIndex - 1
              )
            }
          >
            prev
          </button>

          {filteredProducts.map((_, index) => (
            <button
              key={index}
              className={paginateIndex === index ? 'btn' : 'btn btn-hipster'}
              onClick={() => updatePaginatedIndex(index)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className='btn btn-activated'
            onClick={() =>
              updatePaginatedIndex(
                paginateIndex === filteredProductsLength - 1
                  ? 0
                  : paginateIndex + 1
              )
            }
          >
            next
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductsList;
