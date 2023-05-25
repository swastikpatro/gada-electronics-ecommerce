import { Outlet, useLocation } from 'react-router-dom';
import { Footer, Navbar } from '../components';
import { useAllProductsContext } from '../contexts/ProductsContextProvider';
import { Backdrop, CircularProgress } from '@mui/material';
import { useEffect } from 'react';

const SharedLayout = () => {
  const { isMainPageLoading } = useAllProductsContext();

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Backdrop
        sx={{
          color: `var(--primary-300)`,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={isMainPageLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>

      <Navbar />

      <Outlet />

      <Footer />
    </>
  );
};

export default SharedLayout;
