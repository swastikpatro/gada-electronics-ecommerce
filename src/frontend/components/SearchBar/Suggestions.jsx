/* eslint-disable react/prop-types */
import Price from '../Price';
import SuggestionContainer from './SuggestionContainer';

const Suggestions = ({
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
