import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { wait } from '../utils/utils';
import {
  DELAY_BETWEEN_BLUR_AND_CLICK,
  DELAY_DEBOUNCED_MS,
  MAX_RESPONSES_IN_CACHE_TO_STORE,
} from '../constants/constants';
import { getProductsOnSearch } from '../Services/services';

const useSearchSuggestions = ({
  updateSearchFilterInContext,
  filtersStateFromContext,
  timedMainPageLoader,
}) => {
  const [searchText, setSearchText] = useState('');

  const navigate = useNavigate();

  const location = useLocation();

  const [suggestionsList, setSuggestionsList] = useState([]);
  const [cacheSuggestions, setCacheSuggestions] = useState({});

  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);

  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);

  const trimmedSearch = searchText.trim();
  const searchTextFromContextTrimmed = filtersStateFromContext.search.trim();

  const updateCache = (latestResponse) => {
    const latestSuggestion = {
      [trimmedSearch]: {
        responseTime: new Date().getTime(),
        productsCached: latestResponse,
      },
    };

    const updatedCacheData = {
      ...cacheSuggestions,
      ...latestSuggestion,
    };

    const totalCacheSuggestions = Object.keys(updatedCacheData);

    if (totalCacheSuggestions.length < MAX_RESPONSES_IN_CACHE_TO_STORE) {
      setCacheSuggestions(updatedCacheData);
      return;
    }

    const cloneOfUpdateCacheData = structuredClone(updatedCacheData);

    const oldestCacheRespectToTime = Math.min(
      ...totalCacheSuggestions.map(
        (cacheKey) => updatedCacheData[cacheKey].responseTime
      )
    );

    delete cloneOfUpdateCacheData[oldestCacheRespectToTime];

    setCacheSuggestions(cloneOfUpdateCacheData);
  };

  const fetchProductsOnSearch = async () => {
    try {
      const resProducts = await getProductsOnSearch({ query: trimmedSearch });
      setSuggestionsList(resProducts);
      setIsSuggestionsLoading(false);

      if (resProducts.length < 1) {
        return;
      }

      updateCache(resProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!trimmedSearch) {
      return;
    }

    setIsSuggestionsLoading(true);

    const timer = setTimeout(() => {
      if (cacheSuggestions[trimmedSearch]) {
        setSuggestionsList(cacheSuggestions[trimmedSearch].productsCached);
        // update time of that cache, if the query is re-searched and cache is present (searched again)
        setCacheSuggestions({
          ...cacheSuggestions,
          [trimmedSearch]: {
            ...cacheSuggestions[trimmedSearch],
            responseTime: new Date().getTime(),
          },
        });
        setIsSuggestionsLoading(false);
        return;
      }
      fetchProductsOnSearch();
    }, DELAY_DEBOUNCED_MS);

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
    setIsSuggestionsVisible(true);
  };

  //2
  const handleSearchChange = (e) => {
    const userText = e.target.value;
    const searchPresentInContextAndEmptySearchbar =
      !userText && !!searchTextFromContextTrimmed;

    setSearchText(userText);

    setIsSuggestionsVisible(true);

    // if user has written no text, and also contains some trimmed text in context, then onChange, clear search filter and show shimmer
    if (searchPresentInContextAndEmptySearchbar) {
      updateSearchFilterInContext('');
    }

    // if user has written no text, and some trimmed text in context and page is /products, show loader
    if (
      searchPresentInContextAndEmptySearchbar &&
      location.pathname === '/products'
    ) {
      timedMainPageLoader();
    }
  };

  //3
  const handleSubmit = (e) => {
    const searchEmptyInContextAndEmptySearchbar =
      !searchTextFromContextTrimmed && !trimmedSearch;
    e.preventDefault();

    setIsSuggestionsVisible(false);

    if (searchEmptyInContextAndEmptySearchbar || !trimmedSearch) {
      return;
    }

    navigate('/products');
    updateSearchFilterInContext(searchText);
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
  const handleBlur = async () => {
    // as on clicking the link, blur was firing first and and stopping the click of suggestionLink i.e. (updateTextOnLinkClick fn), so added delay 250ms.
    await wait(DELAY_BETWEEN_BLUR_AND_CLICK);
    setIsSuggestionsVisible(false);
  };

  return {
    searchText,
    trimmedSearch,
    suggestionsList,
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
