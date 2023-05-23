import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import { ToastType, customToastId } from '../constants/constants';

export const calculateDiscountPercent = (discountPrice, originalPrice) => {
  const percent = Math.floor(
    ((originalPrice - discountPrice) * 100) / originalPrice
  );
  return percent;
};

export const giveUniqueLabelFOR = (type, i) => `${type}-${i}`;

export const toastHandler = (type, message, toastId = v4()) => {
  const toastStyle = {
    position: 'top-left',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
    toastId,
  };

  const toastFunc = toast[type];

  // toast function call
  toastFunc(message, toastStyle);
};

export const LOGIN_TOAST = () => {
  toastHandler(ToastType.Warn, 'Please login to continue', customToastId);
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
