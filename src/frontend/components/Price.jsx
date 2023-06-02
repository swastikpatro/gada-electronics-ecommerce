import { formatPrice } from '../utils/utils';

/* eslint-disable react/prop-types */
const Price = ({ amount }) => {
  const isAmountNegative = amount < 0;
  const amountOnUI = isAmountNegative ? -1 * amount : amount;

  return (
    <span>
      {isAmountNegative && '-'} ₹ {formatPrice(amountOnUI)}
    </span>
  );
};

export default Price;
