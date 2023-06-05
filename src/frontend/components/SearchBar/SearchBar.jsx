import styles from './SearchBar.module.css';

import Suggestions from './Suggestions';
import { useAllProductsContext } from '../../contexts/ProductsContextProvider';

import { BsSearch } from 'react-icons/bs';
import { useSearchSuggestions } from '../../hooks';
import { useFiltersContext } from '../../contexts/FiltersContextProvider';

const SearchBar = () => {
  // instead of allData, get from product context
  const { products: productsFromContext, timedMainPageLoader } =
    useAllProductsContext();
  const { updateSearchFilterInContext, filters: filtersStateFromContext } =
    useFiltersContext();

  const {
    searchText,
    trimmedSearch: trimmedSearchText,
    isSuggestionsVisible,
    isSuggestionsLoading,
    filteredList,
    updateTextOnLinkClick,
    handleFocus,
    handleSearchChange,
    handleSubmit,
    handleBlur,
  } = useSearchSuggestions({
    productsFromContext,
    updateSearchFilterInContext,
    timedMainPageLoader,
    filtersStateFromContext,
  });

  return (
    <form onSubmit={handleSubmit} className={styles.searchBarContainer}>
      <input
        className='search'
        type='search'
        placeholder='Search...'
        name='search'
        onChange={handleSearchChange}
        value={searchText}
        autoComplete='off'
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      <button className={styles.searchBtn} type='submit'>
        <BsSearch />
      </button>

      {isSuggestionsVisible && (
        <Suggestions
          trimmedSearchText={trimmedSearchText}
          filteredList={filteredList}
          isSuggestionsLoading={isSuggestionsLoading}
          updateTextOnLinkClick={updateTextOnLinkClick}
        />
      )}
    </form>
  );
};

export default SearchBar;
