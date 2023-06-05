import { AiFillGithub, AiFillLinkedin, AiOutlineTwitter } from 'react-icons/ai';
import { v4 as uuid } from 'uuid';

export const FOOTER_LINKS = [
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
    url: 'https://github.com/swastikpatro',
  },
];

export const ToastType = {
  Warn: 'warn',
  Info: 'info',
  Success: 'success',
  Error: 'error',
};

export const SORT_TYPE = {
  PRICE_LOW_TO_HIGH: 'price: low to high',
  PRICE_HIGH_TO_LOW: 'price: high to low',
  NAME_A_TO_Z: 'name: a to z',
  NAME_Z_TO_A: 'name: z to a',
};

export const RATINGS = [4, 3, 2, 1];

export const TEST_USER = {
  email: 'jethalal.gada@gmail.com',
  password: 'babitaji1234',
};

export const LOCAL_STORAGE_KEYS = {
  User: 'user',
  Token: 'token',
};

export const LOGIN_CLICK_TYPE = {
  GuestClick: 'guest',
  RegisterClick: 'register',
};

export const INCREMENT_DECRMENT_TYPE = {
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

export const DELAY_TO_SHOW_LOADER = 500;

export const DELAY_DEBOUNCED_MS = 250;

export const TOTAL_SKELETONS_LENGTH = 10;

export const DELAY_BETWEEN_BLUR_AND_CLICK = 250;

export const CUSTOM_TOASTID = 1;

export const ITEMS_PER_PAGE = 9;

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
  'Jammu and Kashmir',
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
  'Uttarakhand',
  'Uttar Pradesh',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli',
  'Daman and Diu',
  'Delhi',
  'Lakshadweep',
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

export const MIN_DISTANCE_BETWEEN_THUMBS = 1000;
