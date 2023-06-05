import React, { useEffect, useState } from 'react';
import {
  COUPONS,
  ToastType,
  DELAY_BETWEEN_BLUR_AND_CLICK,
} from '../../constants/constants';

import styles from './CheckoutDetails.module.css';

import { useAllProductsContext } from '../../contexts/ProductsContextProvider';
import { AiFillTag } from 'react-icons/ai';
import Price from '../Price';
import { formatPrice, toastHandler, wait } from '../../utils/utils';
import { useIsMobile } from '../../hooks';

const CouponSearch = ({ activeCoupon, updateActiveCoupon }) => {
  const [isCouponsSuggestionVisible, setIsCouponsSuggestionVisible] =
    useState(false);
  const [couponSearchInput, setCouponSearchInput] = useState('');
  const {
    cartDetails: { totalAmount: totalAmountFromContext },
  } = useAllProductsContext();

  const isMobile = useIsMobile();

  const handleSearchFocus = () => {
    setIsCouponsSuggestionVisible(true);
  };

  const handleSearchBlur = async () => {
    await wait(DELAY_BETWEEN_BLUR_AND_CLICK);
    setIsCouponsSuggestionVisible(false);
  };

  const handleCouponClick = (couponClicked) => {
    //  for mobile, there is no tooltip and buttons not disabled for the following condition
    if (
      isMobile &&
      totalAmountFromContext < couponClicked.minCartPriceRequired
    ) {
      toastHandler(
        ToastType.Info,
        `Shop above ₹${formatPrice(
          couponClicked.minCartPriceRequired
        )} to avail`
      );
      return;
    }

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
          {COUPONS.map((singleCoupon) => {
            const isButtonDisabled =
              totalAmountFromContext < singleCoupon.minCartPriceRequired;

            return (
              <button
                type='button'
                key={singleCoupon.id}
                onClick={() => handleCouponClick(singleCoupon)}
                className={isButtonDisabled ? styles.btnDisableMobile : ''}
                disabled={!isMobile && isButtonDisabled}
              >
                {singleCoupon.text}

                <div>{singleCoupon.couponCode}</div>

                {!isMobile && (
                  <span className={styles.tooltip}>
                    Shop above{' '}
                    <Price amount={singleCoupon.minCartPriceRequired} /> to
                    avail
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </form>
  );
};

export default CouponSearch;
