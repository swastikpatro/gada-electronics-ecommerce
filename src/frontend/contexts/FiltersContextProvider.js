import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useAllProductsContext } from './ProductsContextProvider';

import { FILTERS_ACTION } from '../utils/actions';
import { filtersReducer } from '../reducers';
import { initialFiltersState } from '../reducers/filtersReducer';
import {
  FILTER_INPUT_TYPE,
  MIN_DISTANCE_BETWEEN_THUMBS,
} from '../constants/constants';

const FiltersContext = createContext(null);

export const useFiltersContext = () => useContext(FiltersContext);

const FiltersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filtersReducer, initialFiltersState);

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

  // called due to the onChange of category checkbox in the Filters component!
  const updateCategoryFilter = (categoryClicked) => {
    dispatch({
      type: FILTERS_ACTION.UPDATE_CATEGORY,
      payloadCategory: categoryClicked,
    });
  };

  const updatePriceFilter = (e, newValue, activeThumb) => {
    const { name } = e.target;

    let value;

    value =
      activeThumb === 0
        ? [
            Math.min(newValue[0], newValue[1] - MIN_DISTANCE_BETWEEN_THUMBS),
            newValue[1],
          ]
        : [
            newValue[0],
            Math.max(newValue[1], newValue[0] + MIN_DISTANCE_BETWEEN_THUMBS),
          ];

    dispatch({
      type: FILTERS_ACTION.UPDATE_FILTERS,
      payload: {
        payloadName: name,
        payloadValue: value,
      },
    });
  };

  // called due to the onChange of all input (excluding category checkbox) in the Filters component!
  const updateFilters = (e) => {
    const targetEle = e.target;

    // also handles company
    const name = targetEle.name;
    let value = targetEle?.value;

    if (name === FILTER_INPUT_TYPE.RATING) {
      value = Number(targetEle.dataset.rating);
    }

    if (name === FILTER_INPUT_TYPE.SORT) {
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
  const clearFilters = () => {
    dispatch({ type: FILTERS_ACTION.CLEAR_FILTERS });
  };

  // called in the Category component of the the Home Page
  const checkCategoryOnTabClick = (categoryCard) => {
    clearFilters();

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

  // updateSearchFilterInContext is called on Clicking the 🔍 icon or pressing Enter in the searchInput (i.e. submit event)
  const updateSearchFilterInContext = (searchText) => {
    dispatch({
      type: FILTERS_ACTION.UPDATE_SEARCH_FILTER,
      payloadSearch: searchText,
    });
  };

  const updatePaginatedIndex = (paginateIndex) => {
    dispatch({
      type: FILTERS_ACTION.UPDATE_PAGINATION,
      payloadIndex: paginateIndex,
    });
  };

  return (
    <FiltersContext.Provider
      value={{
        ...state,
        updateFilters,
        updateCategoryFilter,
        clearFilters,
        checkCategoryOnTabClick,
        applyFilters,
        updateSearchFilterInContext,
        updatePaginatedIndex,
        updatePriceFilter,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
export default FiltersContextProvider;
