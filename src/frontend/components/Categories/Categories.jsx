import { useNavigate } from 'react-router-dom';
import Title from '../Title/Title';
import styles from './Categories.module.css';
import { useAllProductsContext } from '../../contexts/ProductsContextProvider';

const Categories = () => {
  const navigate = useNavigate();

  const { categories } = useAllProductsContext();

  const handleCategoryClick = () => {
    // check the category in filtersContext
    // then
    // navigate to products
    navigate('/products');
  };

  return (
    <section className='section'>
      <Title>Categories</Title>

      <div className={`container ${styles.categoryContainer}`}>
        {categories.map(({ _id, categoryName }) => (
          <article
            key={_id}
            className={styles.category}
            onClick={() => handleCategoryClick(categoryName)}
          >
            <span>{categoryName}</span>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Categories;
