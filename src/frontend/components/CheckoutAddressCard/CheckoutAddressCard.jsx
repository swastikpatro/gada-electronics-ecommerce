import styles from './CheckoutAddressCard.module.css';

const CheckoutAddressCard = ({
  singleAddress,
  activeAddressId,
  handleSelect,
}) => {
  const { addressId, username, city, state, pincode, addressInfo, mobile } =
    singleAddress;

  const isActiveAddress = addressId === activeAddressId;
  return (
    <article
      className={
        isActiveAddress
          ? `${styles.addressCard} ${styles.selected}`
          : styles.addressCard
      }
    >
      <label htmlFor={addressId}>
        <h4 className='bold'>{username}</h4>
        <p>
          {addressInfo}, {city}, {state}, Pincode - {pincode}
        </p>
        <p>
          {' '}
          <span className='bold'>Mobile: </span>
          {mobile}
        </p>
      </label>

      <input
        className={styles.radio}
        type='radio'
        name='address'
        id={addressId}
        checked={isActiveAddress}
        onChange={() => handleSelect(addressId)}
      />
    </article>
  );
};

export default CheckoutAddressCard;
