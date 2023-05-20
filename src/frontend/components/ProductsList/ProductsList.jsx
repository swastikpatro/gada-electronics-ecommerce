import { useEffect, useState } from 'react';
import { useFiltersContext } from '../../contexts/FiltersContextProvider';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductsList.module.css';
import {
  delayDebouncedMs,
  totalSkeletonsLength,
} from '../../constants/constants';
import SkeletonProductCard from '../ProductCard/SkeletonProductCard';
const ProductsList = () => {
  // instead of data, will show filteredList coming from FiltersContext

  const {
    filteredProducts,
    filters: filtersObjFromContext,
    applyFilters,
  } = useFiltersContext();

  const [isFilterLoading, setIsFilterLoading] = useState(false);

  const filteredProductsLength = filteredProducts.length;

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
        <p className='primary-color-text font-size-2'>Filtering...</p>

        <div className={styles.productsCenter}>
          {skeletons.map((_, index) => (
            <SkeletonProductCard key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (filteredProductsLength < 1) {
    return (
      <p className='error-text'>
        No products matched your filters combination ☹️
      </p>
    );
  }

  return (
    <section className={styles.productListSection}>
      <p className='primary-color-text font-size-2'>
        {filteredProductsLength} Product{filteredProductsLength !== 1 && 's'}{' '}
        found
      </p>

      <div className={styles.productsCenter}>
        {filteredProducts.map((singleProduct) => (
          <ProductCard key={singleProduct._id} product={singleProduct} />
        ))}
      </div>
    </section>
  );
};

export default ProductsList;
