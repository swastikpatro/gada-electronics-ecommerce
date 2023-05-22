import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { wait } from '../utils/utils';
import { getAllProductsCategoriesService } from '../Services/services';
import { productsReducer } from '../reducers';
import { PRODUCTS_ACTION } from '../utils/actions';
import { delayToShowLoader } from '../constants/constants';

const ProductsContext = createContext(null);

export const useAllProductsContext = () => useContext(ProductsContext);

const initialProductsState = {
  isDataLoading: true,
  products: [],
  categories: [],
  isDataError: false,
};

const ProductsContextProvider = ({ children }) => {
  const [productsState, dispatch] = useReducer(
    productsReducer,
    initialProductsState
  );

  const fetchAllProductsAndCategories = async () => {
    dispatch({ type: PRODUCTS_ACTION.GET_ALL_PRODUCTS_BEGIN });
    // as the response was quick, used wait (check utils) to show Loader for 1000s
    await wait(delayToShowLoader);

    try {
      const { products, categories } = await getAllProductsCategoriesService();

      dispatch({
        type: PRODUCTS_ACTION.GET_ALL_PRODUCTS_FULFILLED,
        payload: { products, categories },
      });
    } catch (error) {
      dispatch({ type: PRODUCTS_ACTION.GET_ALL_PRODUCTS_REJECTED });

      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllProductsAndCategories();
  }, []);

  const showMainPageLoader = () => {
    dispatch({ type: PRODUCTS_ACTION.SHOW_LOADER });
  };

  const hideMainPageLoader = () => {
    dispatch({ type: PRODUCTS_ACTION.HIDE_LOADER });
  };

  const timedMainPageLoader = async () => {
    showMainPageLoader();
    await wait(delayToShowLoader);
    hideMainPageLoader();
  };

  return (
    <ProductsContext.Provider
      value={{
        ...productsState,
        isMainPageLoading: productsState.isDataLoading,
        showMainPageLoader,
        hideMainPageLoader,
        timedMainPageLoader,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
