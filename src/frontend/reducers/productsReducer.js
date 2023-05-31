import { CHARGE_AND_DISCOUNT } from '../constants/constants';
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
    totalDiscountedAmount: 0,
  },
  addressList: [
    {
      addressId: 'abc',
      username: 'Swastik Patro',
      mobile: 9082931945,
      alternate: 9082931945,
      city: 'kalyan',
      state: 'Maharashtra',
      pincode: 421306,
      addressInfo: 'Ganesh kripa chawl',
      isSelected: false,
    },
    {
      addressId: 'xyz',
      username: 'Sanskruti Patro',
      mobile: 9867241485,
      alternate: 1234,
      city: 'kalyan',
      state: 'Maharashtra',
      pincode: 421306,
      addressInfo: 'Ganesh kripa chawl',
      isSelected: false,
    },
    {
      addressId: 'lmn',
      username: 'Tali Patro',
      mobile: 8693086455,
      alternate: '',
      city: 'kalyan',
      state: 'Maharashtra',
      pincode: 421306,
      addressInfo: 'Ganesh kripa chawl',
      isSelected: false,
    },
  ],
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

    case PRODUCTS_ACTION.GET_WISHLIST_CART_FULFILLED: {
      return {
        ...state,
        wishlist: [...action.payload.wishlist],
        cart: [...action.payload.cart],
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

      const sumOfDiscountAndCharges =
        CHARGE_AND_DISCOUNT.deliveryCharge + CHARGE_AND_DISCOUNT.discount;

      const totalDiscountedAmount =
        cartDetails.totalAmount >= sumOfDiscountAndCharges
          ? cartDetails.totalAmount + sumOfDiscountAndCharges
          : 0;

      return {
        ...state,
        cart: cart,
        cartDetails: { ...cartDetails, totalDiscountedAmount },
      };
    }

    case PRODUCTS_ACTION.UPDATE_WISHLIST: {
      return {
        ...state,
        wishlist: [...action.payload.wishlist],
      };
    }

    case PRODUCTS_ACTION.ADD_ADDRESS: {
      const listwithNewAddress = {
        ...action.payload.address,
        isSelected: false,
      };
      return {
        ...state,
        addressList: [...state.addressList, listwithNewAddress],
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

    default:
      throw new Error(`${action.type} does not exist`);
  }
};
