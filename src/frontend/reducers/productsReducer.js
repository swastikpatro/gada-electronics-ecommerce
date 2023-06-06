import { PRODUCTS_ACTION } from '../utils/actions';

export const initialProductsState = {
  isDataLoading: true,
  products: [],
  categories: [],
  isDataError: false,
  wishlist: [],
  cart: [],
  cartDetails: {
    totalAmount: 0,
    totalCount: 0,
  },
  addressList: [
    {
      addressId: 'abc',
      username: 'Swastik Patro',
      mobile: 9203874811,
      alternate: 9370818549,
      city: 'kalyan',
      state: 'Maharashtra',
      pincode: 421306,
      addressInfo: '9133 Kessler Grove Apt. 325',
    },
  ],
  // orderDetails: [],
};

export const productsReducer = (state, action) => {
  switch (action.type) {
    case PRODUCTS_ACTION.GET_ALL_PRODUCTS_BEGIN: {
      return {
        ...state,
        isDataLoading: true,
        isDataError: false,
      };
    }

    case PRODUCTS_ACTION.GET_ALL_PRODUCTS_FULFILLED: {
      return {
        ...state,
        isDataLoading: false,
        products: [...action.payload.products],
        categories: [...action.payload.categories],
        isDataError: false,
      };
    }

    case PRODUCTS_ACTION.GET_ALL_PRODUCTS_REJECTED: {
      return {
        ...state,
        isDataLoading: false,
        isDataError: true,
      };
    }

    case PRODUCTS_ACTION.SHOW_LOADER: {
      return {
        ...state,
        isDataLoading: true,
      };
    }

    case PRODUCTS_ACTION.HIDE_LOADER: {
      return {
        ...state,
        isDataLoading: false,
      };
    }

    case PRODUCTS_ACTION.UPDATE_CART: {
      const cart = [...action.payload.cart];

      const cartDetails = cart.reduce(
        ({ totalAmount, totalCount }, { qty, price }) => {
          return {
            totalCount: totalCount + qty,
            totalAmount: totalAmount + qty * price,
          };
        },
        {
          totalAmount: 0,
          totalCount: 0,
        }
      );

      return {
        ...state,
        cart: cart,
        cartDetails: cartDetails,
      };
    }

    case PRODUCTS_ACTION.UPDATE_WISHLIST: {
      return {
        ...state,
        wishlist: [...action.payload.wishlist],
      };
    }

    case PRODUCTS_ACTION.ADD_ADDRESS: {
      return {
        ...state,
        addressList: [...state.addressList, action.payload.address],
      };
    }

    case PRODUCTS_ACTION.DELETE_ADDRESS: {
      const filteredAddressList = state.addressList.filter(
        ({ addressId }) => addressId !== action.payloadId
      );
      return {
        ...state,
        addressList: filteredAddressList,
      };
    }

    case PRODUCTS_ACTION.EDIT_ADDRESS: {
      const { address: payloadAddress } = action.payload;

      const updatedAddressList = state.addressList.map((singleAddress) => {
        if (singleAddress.addressId === payloadAddress.addressId) {
          return { ...payloadAddress };
        } else {
          return singleAddress;
        }
      });

      return {
        ...state,
        addressList: updatedAddressList,
      };
    }

    case PRODUCTS_ACTION.DELETE_ALL_ADDRESS: {
      return {
        ...state,
        addressList: [],
      };
    }

    // case PRODUCTS_ACTION.ADD_ORDER: {
    //   return {
    //     ...state,
    //     orderDetails: state.orderDetails.concat(action.payload.order),
    //   };
    // }

    default:
      throw new Error(`${action.type} does not exist`);
  }
};
