import { useNavigate } from 'react-router-dom';
import Title from '../Title/Title';
import styles from './Categories.module.css';
const categories = [
  {
    _id: '26c5d8a2-8913-47fb-ab34-cf078b2ec179',
    categoryName: 'Laptop',
    description: '',
  },
  {
    _id: '86f06c49-e498-4d96-a722-d7bd0b9c79e1',
    categoryName: 'TV',
    description: '',
  },
  {
    _id: '8d63e364-6371-43c0-b919-269a9df9fc71',
    categoryName: 'Smartwatch',
    description: '',
  },
  {
    _id: '4d8ed926-2f73-4c27-a02f-4239094c4d59',
    categoryName: 'Earphone',
    description: '',
  },
  {
    _id: '207dce8e-62b5-42d9-bb67-c9b97815f46e',
    categoryName: 'Mobile',
    description: '',
  },
];

const Categories = () => {
  const navigate = useNavigate();

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
