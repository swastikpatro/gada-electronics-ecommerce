import { FaStar } from 'react-icons/fa';
import { dataMain } from '../../assets/data';
import { giveUniqueLabelFOR } from '../../utils/utils';
import styles from './Filters.module.css';
import Price from '../Price';
import { useState } from 'react';

const Filters = () => {
  // console.log({ dataMain });

  const categoriesList = [
    ...new Set(dataMain.map((product) => product.category)),
  ];
  const companiesList = [
    ...new Set(dataMain.map((product) => product.company)),
  ];

  const [rangeValue, setRangeValue] = useState(10000);

  const handleClear = () => {
    console.log('Clear Filters From Context');
  };

  const handleRange = (e) => {
    setRangeValue(e.target.value);
  };

  const ratingsAvailable = [4, 3, 2, 1, 0];
  const sortingAvailable = ['low to high', 'high to low'];
  return (
    <form
      className={styles.filtersContainer}
      onSubmit={(e) => e.preventDefault()}
    >
      <header>
        <p>Filters</p>
        <button className='btn btn-danger' onClick={handleClear}>
          Clear Filters
        </button>
      </header>

      <input
        name='search'
        type='search'
        placeholder='Search...'
        className='search'
        autoComplete='off'
      />

      <fieldset>
        <legend>Category</legend>
        {categoriesList.map((category, index) => (
          <div key={index}>
            <input
              type='checkbox'
              name='categories'
              id={giveUniqueLabelFOR(category, index)}
              // checked={}
            />{' '}
            <label htmlFor={giveUniqueLabelFOR(category, index)}>
              {category}
            </label>
          </div>
        ))}
      </fieldset>

      <fieldset>
        <legend>Company</legend>
        <select name='companies' onChange={() => console.log('Select changed')}>
          <option value='all'>All</option>
          {companiesList.map((company, index) => (
            <option key={giveUniqueLabelFOR(company, index)} value={company}>
              {company}
            </option>
          ))}
        </select>
      </fieldset>

      <fieldset>
        <legend>Price</legend>
        <div>
          <Price amount={rangeValue} />
        </div>
        <input
          type='range'
          min='0'
          max={'10000'}
          value={rangeValue}
          onChange={handleRange}
        />
      </fieldset>

      <fieldset className={styles.ratingFieldset}>
        <legend>Rating</legend>

        {ratingsAvailable.map((singleRating, index) => (
          <div key={singleRating}>
            <input
              type='radio'
              name='rating'
              onChange={() => console.log('Rating Changed')}
              id={giveUniqueLabelFOR(`${singleRating} stars`, index)}
            />{' '}
            <label htmlFor={giveUniqueLabelFOR(`${singleRating} stars`, index)}>
              {singleRating} <FaStar /> & above
            </label>
          </div>
        ))}
      </fieldset>

      <fieldset>
        <legend>Sort By Price</legend>
        {sortingAvailable.map((singleSortValue, index) => (
          <div key={singleSortValue}>
            <input
              type='radio'
              name='sorting'
              onChange={() => console.log('Sort Changed')}
              id={giveUniqueLabelFOR(singleSortValue, index)}
              // value={}
            />{' '}
            <label htmlFor={giveUniqueLabelFOR(singleSortValue, index)}>
              {singleSortValue}
            </label>
          </div>
        ))}
      </fieldset>
    </form>
  );
};

export default Filters;
