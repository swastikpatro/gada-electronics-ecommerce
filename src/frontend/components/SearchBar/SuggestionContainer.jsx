/* eslint-disable react/prop-types */
import styles from './SearchBar.module.css';

const SuggestionContainer = ({ children }) => {
  return <section className={styles.suggestions}>{children}</section>;
};

export default SuggestionContainer;
