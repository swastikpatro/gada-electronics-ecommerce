import { Categories, FeaturedProducts, Hero } from '../components';
import { useAllProductsContext } from '../contexts/ProductsContextProvider';

const Home = () => {
  const { products: productsFromContext } = useAllProductsContext();

  if (productsFromContext.length < 1) {
    return <main className='full-page'></main>;
  }

  return (
    <main>
      <Hero />
      <Categories />
      <FeaturedProducts />
    </main>
  );
};

export default Home;
