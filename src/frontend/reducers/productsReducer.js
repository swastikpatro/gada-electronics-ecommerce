import { PRODUCTS_ACTION } from '../utils/actions';

export const initialProductsState = {
  isDataLoading: true,
  products: [],
  categories: [],
  isDataError: false,
  wishlist: [],
  cart: [],
};

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

    case PRODUCTS_ACTION.SHOW_LOADER:
      return {
        ...state,
        isDataLoading: true,
      };

    case PRODUCTS_ACTION.HIDE_LOADER:
      return {
        ...state,
        isDataLoading: false,
      };

    case PRODUCTS_ACTION.GET_WISHLIST_CART_FULFILLED:
      return {
        ...state,
        wishlist: [...action.payload.wishlist],
        cart: [...action.payload.cart],
      };

    case PRODUCTS_ACTION.UPDATE_CART:
      return {
        ...state,
        cart: [...action.payload.cart],
      };

    case PRODUCTS_ACTION.UPDATE_WISHLIST:
      return {
        ...state,
        wishlist: [...action.payload.wishlist],
      };

    default:
      throw new Error(`${action.type} does not exist`);
  }
};
