import { Outlet } from 'react-router-dom';
import { Footer, Navbar } from '../components';
import { useAllProductsContext } from '../contexts/ProductsContextProvider';
import { Backdrop, CircularProgress } from '@mui/material';

const SharedLayout = () => {
  const { isMainPageLoading } = useAllProductsContext();

  // const navigate = useNavigate();

  // this didnot work, so commented out,

  // if (isDataError) {
  //   // console.log({ isDataError });
  //   navigate('*');
  //   return;
  // }

  // Link: used to resolve (https://stackoverflow.com/questions/72160276/warning-cannot-update-a-component-browserrouter-while-rendering-a-different)

  // DOUBT
  // useEffect(() => {
  //   if (isDataError) {
  //     navigate('*');
  //     return;
  //   }
  //   // eslint-disable-next-line
  // }, [isDataError]);

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
