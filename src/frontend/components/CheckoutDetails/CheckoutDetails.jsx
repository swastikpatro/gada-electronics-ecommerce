import { useAllProductsContext } from '../../contexts/ProductsContextProvider';
import Price from '../Price';
import styles from './CheckoutDetails.module.css';
import { useState } from 'react';
import { VscChromeClose } from 'react-icons/vsc';

import { CHARGE_AND_DISCOUNT, ToastType } from '../../constants/constants';
import CouponSearch from './CouponSearch';
import { toastHandler } from '../../utils/utils';

const CheckoutDetails = ({ activeAddressId: activeAddressIdFromProps }) => {
  const {
    cartDetails: {
      totalAmount: totalAmountFromContext,
      totalCount: totalCountFromContext,
      totalDiscountedAmount,
    },
    addressList: addressListFromContext,
  } = useAllProductsContext();

  const [activeCoupon, setActiveCoupon] = useState(null);

  const discountedPriceUsingCoupon = activeCoupon
    ? -Math.floor((totalAmountFromContext * activeCoupon.discountPercent) / 100)
    : 0;

  const finalPriceToPay = totalDiscountedAmount + discountedPriceUsingCoupon;

  const updateActiveCoupon = (couponObjClicked) => {
    setActiveCoupon(couponObjClicked);
    toastHandler(ToastType.Success, 'Coupon Applied Successfully');
  };

  const cancelCoupon = () => {
    setActiveCoupon(null);
    toastHandler(ToastType.Warn, 'Coupon Removed');
  };

  const handlePlaceOrder = () => {
    const addressToDeliver = addressListFromContext.find(
      ({ addressId }) => addressId === activeAddressIdFromProps
    );

    if (!addressToDeliver) {
      toastHandler(ToastType.Error, 'Please select address');
      return;
    }

    // setActiveCoupon(null);
    console.log({ finalPriceToPay, addressToDeliver });
  };

  return (
    <article className={styles.checkout}>
      <h3 className='text-center'>Price Details</h3>

      <CouponSearch
        activeCoupon={activeCoupon}
        updateActiveCoupon={updateActiveCoupon}
      />

      <hr />

      <div className={styles.row}>
        <span>
          Price ({totalCountFromContext} item{totalCountFromContext > 1 && 's'})
        </span>
        <Price amount={totalAmountFromContext} />
      </div>

      <div className={styles.row}>
        <span>Discount</span>
        <Price amount={CHARGE_AND_DISCOUNT.discount} />
      </div>

      {activeCoupon && (
        <div className={styles.row}>
          <div className={styles.couponApplied}>
            <VscChromeClose
              type='button'
              className={styles.closeBtn}
              onClick={cancelCoupon}
            />{' '}
            <p className={styles.couponText}>
              Coupon {activeCoupon.couponCode} applied
            </p>
          </div>
          <Price amount={discountedPriceUsingCoupon} />
        </div>
      )}

      <div className={styles.row}>
        <span>Delivery Charges</span>
        <Price amount={CHARGE_AND_DISCOUNT.deliveryCharge} />
      </div>

      <hr />

      <div className={`${styles.row} ${styles.totalPrice}`}>
        <span>Total Price</span>
        <Price amount={finalPriceToPay} />
      </div>

      <button onClick={handlePlaceOrder} className='btn btn-width-100'>
        Place Order
      </button>
    </article>
  );
};

export default CheckoutDetails;
