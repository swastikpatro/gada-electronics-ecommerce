import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useAllProductsContext } from './ProductsContextProvider';
import { lowerizeAndCheckIncludes } from '../utils/utils';
import { SortType } from '../constants/constants';

const FILTERS_ACTION = {
  GET_PRODUCTS_FROM_PRODUCT_CONTEXT: 'GET_PRODUCTS_FROM_PRODUCT_CONTEXT',
  UPDATE_CATEGORY: 'UPDATE_CATEGORY',
  UPDATE_FILTERS: 'UPDATE_FILTERS',
  CLEAR_FILTERS: 'CLEAR_FILTERS',
  CHECK_CATEGORY: 'CHECK_CATEGORY',
  APPLY_FILTERS: 'APPLY_FILTERS',
};

const initialFiltersState = {
  allProducts: [],
  filteredProducts: [],
  minPrice: 0,
  maxPrice: Infinity, // will be handled
  filters: {
    search: '',
    category: null,
    // {
    //   laptop: false,
    //   tv: false,
    //   earphone: false,
    //   smartwatch: false,
    //   mobile: false
    // }
    company: 'all',
    price: 0,
    rating: -1,
    sortByOption: '',
  },
};

const convertArrayToObjectWithPropertyFALSE = (listOfStrings = []) => {
  return listOfStrings.reduce((acc, curr) => {
    acc[curr] = false;
    return acc;
  }, {});
};

const FiltersContext = createContext(null);

export const useFiltersContext = () => useContext(FiltersContext);

const filtersReducer = (state, action) => {
  switch (action.type) {
    case FILTERS_ACTION.GET_PRODUCTS_FROM_PRODUCT_CONTEXT:
      const allProductsCloned = structuredClone(action.payload?.products);

      const allPrices = allProductsCloned.map(({ price }) => price);

      const allCategoryNames = action.payload?.categories.map(
        ({ categoryName }) => categoryName
      );

      let minPrice = 0,
        maxPrice = 0;

      if (allProductsCloned.length > 1) {
        maxPrice = Math.max(...allPrices);
        minPrice = Math.min(...allPrices);
      }

      // console.log({ allPrices });
      return {
        ...state,
        allProducts: allProductsCloned,
        filteredProducts: allProductsCloned,
        minPrice,
        maxPrice,
        filters: {
          ...state.filters,
          category: convertArrayToObjectWithPropertyFALSE(allCategoryNames),
          price: maxPrice,
        },
      };

    case FILTERS_ACTION.UPDATE_CATEGORY:
      return {
        ...state,
        filters: {
          ...state.filters,
          category: {
            ...state.filters.category,
            [action.payloadCategory]:
              !state.filters.category[action.payloadCategory],
          },
        },
      };

    case FILTERS_ACTION.UPDATE_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.payloadName]: action.payload.payloadValue,
        },
      };

    case FILTERS_ACTION.CHECK_CATEGORY:
      const allUncheckedCategoryObj = convertArrayToObjectWithPropertyFALSE(
        Object.keys(state.filters.category)
      );

      return {
        ...state,
        filters: {
          ...state.filters,
          category: {
            ...allUncheckedCategoryObj,
            [action.payloadCategory]: true,
          },
        },
      };

    case FILTERS_ACTION.CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          search: '',
          category: convertArrayToObjectWithPropertyFALSE(
            Object.keys(state.filters.category)
          ),
          company: 'all',
          price: state.maxPrice,
          rating: -1,
          sortByOption: '',
        },
      };

    case FILTERS_ACTION.APPLY_FILTERS:
      const { allProducts, filters } = state;
      const {
        search: searchText,
        category: categoryObjInState,
        company: companyInState,
        price: priceInState,
        rating: ratingInState,
        sortByOption,
      } = filters;

      const isAnyCheckboxChecked = Object.values(categoryObjInState).some(
        (categoryBool) => categoryBool
      );

      // this temp products will become filteredProducts
      let tempProducts = allProducts;

      // search handled here
      tempProducts = allProducts.filter(
        ({ name, company: companyProperty }) => {
          const trimmedSearchText = searchText.trim();
          return (
            lowerizeAndCheckIncludes(name, trimmedSearchText) ||
            lowerizeAndCheckIncludes(companyProperty, trimmedSearchText)
          );
        }
      );

      // category checkbox handled here
      if (isAnyCheckboxChecked) {
        tempProducts = tempProducts.filter(
          ({ category: categoryPropertyOfProduct }) =>
            categoryObjInState[categoryPropertyOfProduct]
        );
      }

      // company dropdown handled here
      if (companyInState !== 'all') {
        tempProducts = tempProducts.filter(
          ({ company: companyPropertyOfProduct }) =>
            companyPropertyOfProduct === companyInState
        );
      }

      // price handled here, no (if) condition, this will run always!!
      tempProducts = tempProducts.filter(
        ({ price: pricePropertyOfProduct }) =>
          pricePropertyOfProduct <= priceInState
      );

      // ratings handled here, no (if) condition, this will run always!!
      tempProducts = tempProducts.filter(({ stars }) => stars >= ratingInState);

      // sort handled here!!, if sortByOption is '', ignore sorting
      if (!!sortByOption) {
        switch (sortByOption) {
          case SortType.PRICE_LOW_TO_HIGH: {
            tempProducts = [...tempProducts].sort((a, b) => a.price - b.price);
            break;
          }

          case SortType.PRICE_HIGH_TO_LOW: {
            tempProducts = [...tempProducts].sort((a, b) => b.price - a.price);
            break;
          }

          case SortType.NAME_A_TO_Z: {
            tempProducts = [...tempProducts].sort((a, b) => {
              a = a.name.toLowerCase();
              b = b.name.toLowerCase();

              if (a > b) return 1;

              if (a < b) return -1;

              return 0;
            });
            break;
          }
          case SortType.NAME_Z_TO_A: {
            tempProducts = [...tempProducts].sort((a, b) => {
              a = a.name.toLowerCase();
              b = b.name.toLowerCase();

              if (a > b) return -1;
              if (a < b) return 1;
              return 0;
            });

            break;
          }

          default:
            throw new Error(`${sortByOption} is not defined`);
        }

        // console.log({ sortOptions })
      }

      console.log({ tempProducts });
      return {
        ...state,
        filteredProducts: tempProducts,
      };
    default:
      throw new Error(`Error: ${action.type} in filtersReducer does not exist`);
  }
};

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
