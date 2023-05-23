import { Outlet } from 'react-router-dom';
import { Footer, Navbar } from '../components';
import { useAllProductsContext } from '../contexts/ProductsContextProvider';
import { Backdrop, CircularProgress } from '@mui/material';

const SharedLayout = () => {
  const { isMainPageLoading } = useAllProductsContext();

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
