import styles from './LinksContainer.module.css';

const ItemCount = ({ count }) => {
  if (count < 1) return;
  return <div className={styles.itemCount}>{count}</div>;
};

export default ItemCount;
