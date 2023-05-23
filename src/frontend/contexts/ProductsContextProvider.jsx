import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { toastHandler, wait } from '../utils/utils';
import {
  deleteFromWishlistService,
  getAllProductsCategoriesService,
  getWishlistAndCartService,
  postAddToCartService,
  postAddToWishlistService,
} from '../Services/services';
import { productsReducer } from '../reducers';
import { PRODUCTS_ACTION } from '../utils/actions';
import { ToastType, delayToShowLoader } from '../constants/constants';
import { useAuthContext } from './AuthContextProvider';
import { initialProductsState } from '../reducers/productsReducer';

const ProductsContext = createContext(null);

export const useAllProductsContext = () => useContext(ProductsContext);

const ProductsContextProvider = ({ children }) => {
  const [productsState, dispatch] = useReducer(
    productsReducer,
    initialProductsState
  );

  const { user } = useAuthContext();

  // fns
  const showMainPageLoader = () => {
    dispatch({ type: PRODUCTS_ACTION.SHOW_LOADER });
  };

  const hideMainPageLoader = () => {
    dispatch({ type: PRODUCTS_ACTION.HIDE_LOADER });
  };

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

  const fetchWishlistAndCart = async () => {
    showMainPageLoader();
    try {
      const { wishlist, cart } = await getWishlistAndCartService(user?.token);

      console.log({ wishlist, cart });
      dispatch({
        type: PRODUCTS_ACTION.GET_WISHLIST_CART_FULFILLED,
        payload: { wishlist, cart },
      });
      hideMainPageLoader();
    } catch (error) {
      console.log(error.response);
      hideMainPageLoader();
    }
  };

  // useEffects
  useEffect(() => {
    fetchAllProductsAndCategories();
  }, []);

  useEffect(() => {
    if (!user) return;

    fetchWishlistAndCart();
  }, [user]);

  // user changes from null to [{email, username, token}]

  const timedMainPageLoader = async () => {
    showMainPageLoader();
    await wait(delayToShowLoader);
    hideMainPageLoader();
  };

  const updateCart = (cartList) => {
    dispatch({
      type: PRODUCTS_ACTION.UPDATE_CART,
      payload: { cart: cartList },
    });
  };

  const updateWishlist = (wishlistUpdated) => {
    dispatch({
      type: PRODUCTS_ACTION.UPDATE_WISHLIST,
      payload: { wishlist: wishlistUpdated },
    });
  };

  const addToCartDispatch = async (productToAdd) => {
    try {
      const response = await postAddToCartService(productToAdd, user.token);

      const { cart } = response.data;
      const { status } = response;
      if (status === 200 || status === 201) {
        updateCart(cart);
        // console.log(cart);
        toastHandler(ToastType.Success, 'Successfully Added To Cart');
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const addToWishlistDispatch = async (productToAdd) => {
    try {
      const response = await postAddToWishlistService(productToAdd, user.token);

      const { wishlist } = response.data;
      const { status } = response;
      if (status === 200 || status === 201) {
        updateWishlist(wishlist);
        // console.log(cart);
        toastHandler(ToastType.Success, 'Successfully Added To Wishlist');
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const removeFromWishlistDispatch = async (productId) => {
    try {
      const response = await deleteFromWishlistService(productId, user.token);

      const { wishlist } = response.data;
      const { status } = response;
      if (status === 200 || status === 201) {
        updateWishlist(wishlist);
        // console.log(cart);
        toastHandler(ToastType.Warn, 'Removed From Wishlist successfully');
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <ProductsContext.Provider
      value={{
        ...productsState,
        isMainPageLoading: productsState.isDataLoading,
        showMainPageLoader,
        hideMainPageLoader,
        timedMainPageLoader,
        addToCartDispatch,
        addToWishlistDispatch,
        removeFromWishlistDispatch,
        // addToCartRemoveFromWishlistDispatch,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
