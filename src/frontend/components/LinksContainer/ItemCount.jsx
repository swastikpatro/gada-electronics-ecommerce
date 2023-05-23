import styles from './LinksContainer.module.css';

const ItemCount = ({ count }) => {
  if (count < 1) return;
  return <span className={styles.itemCount}>{count}</span>;
};

export default ItemCount;
