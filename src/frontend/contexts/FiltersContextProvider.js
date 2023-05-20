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
    /* 
    category: {
      laptop: false,
      tv: false,
      earphone: false,
      smartwatch: false,
      mobile: false
    }
    */
    company: 'all',
    price: 0,
    rating: -1,
    sortByOption: '',
  },
};

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

  // console.log({ filtersState });

  const updateCategoryFilter = (categoryClicked) => {
    dispatch({
      type: FILTERS_ACTION.UPDATE_CATEGORY,
      payloadCategory: categoryClicked,
    });
  };

  const updateFilters = (e) => {
    const targetEle = e.target;
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

  const handleClearFilters = () => {
    dispatch({ type: FILTERS_ACTION.CLEAR_FILTERS });
  };

  const checkCategoryOnTabClick = (categoryCard) => {
    dispatch({
      type: FILTERS_ACTION.CHECK_CATEGORY,
      payloadCategory: categoryCard,
    });
  };

  const applyFilters = () => {
    dispatch({
      type: FILTERS_ACTION.APPLY_FILTERS,
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
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export default FiltersContextProvider;
