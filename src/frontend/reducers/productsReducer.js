import { PRODUCTS_ACTION } from '../utils/actions';

export const productsReducer = (state, action) => {
  switch (action.type) {
    case PRODUCTS_ACTION.GET_ALL_PRODUCTS_BEGIN:
      return {
        ...state,
        isDataLoading: true,
        isDataError: false,
      };
    case PRODUCTS_ACTION.GET_ALL_PRODUCTS_FULFILLED:
      return {
        ...state,
        isDataLoading: false,
        products: [...action.payload.products],
        categories: [...action.payload.categories],
        isDataError: false,
      };
    case PRODUCTS_ACTION.GET_ALL_PRODUCTS_REJECTED:
      return {
        ...state,
        isDataLoading: false,
        isDataError: true,
      };
    default:
      throw new Error(`${action.type} does not exist`);
  }
};
