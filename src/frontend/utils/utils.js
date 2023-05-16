export const calculateDiscountPercent = (discountPrice, originalPrice) => {
  const percent = ((originalPrice - discountPrice) * 100) / originalPrice;
  return Number.isInteger(percent) ? percent : percent.toFixed(2);
};

export const giveUniqueLabelFOR = (type, i) => `${type}-${i}`;
