import { FaStar } from 'react-icons/fa';
import { giveUniqueLabelFOR, midValue, toastHandler } from '../../utils/utils';
import styles from './Filters.module.css';

import { useFiltersContext } from '../../contexts/FiltersContextProvider';
import { useAllProductsContext } from '../../contexts/ProductsContextProvider';
import { MdClose } from 'react-icons/md';
import {
  FILTER_INPUT_TYPE,
  SORT_TYPE,
  ToastType,
  RATINGS,
} from '../../constants/constants';
import { Slider } from '@mui/material';

const Filters = ({
  isFilterContainerVisible,
  handleFilterToggle,
  isMobile,
}) => {
  const {
    minPrice: minPriceFromContext,
    maxPrice: maxPriceFromContext,
    filters,
    updateFilters,
    updatePriceFilter,
    updateCategoryFilter,
    clearFilters,
  } = useFiltersContext();

  const { products: productsFromProductContext } = useAllProductsContext();

  const {
    category: categoryFromContext,
    company: companyFromContext,
    price: priceFromContext,
    rating: ratingFromContext,
    sortByOption: sortByOptionFromContext,
  } = filters;

  const categoriesList = [
    ...new Set(productsFromProductContext.map((product) => product.category)),
  ];
  const companiesList = [
    ...new Set(productsFromProductContext.map((product) => product.company)),
  ];

  const handleClearFilter = () => {
    clearFilters();
    toastHandler(ToastType.Success, 'Cleared Filters Successfully');
  };

  return (
    <form
      className={`${styles.filtersContainer} ${
        isFilterContainerVisible && isMobile && styles.showFiltersContainer
      }`}
      onSubmit={(e) => e.preventDefault()}
    >
      {isMobile && (
        <div>
          <MdClose onClick={handleFilterToggle} />
        </div>
      )}

      <header>
        <p>Filters</p>
        <button className='btn btn-danger' onClick={handleClearFilter}>
          Clear Filters
        </button>
      </header>

      <fieldset>
        <legend>Price Range</legend>

        <Slider
          name={FILTER_INPUT_TYPE.PRICE}
          getAriaLabel={() => 'Minimum distance'}
          valueLabelDisplay='auto'
          min={minPriceFromContext}
          max={maxPriceFromContext}
          value={priceFromContext}
          onChange={updatePriceFilter}
          step={1000}
          disableSwap
          style={{
            color: 'var(--primary-500)',
            width: '80%',
            margin: 'auto -1rem auto 1rem',
          }}
        />

        <div className={styles.flexSpaceBtwn}>
          <span>{minPriceFromContext}</span>
          <span>{midValue(minPriceFromContext, maxPriceFromContext)}</span>
          <span>{maxPriceFromContext}</span>
        </div>
      </fieldset>

      <fieldset>
        <legend>Category</legend>

        {categoriesList.map((singleCategory, index) => (
          <div key={index}>
            <input
              type='checkbox'
              name={FILTER_INPUT_TYPE.CATEGORY}
              id={giveUniqueLabelFOR(singleCategory, index)}
              checked={categoryFromContext[singleCategory] || false}
              onChange={() => updateCategoryFilter(singleCategory)}
            />{' '}
            <label htmlFor={giveUniqueLabelFOR(singleCategory, index)}>
              {singleCategory}
            </label>
          </div>
        ))}
      </fieldset>

      <fieldset>
        <legend>Company</legend>

        <select
          name={FILTER_INPUT_TYPE.COMPANY}
          onChange={updateFilters}
          value={companyFromContext}
        >
          <option value='all'>All</option>
          {companiesList.map((company, index) => (
            <option key={giveUniqueLabelFOR(company, index)} value={company}>
              {company}
            </option>
          ))}
        </select>
      </fieldset>

      <fieldset className={styles.ratingFieldset}>
        <legend>Rating</legend>

        {RATINGS.map((singleRating, index) => (
          <div key={singleRating}>
            <input
              type='radio'
              name={FILTER_INPUT_TYPE.RATING}
              data-rating={singleRating}
              onChange={updateFilters}
              id={giveUniqueLabelFOR(`${singleRating} stars`, index)}
              checked={singleRating === ratingFromContext}
            />{' '}
            <label htmlFor={giveUniqueLabelFOR(`${singleRating} stars`, index)}>
              {singleRating} <FaStar /> & above
            </label>
          </div>
        ))}
      </fieldset>

      <fieldset>
        <legend>Sort By</legend>

        {Object.values(SORT_TYPE).map((singleSortValue, index) => (
          <div key={singleSortValue}>
            <input
              type='radio'
              name={FILTER_INPUT_TYPE.SORT}
              data-sort={singleSortValue}
              onChange={updateFilters}
              id={giveUniqueLabelFOR(singleSortValue, index)}
              checked={singleSortValue === sortByOptionFromContext}
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
