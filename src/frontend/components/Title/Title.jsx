import styles from './Title.module.css';

const Title = ({ children }) => {
  return (
    <div>
      <h2 className={styles.title}>{children}</h2>
      <div className={styles.titleUnderline}></div>
    </div>
  );
};

export default Title;
