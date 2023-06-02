import { createContext, useContext, useEffect, useState } from 'react';
import { getFromLocalStorage, setIntoLocalStorage } from '../utils/utils';
import { localStorageKeys } from '../constants/constants';

const AuthContext = createContext(null);

export const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(getFromLocalStorage(localStorageKeys.User));
  const [token, setToken] = useState(
    getFromLocalStorage(localStorageKeys.Token)
  );

  const updateUserAuth = ({ user, token }) => {
    setUser(user);
    setToken(token);
  };

  useEffect(() => {
    if (user) {
      setUser((prev) => ({ ...prev, cart: [], wishlist: [] }));

      setIntoLocalStorage(localStorageKeys.User, {
        ...user,
        cart: [],
        wishlist: [],
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, updateUserAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
