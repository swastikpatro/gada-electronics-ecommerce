import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { lowerizeAndCheckIncludes } from '../utils/utils';
import {
  delayBetnSuggestionLinkClickAndSearchBlur,
  delayDebouncedMs,
} from '../constants/constants';

const useSearchSuggestions = ({
  productsFromContext,
  applySearchFilterFnFromContext,
  filtersStateFromContext,
  timedMainPageLoader,
}) => {
  const [searchText, setSearchText] = useState('');

  const navigate = useNavigate();

  const location = useLocation();

  const [filteredList, setFilteredList] = useState([]);

  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);

  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);

  const trimmedSearch = searchText.trim();

  const showFilteredList = () => {
    setFilteredList(
      productsFromContext.filter(({ name }) =>
        lowerizeAndCheckIncludes(name, trimmedSearch)
      )
    );
  };

  useEffect(() => {
    setIsSuggestionsLoading(true);

    const timer = setTimeout(() => {
      showFilteredList();

      setIsSuggestionsLoading(false);
    }, delayDebouncedMs);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [trimmedSearch]);

  useEffect(() => {
    if (!filtersStateFromContext.search) {
      setSearchText('');
    }
  }, [filtersStateFromContext]);

  // 1
  const handleFocus = () => {
    // if user focusses on the input when there is no text, do nothing.

    if (!searchText) return;

    // but if there is text, show suggestions
    setIsSuggestionsVisible(true);
  };

  //2
  const handleSearchChange = (e) => {
    const userText = e.target.value;
    // onclick of Escape, it clears searchText, this is handled by type='search',
    setSearchText(userText);
    // coercion
    setIsSuggestionsVisible(!!userText);
  };

  //3
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSuggestionsVisible(false);

    // if user submits the form or clicks ENTER with no text in any page do nothing, EXCEPT
    // the ProductListingPage.
    //  if user is in productListing page and submits the form or clicks ENTER with no text,then
    // apply Filter on products in productListing Page, so update the searchText
    if (location.pathname === '/products' && !searchText) {
      applySearchFilterFnFromContext('');
      timedMainPageLoader();
      return;
    }

    //  for productlisting page with no text handled, so for other pages submitting with no text in search, results in doing nothing!!
    if (!searchText) {
      return;
    }

    navigate('/products');
    applySearchFilterFnFromContext(searchText);
    timedMainPageLoader();
  };

  // 4 (Link click)
  const updateTextOnLinkClick = async (item) => {
    // User clicks on any of the suggestion, then 'hide suggestions' and update the input with the 'name of the item' in that LINK

    setSearchText(item.name);
    await timedMainPageLoader();
    setSearchText('');
    navigate(`/products/${item._id}`);
    setIsSuggestionsVisible(false);
  };

  // 5 Clicks anywhere outside (excluding on input), (handleBlur is called when clicked anywhere in the page, also on clicking submit 🔍 btn, also on any clicking suggestion link )
  const handleBlur = () => {
    // as on clicking the link, blur was firing first and and stopping the click of suggestionLink i.e. (updateTextOnLinkClick fn), so added delay 150ms.

    setTimeout(() => {
      setIsSuggestionsVisible(false);
    }, delayBetnSuggestionLinkClickAndSearchBlur);
  };

  return {
    searchText,
    filteredList,
    isSuggestionsLoading,
    isSuggestionsVisible,
    updateTextOnLinkClick,
    handleFocus,
    handleSearchChange,
    handleSubmit,
    handleBlur,
  };
};

export default useSearchSuggestions;
