import React, { createContext, useContext, useEffect, useReducer } from 'react';

const ProductsContext = createContext(null);

const productsReducer = (state, action) => {
  switch (action.type) {
    case 'XYZ':
      return {
        ...state,
      };
    default:
      throw new Error(`${action.type} does not exist`);
  }
};

const initialProductsState = {
  isDataLoading: true,
  products: [],
  categories: [],
  isDataError: false,
};

export const useAllProductsContext = () => useContext(ProductsContext);

const ProductsContextProvider = ({ children }) => {
  const [productsState, dispatch] = useReducer(
    productsReducer,
    initialProductsState
  );

  // useEffect(() => {

  // }, [])

  return (
    <ProductsContext.Provider
      value={{
        ...productsState,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
