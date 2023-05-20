import { toast } from 'react-toastify';

export const calculateDiscountPercent = (discountPrice, originalPrice) => {
  const percent = ((originalPrice - discountPrice) * 100) / originalPrice;
  return Number.isInteger(percent) ? percent : percent.toFixed(2);
};

export const giveUniqueLabelFOR = (type, i) => `${type}-${i}`;

export const toastHandler = (type, message) => {
  const toastStyle = {
    position: 'top-left',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
  };

  const toastFunc = toast[type];

  // toast function call
  toastFunc(message, toastStyle);
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
