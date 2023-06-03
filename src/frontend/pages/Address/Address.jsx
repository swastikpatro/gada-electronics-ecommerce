import React, { useState } from 'react';
import styles from './Address.module.css';
import { AddAddressBtn, AddressCard, AddressForm } from '../../components';
import { useAllProductsContext } from '../../contexts/ProductsContextProvider';

const Address = () => {
  const { addressList: addressListFromContext, deleteAllAddressDispatch } =
    useAllProductsContext();

  // lifted the state up, so only one form can open at a time.
  // when all forms are inactive, activeFormId is -1, (no form wlll be visible)
  // if user is opening a form by clicking 'AddAddressbutton', activeFormId is 0;
  // for every single address, the activeFormId will be there respective addressId
  const [activeFormId, setActiveFormId] = useState(-1);

  const isAddressListEmpty = addressListFromContext.length > 0;

  const closeAllForm = () => {
    setActiveFormId(-1);
  };

  const openAddingForm = () => {
    setActiveFormId(0);
  };

  const updateActiveFormId = (idOfAddressClickedToEdit) => {
    setActiveFormId(idOfAddressClickedToEdit);
  };

  return (
    <section>
      {activeFormId === 0 ? (
        <AddressForm closeForm={closeAllForm} isAdding />
      ) : (
        <AddAddressBtn openForm={openAddingForm} />
      )}

      {/* this addressList is coming from context */}
      <div className={styles.listContainer}>
        {isAddressListEmpty ? (
          <>
            {addressListFromContext.map((singleAddress) =>
              singleAddress.addressId === activeFormId ? (
                <AddressForm
                  isEditingAndData={singleAddress}
                  closeForm={closeAllForm}
                  key={singleAddress.addressId}
                />
              ) : (
                <AddressCard
                  key={singleAddress.addressId}
                  singleAddress={singleAddress}
                  updateActiveFormId={updateActiveFormId}
                />
              )
            )}

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
