import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContextProvider';
import { LOGIN_TOAST } from '../utils/utils';

const PrivateRoute = ({ children }) => {
  const { user } = useAuthContext();
  const location = useLocation();

  //  this is routeToRedirectAfterSuccessfullLogin
  let routeToRedirect = location?.pathname;

  // if the user is not logged in, on the linksContainer there is 'Login' Visible and the path is '/profile'.

  // on Clicking it, the user is directed towards the login Page & "state : '/profile' " is passed to the loginPage.
  // and after successful login. user is redirected to profile page and "logout button" is visible.

  //  this doesnot provide good UX.

  //  so if there is no user data in AuthContext (i.e. user is not logged in) and the route is '/profile', user should come to '/' (home page), so I am passing '/' as state to the Login page.

  if (!user) {
    routeToRedirect !== '/profile' ? LOGIN_TOAST() : (routeToRedirect = '/');
  }

  // onclicking any private route
  // 'Navigate' was put into outlet, which has no height, so footer was visible at the top.
  // added this full-page, which has height, so on clicking private route, footer is not visible!!

  if (!user) {
    return (
      <>
        <Navigate
          to='/login'
          state={{ from: routeToRedirect }}
          replace
        ></Navigate>
        <main className='full-page'></main>
      </>
    );
  }

  return children;
};

export default PrivateRoute;
