import { ALL_STATES, ToastType } from '../../constants/constants';

import { useAllProductsContext } from '../../contexts/ProductsContextProvider';

import { useState } from 'react';

import { v4 as uuid } from 'uuid';
import FormRow from '../FormRow';

import styles from './AddressForm.module.css';
import {
  giveRandomData,
  toastHandler,
  validateEmptyTextInput,
} from '../../utils/utils';

const AddressForm = ({ isAdding, isEditingAndData = null, closeForm }) => {
  const { addAddressDispatch, timedMainPageLoader, editAddressDispatch } =
    useAllProductsContext();

  const isEditing = !!isEditingAndData;

  // alternate is optional
  const defaultState = {
    username: '',
    mobile: '',
    alternate: '',
    addressInfo: '',
    pincode: '',
    city: '',
    state: '',
  };

  const [inputs, setInputs] = useState(
    isEditing ? isEditingAndData : defaultState
  );

  const handleInputChange = (e) => {
    const targetEle = e.target;
    const targetEleName = targetEle.name;
    let elementValue = targetEle.value;

    if (targetEle.type === 'number') {
      elementValue = isNaN(targetEle.valueAsNumber)
        ? ''
        : targetEle.valueAsNumber;
    }

    setInputs({
      ...inputs,
      [targetEleName]: elementValue,
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    let isAnyInputEmpty = validateEmptyTextInput({
      inputsObj: inputs,
      optionalInput: 'alternate',
    });

    if (isAnyInputEmpty) {
      toastHandler(ToastType.Error, 'Please fill all the inputs');
      return;
    }

    await timedMainPageLoader();

    if (isAdding) {
      addAddressDispatch({ ...inputs, addressId: uuid() });
    }

    if (isEditing) {
      editAddressDispatch({ ...inputs, addressId: isEditingAndData.addressId });
    }

    closeForm();
  };

  const handleReset = () => {
    setInputs(defaultState);
  };

  const handleRandomData = () => {
    setInputs(giveRandomData());
  };

  //  stop propagation as this form will be inside modal, on clicking form, the modal should not close.
  return (
    <form
      onClick={(e) => e.stopPropagation()}
      className={styles.form}
      onSubmit={handleSubmitForm}
    >
      <FormRow
        text='Name'
        type='text'
        name='username'
        id='username'
        placeholder='name'
        value={inputs.username}
        handleChange={handleInputChange}
      />

      <FormRow
        text='Mobile No.'
        type='number'
        name='mobile'
        id='mobile'
        placeholder='mobile'
        value={inputs.mobile}
        handleChange={handleInputChange}
      />

      <FormRow
        text='Pincode'
        type='number'
        name='pincode'
        id='pincode'
        placeholder='pincode'
        value={inputs.pincode}
        handleChange={handleInputChange}
      />

      <FormRow
        text='City'
        type='text'
        name='city'
        id='city'
        placeholder='city'
        value={inputs.city}
        handleChange={handleInputChange}
      />

      <div>
        <label htmlFor='textarea'>Address</label>
        <textarea
          name='addressInfo'
          id='textarea'
          className='form-textarea'
          placeholder='address'
          value={inputs.addressInfo}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label htmlFor='alternate'>Alternate Mobile</label>
        <input
          type='number'
          name='alternate'
          id='alternate'
          placeholder='alternate'
          value={inputs.alternate}
          onChange={handleInputChange}
          className='form-input'
        />
      </div>

      <div>
        <label htmlFor='state'>State</label>
        <select
          className='form-select'
          name='state'
          id='state'
          onChange={handleInputChange}
          value={inputs.state}
          required
        >
          <option id='state' value='' disabled>
            Choose State:
          </option>

          {ALL_STATES.map((singleState, index) => (
            <option key={index} id='state' value={singleState}>
              {singleState}
            </option>
          ))}
        </select>
      </div>

      <div className={`btn-container ${styles.formBtnContainer}`}>
        <button type='submit' className='btn btn-primary'>
          {isEditing ? 'Update' : 'Add'}
        </button>

        <button onClick={handleReset} type='button' className='btn btn-hipster'>
          Reset
        </button>

        <button onClick={handleRandomData} type='button' className='btn'>
          Random Data
        </button>

        <button type='button' className='btn btn-danger' onClick={closeForm}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
