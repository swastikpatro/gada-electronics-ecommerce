import { formatPrice } from '../utils/utils';

/* eslint-disable react/prop-types */
const Price = ({ amount }) => {
  return <span>{formatPrice(amount)} ₹</span>;
};

export default Price;
