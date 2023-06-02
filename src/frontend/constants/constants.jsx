import { AiFillGithub, AiFillLinkedin, AiOutlineTwitter } from 'react-icons/ai';
import { v4 as uuid } from 'uuid';

export const footerLinks = [
  {
    id: 1,
    icon: <AiOutlineTwitter />,
    url: 'https://twitter.com/Swastik2001',
  },
  {
    id: 2,
    icon: <AiFillLinkedin />,
    url: 'https://www.linkedin.com/in/swastik-patro-2a54bb19b/',
  },
  {
    id: 3,
    icon: <AiFillGithub />,
    url: 'https://www.linkedin.com/in/swastik-patro-2a54bb19b/',
  },
];

export const ToastType = {
  Warn: 'warn',
  Info: 'info',
  Success: 'success',
  Error: 'error',
};

export const SortType = {
  PRICE_LOW_TO_HIGH: 'price: low to high',
  PRICE_HIGH_TO_LOW: 'price: high to low',
  NAME_A_TO_Z: 'name: a to z',
  NAME_Z_TO_A: 'name: z to a',
};

export const ratingsAvailable = [4, 3, 2, 1, 0];

export const testUser = {
  email: 'jethalal.gada@gmail.com',
  password: 'babitaji1234',
};

export const localStorageKeys = {
  User: 'user',
  Token: 'token',
};

export const userTypeForLogin = {
  GuestClick: 'guest',
  RegisterClick: 'registered',
};

export const cartActionType = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
};

export const FILTER_INPUT_TYPE = {
  PRICE: 'price',
  COMPANY: 'company',
  SORT: 'sortByOption',
  RATING: 'rating',
  CATEGORY: 'category',
};

export const delayToShowLoader = 500;

export const delayDebouncedMs = 250;

export const totalSkeletonsLength = 10;

export const delayBetnSuggestionLinkClickAndSearchBlur = 150;

export const customToastId = 1;

export const itemsPerPage = 9;

export const ALL_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli',
  'Daman and Diu',
  'Lakshadweep',
  'Delhi',
  'Puducherry',
];

export const COUPONS = [
  {
    id: uuid(),
    couponCode: 'DAYA01',
    text: '30% Off',
    discountPercent: 30,
    minCartPriceRequired: 150000,
  },
  {
    id: uuid(),
    couponCode: 'BABITA02',
    text: '20% Off',
    discountPercent: 20,
    minCartPriceRequired: 100000,
  },
  {
    id: uuid(),
    couponCode: 'TAPU03',
    text: '10% Off',
    discountPercent: 10,
    minCartPriceRequired: 50000,
  },
  {
    id: uuid(),
    couponCode: 'BAPUJI04',
    text: '5% Off',
    discountPercent: 5,
    minCartPriceRequired: 20000,
  },
];

export const CHARGE_AND_DISCOUNT = {
  deliveryCharge: 100,
  discount: -200,
};
