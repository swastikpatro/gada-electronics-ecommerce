import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useAllProductsContext } from './ProductsContextProvider';

import { FILTERS_ACTION } from '../utils/actions';
import { filtersReducer } from '../reducers';

const initialFiltersState = {
  allProducts: [],
  filteredProducts: [],
  minPrice: 0,
  maxPrice: Infinity, // will be handled
  filters: {
    search: '',
    category: null,
    company: 'all',
    price: 0,
    rating: -1,
    sortByOption: '',
  },
};

/* 
  category: {
    laptop: false,
    tv: false,
    earphone: false,
    smartwatch: false,
    mobile: false
  }
*/

const FiltersContext = createContext(null);

export const useFiltersContext = () => useContext(FiltersContext);

const FiltersContextProvider = ({ children }) => {
  const [filtersState, dispatch] = useReducer(
    filtersReducer,
    initialFiltersState
  );

  const {
    products: productsFromProductsContext,
    categories: categoriesFromProductsContext,
  } = useAllProductsContext();

  useEffect(() => {
    dispatch({
      type: FILTERS_ACTION.GET_PRODUCTS_FROM_PRODUCT_CONTEXT,
      payload: {
        products: productsFromProductsContext,
        categories: categoriesFromProductsContext,
      },
    });
  }, [categoriesFromProductsContext, productsFromProductsContext]);
  // earlier they were products& categories were loading so [], [], after loading they will be filled with data, so when there value change useEffect is called!!

  // console.log({ filtersState });

  // called due to the onChange of category checkbox in the Filters component!
  const updateCategoryFilter = (categoryClicked) => {
    dispatch({
      type: FILTERS_ACTION.UPDATE_CATEGORY,
      payloadCategory: categoryClicked,
    });
  };

  // called due to the onChange of all input (excluding category checkbox) in the Filters component!
  const updateFilters = (e) => {
    const targetEle = e.target;

    // also handles company
    const name = targetEle.name;
    let value = targetEle?.value;

    if (name === 'price') {
      value = Number(value);
    }

    if (name === 'rating') {
      value = Number(targetEle.dataset.rating);
    }

    if (name === 'sortByOption') {
      value = targetEle.dataset.sort;
    }

    dispatch({
      type: FILTERS_ACTION.UPDATE_FILTERS,
      payload: {
        payloadName: name,
        payloadValue: value,
      },
    });
  };

  //  called inside the Filters Component of the ProductListingPage
  const handleClearFilters = () => {
    dispatch({ type: FILTERS_ACTION.CLEAR_FILTERS });
  };

  // called in the Category component of the the Home Page
  const checkCategoryOnTabClick = (categoryCard) => {
    dispatch({
      type: FILTERS_ACTION.CHECK_CATEGORY,
      payloadCategory: categoryCard,
    });
  };

  // called inside the ProductsList Component of the ProductListing Page
  const applyFilters = () => {
    dispatch({
      type: FILTERS_ACTION.APPLY_FILTERS,
    });
  };

  // this searchText is coming from searchBar component, inside useSearchSuggestions hook!!

  // applySearchFilter is called on Clicking the 🔍 icon or pressing Enter in the searchInput (i.e. submit event)
  const applySearchFilter = (searchText) => {
    dispatch({
      type: FILTERS_ACTION.UPDATE_SEARCH_FILTER,
      payloadSearch: searchText,
    });
  };

  return (
    <FiltersContext.Provider
      value={{
        ...filtersState,
        updateFilters,
        updateCategoryFilter,
        handleClearFilters,
        checkCategoryOnTabClick,
        applyFilters,
        applySearchFilter,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export default FiltersContextProvider;
