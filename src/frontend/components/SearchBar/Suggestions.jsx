/* eslint-disable react/prop-types */
import Price from '../Price';
import SuggestionContainer from './SuggestionContainer';
import styles from './SearchBar.module.css';

const Suggestions = ({
  trimmedSearchText,
  filteredList,
  isSuggestionsLoading,
  updateTextOnLinkClick,
}) => {
  if (isSuggestionsLoading)
    return (
      <SuggestionContainer>
        <div className='horizontal-center'>
          <span className='loading'></span>
        </div>
      </SuggestionContainer>
    );

  if (!trimmedSearchText) {
    return (
      <SuggestionContainer>
        <div className='horizontal-center'>
          <p className={`bold ${styles.textPlease}`}>
            Enter the name of the product.
          </p>
        </div>
      </SuggestionContainer>
    );
  }

  if (filteredList.length < 1) {
    return (
      <SuggestionContainer>
        <div className='horizontal-center'>
          <p className='error-text'>No products found ☹️</p>
        </div>
      </SuggestionContainer>
    );
  }

  return (
    <SuggestionContainer>
      {filteredList.map((item) => (
        <button
          type='button'
          // navigates after onClick
          onClick={() => updateTextOnLinkClick(item)}
          key={item._id}
        >
          <p>🔍 {item.name}</p>
          <Price amount={item.price} />
        </button>
      ))}
    </SuggestionContainer>
  );
};

export default Suggestions;
