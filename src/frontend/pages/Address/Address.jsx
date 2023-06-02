import React, { useState } from 'react';
import styles from './Address.module.css';
import { AddAddressBtn, AddressCard, AddressForm } from '../../components';
import { useAllProductsContext } from '../../contexts/ProductsContextProvider';

const Address = () => {
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const { addressList: addressListFromContext, deleteAllAddressDispatch } =
    useAllProductsContext();

  const isAddressListEmpty = addressListFromContext.length > 0;

  const toggleAddingAddress = () => {
    setIsAddingAddress(!isAddingAddress);
  };

  return (
    <section>
      {isAddingAddress ? (
        <AddressForm closeForm={toggleAddingAddress} isAdding />
      ) : (
        <AddAddressBtn openForm={toggleAddingAddress} />
      )}

      {/* this addressList is coming from context */}
      <div className={styles.listContainer}>
        {isAddressListEmpty ? (
          <>
            {addressListFromContext.map((singleAddress) => (
              <AddressCard
                key={singleAddress.addressId}
                singleAddress={singleAddress}
              />
            ))}

            <button
              onClick={deleteAllAddressDispatch}
              className='btn btn-danger btn-center'
            >
              Clear All Address
            </button>
          </>
        ) : (
          <p>No address to display</p>
        )}
      </div>
    </section>
  );
};

export default Address;
