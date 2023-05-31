import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { toastHandler, wait } from '../utils/utils';
import {
  deleteCartDataService,
  deleteFromCartService,
  deleteFromWishlistService,
  deleteWishlistDataService,
  getAllProductsCategoriesService,
  getWishlistAndCartService,
  incDecItemInCartService,
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

  // x
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

        toastHandler(ToastType.Success, 'Successfully Added To Wishlist');
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const removeFromCartDispatch = async (productId) => {
    try {
      const response = await deleteFromCartService(productId, user.token);

      const { cart } = response.data;
      const { status } = response;
      if (status === 200 || status === 201) {
        updateCart(cart);
        toastHandler(ToastType.Warn, 'Removed From Cart successfully');
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
        toastHandler(ToastType.Warn, 'Removed From Wishlist successfully');
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const clearWishlistDispatch = async () => {
    showMainPageLoader();
    try {
      const response = await deleteWishlistDataService(user.token);

      const { wishlist } = response.data;
      const { status } = response;
      if (status === 200 || status === 201) {
        updateWishlist(wishlist);
      }
      hideMainPageLoader();
    } catch (error) {
      console.log(error.response);
      hideMainPageLoader();
    }
  };

  const clearCartDispatch = async () => {
    showMainPageLoader();
    try {
      const response = await deleteCartDataService(user.token);

      const { cart } = response.data;
      const { status } = response;
      if (status === 200 || status === 201) {
        updateCart(cart);
      }
      hideMainPageLoader();
    } catch (error) {
      console.log(error.response);
      hideMainPageLoader();
    }
  };

  const moveToWishlistDispatch = async (product) => {
    try {
      const addToWishlistPromise = postAddToWishlistService(
        product,
        user.token
      );
      const removeFromCartPromise = deleteFromCartService(
        product._id,
        user.token
      );

      const [wishlistResponse, cartResponse] = await Promise.all([
        addToWishlistPromise,
        removeFromCartPromise,
      ]);

      const { cart } = cartResponse.data;
      const { wishlist } = wishlistResponse.data;

      updateCart(cart);
      updateWishlist(wishlist);

      toastHandler(ToastType.Success, 'Moved to Wishlist successfully');
    } catch (error) {
      console.log(error.response);
    }
  };

  const moveToCartDispatch = async (product) => {
    // this will be called from the wishlist page
    try {
      const addToCartPromise = postAddToCartService(product, user.token);
      const removeFromWishlistPromise = deleteFromWishlistService(
        product._id,
        user.token
      );

      const [cartResponse, wishlistResponse] = await Promise.all([
        addToCartPromise,
        removeFromWishlistPromise,
      ]);

      const { cart } = cartResponse.data;
      const { wishlist } = wishlistResponse.data;

      updateCart(cart);
      updateWishlist(wishlist);
    } catch (error) {
      console.log(error.response);
    }
  };

  const addOrRemoveQuantityInCart = async ({ productId, type, colorBody }) => {
    try {
      const response = await incDecItemInCartService({
        productId,
        type,
        token: user.token,
        colorBody,
      });

      const { cart } = response.data;
      const { status } = response;
      if (status === 200 || status === 201) {
        updateCart(cart);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  // address

  const addAddressDispatch = (addressObj) => {
    toastHandler(ToastType.Success, 'Added Address Successfully');
    dispatch({
      type: PRODUCTS_ACTION.ADD_ADDRESS,
      payload: {
        address: addressObj,
      },
    });
  };

  const editAddressDispatch = (addressObj) => {
    toastHandler(ToastType.Success, 'Updated Address Successfully');
    dispatch({
      type: PRODUCTS_ACTION.EDIT_ADDRESS,
      payload: {
        address: addressObj,
      },
    });
  };

  const deleteAddressDispatch = (addressId) => {
    toastHandler(ToastType.Success, 'Deleted Address Successfully');
    dispatch({
      type: PRODUCTS_ACTION.DELETE_ADDRESS,
      payloadId: addressId,
    });
  };

  const deleteAllAddressDispatch = async () => {
    await timedMainPageLoader();
    toastHandler(ToastType.Success, 'Deleted All Address Successfully');
    dispatch({
      type: PRODUCTS_ACTION.DELETE_ALL_ADDRESS,
    });
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
        clearWishlistDispatch,
        clearCartDispatch,
        moveToCartDispatch,
        moveToWishlistDispatch,
        removeFromCartDispatch,
        addOrRemoveQuantityInCart,
        addAddressDispatch,
        editAddressDispatch,
        deleteAddressDispatch,
        deleteAllAddressDispatch,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
