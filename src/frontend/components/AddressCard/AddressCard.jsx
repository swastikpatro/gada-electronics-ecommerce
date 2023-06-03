import { useAllProductsContext } from '../../contexts/ProductsContextProvider';
import styles from './AddressCard.module.css';

const AddressCard = ({
  singleAddress,
  updateActiveFormId: updateActiveFormIdProp,
}) => {
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

  const handleDelete = async () => {
    await timedMainPageLoader();
    deleteAddressDispatch(addressId);
  };

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
        <button
          className='btn btn-success'
          onClick={() => updateActiveFormIdProp(addressId)}
        >
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
