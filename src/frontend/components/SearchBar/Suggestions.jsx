/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import Price from '../Price';
import SuggestionContainer from './SuggestionContainer';

const Suggestions = ({ filteredList, isLoading, updateTextToEmpty }) => {
  if (isLoading)
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
        <Link
          onClick={updateTextToEmpty}
          key={item.id}
          to={`/products/${item.id}`}
        >
          <p>🔍 {item.name}</p>
          <Price amount={item.price} />
        </Link>
      ))}
    </SuggestionContainer>
  );
};

export default Suggestions;
