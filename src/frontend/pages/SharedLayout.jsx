import { Outlet, useLocation } from 'react-router-dom';
import { Footer, Loader, Navbar } from '../components';
import { useAllProductsContext } from '../contexts/ProductsContextProvider';
import { useEffect } from 'react';
import { useFiltersContext } from '../contexts/FiltersContextProvider';

const SharedLayout = () => {
  const { isMainPageLoading } = useAllProductsContext();
  const { paginateIndex } = useFiltersContext();

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location, paginateIndex]);

  return (
    <>
      <Loader isLoading={isMainPageLoading} />

      <Navbar />

      <Outlet />

      <Footer />
    </>
  );
};

export default SharedLayout;
