import { FaStar } from 'react-icons/fa';
import { giveUniqueLabelFOR, toastHandler } from '../../utils/utils';
import styles from './Filters.module.css';
import Price from '../Price';
import { useFiltersContext } from '../../contexts/FiltersContextProvider';
import { useAllProductsContext } from '../../contexts/ProductsContextProvider';
import {
  SortType,
  ToastType,
  ratingsAvailable,
} from '../../constants/constants';

const Filters = () => {
  const {
    minPrice: minPriceFromContext,
    maxPrice: maxPriceFromContext,
    filters,
    updateFilters,
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
      className={styles.filtersContainer}
      onSubmit={(e) => e.preventDefault()}
    >
      <header>
        <p>Filters</p>
        <button className='btn btn-danger' onClick={handleClearFilter}>
          Clear Filters
        </button>
      </header>

      <fieldset>
        <legend>Category</legend>

        {categoriesList.map((singleCategory, index) => (
          <div key={index}>
            <input
              type='checkbox'
              name='category'
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
          name='company'
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

      <fieldset>
        <legend>Price</legend>

        <div>
          <Price amount={priceFromContext} />
        </div>

        <input
          name='price'
          type='range'
          min={minPriceFromContext}
          max={maxPriceFromContext}
          value={priceFromContext}
          onChange={updateFilters}
        />
      </fieldset>

      <fieldset className={styles.ratingFieldset}>
        <legend>Rating</legend>

        {ratingsAvailable.map((singleRating, index) => (
          <div key={singleRating}>
            <input
              type='radio'
              name='rating'
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

        {Object.values(SortType).map((singleSortValue, index) => (
          <div key={singleSortValue}>
            <input
              type='radio'
              name='sortByOption'
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
