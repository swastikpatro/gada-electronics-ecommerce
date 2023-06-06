import { Link } from 'react-router-dom';
import Title from '../Title/Title';

import styles from './EmptyList.module.css';

const EmptyList = ({ listName }) => {
  return (
    <main className='half-page'>
      <Title>{listName}</Title>

      <p className={`text-center ${styles.emptyText}`}>
        Your {listName} is empty! ☹️
      </p>

      <Link to='/products' className='btn btn-center'>
        Explore
      </Link>
    </main>
  );
};

export default EmptyList;
