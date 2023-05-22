import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { lowerizeAndCheckIncludes, wait } from '../utils/utils';
import {
  delayBetnSuggestionLinkClickAndSearchBlur,
  delayDebouncedMs,
  delayToShowLoader,
} from '../constants/constants';

const useSearchSuggestions = (
  productsFromContext,
  applySearchFilterFnFromContext,
  timedMainPageLoader
) => {
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

    // try writing letters and backspacing after commenting line 66
    // on backspacing suggestions will not visible, so added setIsSuggestionsVisible(true) !
    // while user is writing,
    setSearchText(userText);

    //  after backspacing when the text is empty, hide suggestions!!

    // coercion - userText -  (!!'') (i.e. false),
    // userText - (!!'dell') (i.e. true)
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

    //  for productlisting page with no text handled, so for other pages submitting with no text in search,
    // results in doing nothing!!
    if (!searchText) {
      return;
    }

    // if user submits the form or clicks ENTER with text, then 'hide suggestions' and update search in FIlter context with the 'searchText here' i.e. (filters: {search: searchText}), then navigate to '/products' then show mainPageLoading for 1 second.
    navigate('/products');
    applySearchFilterFnFromContext(searchText);
    timedMainPageLoader();
  };

  // 4 (Link click)
  const updateTextOnLinkClick = async (item) => {
    // User clicks on any of the suggestion, then 'hide suggestions' and update the input with the 'name of the item' in that LINK

    setSearchText(item.name);
    timedMainPageLoader();
    await wait(delayToShowLoader);
    setSearchText('');
    navigate(`/products/${item._id}`);
    setIsSuggestionsVisible(false);
  };

  // 5 Clicks anywhere outside (excluding on input), (handleBlur is called when clicked anywhere in the page, also on clicking submit 🔍 btn, also on any clicking suggestion link )
  const handleBlur = () => {
    // as on clicking the link, blur was firing first and and stopping the click of suggestionLink i.e. (updateTextOnLinkClick fn), so added delay.

    // delay added, so LINK can redirect before blurring and suggestion getting closed.

    // click anywhere outside the search input, after 150ms, suggestions will not be visible!!

    // try removing, the setTimeout to understand, but for updateTextOnLinkClick to work, keep setTimeout of delay >= 150ms!!
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
