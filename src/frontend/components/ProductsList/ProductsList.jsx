import { useEffect, useState } from 'react';
import { useFiltersContext } from '../../contexts/FiltersContextProvider';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductsList.module.css';
import {
  delayDebouncedMs,
  totalSkeletonsLength,
} from '../../constants/constants';
import SkeletonProductCard from '../ProductCard/SkeletonProductCard';

const ProductsList = ({
  handleFilterToggle,
  isFilterContainerVisible,
  isMobile,
}) => {
  // instead of data, will show filteredList coming from FiltersContext

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

  const showFilterButtonJSXInMobile = isMobile && !isFilterContainerVisible && (
    <button
      className={`btn ${styles.showFilterBtn}`}
      onClick={handleFilterToggle}
    >
      Show Filters
    </button>
  );

  useEffect(() => {
    setIsFilterLoading(true);

    const timer = setTimeout(() => {
      applyFilters();

      setIsFilterLoading(false);
    }, delayDebouncedMs);

    return () => {
      clearTimeout(timer);
    };

    // eslint-disable-next-line
  }, [filtersObjFromContext]);

  // if is filtering, show skeleton cards
  if (isFilterLoading) {
    const skeletons = new Array(totalSkeletonsLength).fill(null);

    return (
      <section className={styles.productListSection}>
        <div>
          <p className='primary-color-text font-size-one-half'>Loading...</p>

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
      <main className='container'>
        {isMobile && isFilterContainerVisible && (
          <div className={styles.overlay} onClick={handleFilterToggle}></div>
        )}

        <p className='error-text'>
          No products matched your filters combination ☹️
        </p>

        {showFilterButtonJSXInMobile}
      </main>
    );
  }

  return (
    <section className={styles.productListSection}>
      {isMobile && isFilterContainerVisible && (
        <div className={styles.overlay} onClick={handleFilterToggle}></div>
      )}

      <header className={styles.listHeader}>
        <p className='primary-color-text font-size-one-half'>
          {totalProductsLength} Product
          {totalProductsLength !== 1 && 's'} Found
        </p>

        <p className={styles.pageCount}>
          Page {paginateIndex + 1} of {filteredProductsLength}
        </p>

        {showFilterButtonJSXInMobile}
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

          {/*  this should not be index, but a key */}
          {filteredProducts.map((_, index) => (
            <button
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
