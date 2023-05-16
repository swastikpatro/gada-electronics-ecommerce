import { dataMain } from '../../assets/data';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductsList.module.css';
const ProductsList = () => {
  // instead of data, will show filteredList coming from ProductsContext
  return (
    <section className={styles.productListSection}>
      <p>{dataMain.length} Products found</p>

      <div className={styles.productsCenter}>
        {dataMain.map((singleProduct) => (
          <ProductCard key={singleProduct._id} product={singleProduct} />
        ))}
      </div>
    </section>
  );
};

export default ProductsList;
