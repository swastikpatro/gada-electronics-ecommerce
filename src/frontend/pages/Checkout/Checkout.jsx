import { useEffect, useState } from 'react';
import { useAllProductsContext } from '../../contexts/ProductsContextProvider';
import { useNavigate } from 'react-router';
import { AddAddressBtn, CheckoutDetails, Title } from '../../components';
import CheckoutAddressCard from '../../components/CheckoutAddressCard/CheckoutAddressCard';
import styles from './Checkout.module.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart: cartFromContext, addressList: addressListFromContext } =
    useAllProductsContext();

  const [activeAddressId, setActiveAddressId] = useState('');
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);

  const isCartEmpty = cartFromContext.length < 1;

  useEffect(() => {
    if (isCartEmpty) {
      navigate('/products');
    }
  }, [isCartEmpty]);

  const handleSelect = (addressIdClicked) => {
    setActiveAddressId(addressIdClicked);
  };

  const updateCheckoutStatus = ({ showSuccessMsg }) => {
    setIsCheckoutSuccess(showSuccessMsg);
  };

  if (isCheckoutSuccess)
    return (
      <main className='half-page container center-div'>
        <p className='success-text'>Your order has successfully placed 🎉</p>
      </main>
    );

  return (
    <main className={`full-page container`}>
      <Title>Checkout</Title>
      <div className={styles.checkoutPage}>
        <section>
          <h3>Choose a delivery address</h3>

          <AddAddressBtn />

          {addressListFromContext.length >= 1 ? (
            addressListFromContext.map((singleAddress) => (
              <CheckoutAddressCard
                singleAddress={singleAddress}
                activeAddressId={activeAddressId}
                handleSelect={handleSelect}
                key={singleAddress.addressId}
              />
            ))
          ) : (
            <p>No address to display</p>
          )}
        </section>

        <CheckoutDetails
          activeAddressId={activeAddressId}
          updateCheckoutStatus={updateCheckoutStatus}
        />
      </div>
    </main>
  );
};

export default Checkout;
