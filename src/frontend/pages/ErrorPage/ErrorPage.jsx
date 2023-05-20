import errorImage from '../../assets/jethalal-error.png';
import { Title } from '../../components';
import styles from './ErrorPage.module.css';

const ErrorPage = () => {
  return (
    <main className='full-page'>
      <Title>Error</Title>

      <section>
        <div className={styles.imageContainer}>
          <img src={errorImage} alt='jethalal shocked' />
        </div>
      </section>
    </main>
  );
};

export default ErrorPage;
