import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import {
  ALL_STATES,
  ToastType,
  CUSTOM_TOASTID,
  ITEMS_PER_PAGE,
} from '../constants/constants';
import confetti from 'canvas-confetti';
import { faker } from '@faker-js/faker';

export const calculateDiscountPercent = (discountPrice, originalPrice) => {
  const percent = Math.floor(
    ((originalPrice - discountPrice) * 100) / originalPrice
  );
  return percent;
};

export const giveUniqueLabelFOR = (type, i) => `${type}-${i}`;

export const toastHandler = (type, message, toastId = uuid()) => {
  const toastStyle = {
    position: 'bottom-left',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    toastId,
  };

  const toastFunc = toast[type];

  // toast function call
  toastFunc(message, toastStyle);
};

export const LOGIN_TOAST = () => {
  toastHandler(ToastType.Warn, 'Please login to continue', CUSTOM_TOASTID);
};

export const setIntoLocalStorage = (name, dataObj) => {
  localStorage.setItem(name, JSON.stringify(dataObj));
};

export const getFromLocalStorage = (name) => {
  return JSON.parse(localStorage.getItem(name)) ?? null;
};

export const removeLocalStorage = (name) => {
  localStorage.removeItem(name);
};

export const wait = (delay) => new Promise((res) => setTimeout(res, delay));

export const lowerizeAndCheckIncludes = (text, userText) => {
  return text.toLowerCase().includes(userText.toLowerCase());
};

export const convertArrayToObjectWithPropertyFALSE = (listOfStrings = []) => {
  return listOfStrings.reduce((acc, curr) => {
    acc[curr] = false;
    return acc;
  }, {});
};

export const isPresent = (itemId, list) =>
  !!list.find((singleItem) => singleItem._id === itemId);

export const givePaginatedList = (list) => {
  return Array.from(
    { length: Math.ceil(list.length / ITEMS_PER_PAGE) },
    (_, i) => list.slice(ITEMS_PER_PAGE * i, ITEMS_PER_PAGE * (i + 1))
  );
};

export const formatPrice = (price) =>
  price.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
  });

export const Popper = () => {
  const end = Date.now() + 1 * 1000;
  // go Buckeyes!
  const colors = ['#392f5a', '#9583cf'];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 40,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 2,
      angle: 140,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};

export const giveRandomData = () => {
  return {
    username: faker.person.fullName(),
    pincode: faker.location.zipCode('######'),
    mobile: faker.phone.number('##########'),
    alternate: faker.phone.number('##########'),
    addressInfo: faker.location.streetAddress(true),
    city: faker.location.city(),
    state: ALL_STATES[Math.floor(Math.random() * ALL_STATES.length)],
  };
};

export const midValue = (value1, value2) => {
  return Math.floor((value1 + value2) / 2);
};

export const validateEmptyTextInput = ({ inputsObj, optionalInput }) => {
  for (const property in inputsObj) {
    if (typeof inputsObj[property] !== 'string' || property === optionalInput) {
      continue;
    }

    if (!inputsObj[property].trim()) {
      return true;
    }
  }

  return false;
};
