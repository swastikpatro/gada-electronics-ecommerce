import { useAllProductsContext } from '../../contexts/ProductsContextProvider';
import AddressForm from '../AddressForm/AddressForm';
import { useState } from 'react';
import styles from './AddressCard.module.css';

const AddressCard = ({ singleAddress }) => {
  const {
    addressId,
    username,
    mobile,
    alternate,
    addressInfo,
    pincode,
    city,
    state,
  } = singleAddress;

  const { deleteAddressDispatch, timedMainPageLoader } =
    useAllProductsContext();

  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const handleDelete = async () => {
    await timedMainPageLoader();
    deleteAddressDispatch(addressId);
  };

  const toggleEditingForm = () => {
    setIsEditingAddress(!isEditingAddress);
  };

  if (isEditingAddress) {
    console.log('here');
    return (
      <AddressForm
        isEditingAndData={singleAddress}
        closeForm={toggleEditingForm}
      />
    );
  }

  return (
    <article className={styles.addressCard}>
      <h3>{username}</h3>
      <div className={styles.row}>
        <span>{mobile}</span>
        {!!alternate && <span>{alternate}</span>}
      </div>

      <p>{addressInfo}</p>
      <p>{pincode}</p>

      <div className={styles.row}>
        <span>{city}</span>
        <span>{state}</span>
      </div>

      <div className='btn-container'>
        <button className='btn btn-success' onClick={toggleEditingForm}>
          Edit
        </button>
        <button onClick={handleDelete} className='btn btn-danger'>
          delete
        </button>
      </div>
    </article>
  );
};

export default AddressCard;
