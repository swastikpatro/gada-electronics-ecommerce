import styles from './ProductCard.module.css';

const SkeletonProductCard = () => {
  return (
    <article className={`${styles.productStyle} ${styles.skeletonCard}`}>
      <div className={styles.skeletonImg}></div>
    </article>
  );
};

export default SkeletonProductCard;
