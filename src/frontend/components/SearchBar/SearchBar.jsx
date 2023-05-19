import { useEffect, useState } from 'react';
import styles from './SearchBar.module.css';

import Suggestions from './Suggestions';
import { useAllProductsContext } from '../../contexts/ProductsContextProvider';
import { lowerizeAndCheckIncludes } from '../../utils/utils';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  // instead of allData, get from product context
  const { products: productsFromContext } = useAllProductsContext();
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const trimmedSearch = searchText.trim();

  const handleFilter = () => {
    setFilteredList(
      productsFromContext.filter(
        ({ name, company }) =>
          lowerizeAndCheckIncludes(name, trimmedSearch) ||
          lowerizeAndCheckIncludes(company, trimmedSearch)
      )
    );
  };

  useEffect(() => {
    setisLoading(true);
    const timer = setTimeout(() => {
      handleFilter();
      setisLoading(false);
    }, 200);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [trimmedSearch]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const updateTextToEmpty = () => {
    setSearchText('');
  };

  return (
    <div className={styles.searchBarContainer}>
      <input
        className='search'
        type='search'
        placeholder='Search...'
        onChange={handleSearchChange}
        value={searchText}
        autoComplete='off'
      />
      {trimmedSearch && (
        <Suggestions
          filteredList={filteredList}
          isLoading={isLoading}
          updateTextToEmpty={updateTextToEmpty}
        />
      )}
    </div>
  );
};

export default SearchBar;
