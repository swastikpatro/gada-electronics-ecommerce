import { useAllProductsContext } from '../../contexts/ProductsContextProvider';
import ProductCard from '../ProductCard/ProductCard';
import Title from '../Title/Title';
import styles from './FeaturedProducts.module.css';

const FeaturedProducts = () => {
  const { products: productsFromContext } = useAllProductsContext();

  const featuredProductsList = productsFromContext.filter(
    (product) => product?.featured
  );

  return (
    <section className='section'>
      <Title>Featured Products</Title>
      <div className={`container ${styles.featuredCenter}`}>
        {featuredProductsList.map((singleProduct) => (
          <ProductCard key={singleProduct._id} product={singleProduct} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
