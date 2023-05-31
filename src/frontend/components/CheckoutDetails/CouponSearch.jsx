import React, { useEffect, useState } from 'react';
import {
  COUPONS,
  ToastType,
  delayBetnSuggestionLinkClickAndSearchBlur,
} from '../../constants/constants';

import styles from './CheckoutDetails.module.css';

import { useAllProductsContext } from '../../contexts/ProductsContextProvider';
import { AiFillTag } from 'react-icons/ai';
import Price from '../Price';
import { toastHandler } from '../../utils/utils';

const CouponSearch = ({ activeCoupon, updateActiveCoupon }) => {
  const [isCouponsSuggestionVisible, setIsCouponsSuggestionVisible] =
    useState(false);
  const [couponSearchInput, setCouponSearchInput] = useState('');
  const {
    cartDetails: { totalAmount: totalAmountFromContext },
  } = useAllProductsContext();

  const handleSearchFocus = () => {
    setIsCouponsSuggestionVisible(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setIsCouponsSuggestionVisible(false);
    }, delayBetnSuggestionLinkClickAndSearchBlur);
  };

  const handleCouponClick = (couponClicked) => {
    setCouponSearchInput(couponClicked.couponCode);

    // if activeCoupon and the couponClicked in suggestion is same do nothing
    if (activeCoupon?.couponCode === couponClicked.couponCode) {
      return;
    }

    updateActiveCoupon(couponClicked);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    setIsCouponsSuggestionVisible(false);

    if (!couponSearchInput) {
      setIsCouponsSuggestionVisible(true);
      return;
    }

    const couponFound = COUPONS.find(
      ({ couponCode }) =>
        couponCode.toUpperCase() === couponSearchInput.toUpperCase()
    );

    //  user input based coupon not found, so all coupons suggestion visible
    if (!couponFound) {
      toastHandler(
        ToastType.Error,
        `Coupon ${couponSearchInput} Not Available`
      );

      setIsCouponsSuggestionVisible(true);

      return;
    }

    const isCouponAvailable =
      couponFound.minCartPriceRequired <= totalAmountFromContext;

    if (couponFound && !isCouponAvailable) {
      toastHandler(ToastType.Error, 'buy more to use this coupon');
      return;
    }

    // if couponSearchInput and activeCouponCode is same, do nothing
    if (activeCoupon?.id === couponFound.id) {
      return;
    }

    // else update and show toast
    updateActiveCoupon(couponFound);
  };

  useEffect(() => {
    if (!activeCoupon) {
      setCouponSearchInput('');
    }
  }, [activeCoupon]);

  return (
    <form onSubmit={handleSearchSubmit} className={styles.searchCoupons}>
      <AiFillTag />
      <div>
        <input
          className='form-input'
          type='search'
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          placeholder='Enter coupon code'
          onChange={(e) => setCouponSearchInput(e.target.value)}
          value={couponSearchInput}
        />
        <button disabled={!couponSearchInput} type='submit' className='btn'>
          Apply
        </button>
      </div>

      {isCouponsSuggestionVisible && (
        <div className={styles.couponSuggestion}>
          {COUPONS.map((singleCoupon) => (
            <button
              type='button'
              key={singleCoupon.id}
              onClick={() => handleCouponClick(singleCoupon)}
              className='btn'
              disabled={
                totalAmountFromContext < singleCoupon.minCartPriceRequired
              }
            >
              {singleCoupon.text}
              <div>{singleCoupon.couponCode}</div>
              <span className={styles.tooltip}>
                Shop above <Price amount={singleCoupon.minCartPriceRequired} />{' '}
                to avail
              </span>
            </button>
          ))}
        </div>
      )}
    </form>
  );
};

export default CouponSearch;
