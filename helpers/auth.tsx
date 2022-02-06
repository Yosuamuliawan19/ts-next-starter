import { useState, useEffect, createContext } from 'react';
import { fetchService } from '@helpers';
import useLocalStorage from '@hooks/useLocalStorage';

export const USER_STATES = {
  AUTHENTICATED: 'AUTHENTICATED',
  UNVERIFIED: 'UNVERIFIED',
  UNAUTHENTICATED: 'UNAUTHENTICATED',
};

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [userState, setUserState] = useState('UNAUTHENTICATED');
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', {});
  const [refreshToken, setRefreshToken] = useLocalStorage('refreshToken', {});

  useEffect(() => {
    if (accessToken && refreshToken) {
      setUserState(USER_STATES.AUTHENTICATED);
      fetchUserDetails();
    }
  }, []);

  const updateUser = (user) => {
    setUserDetails(user);
  };

  const unsetTokens = () => {
    localStorage.clear();
  };

  const fetchUserDetails = async () => {
    try {
      let res = await fetchService(`users/getUserId`, 'GET', {
        requiresAuth: true,
        token: accessToken.token,
      });
      res = await fetchService(`users/${res.data.id}`, 'GET', {
        requiresAuth: true,
        token: accessToken.token,
      });
      if (res.ok) {
        updateUser(res.data);
      }
    } catch (error) {
      return { ok: false, error: error.message };
    }
  };

  const loginUser = async ({ email, password }) => {
    const payload = {
      email: email,
      password: password,
    };
    try {
      const res = await fetchService('auth/login', 'POST', {
        requiresAuth: false,
        payload: payload,
      });
      if (res.ok) {
        console.log('setting user token');
        setAccessToken(res.data.Tokens.access);
        setRefreshToken(res.data.Tokens.refresh);
        updateUser(res.data.user);
        return { ok: res.ok, data: res.data };
      }
    } catch (error) {
      return { ok: false, message: error.message };
    }
  };

  const registerUser = async ({
    name,
    email,
    username,
    password,
    company,
    college,
    linkedin,
    month,
    year,
  }) => {
    const payload = {
      name,
      email,
      username,
      password,
      company,
      college,
      year,
      month,
    };
    try {
      const res = await fetchService('auth/register', 'POST', {
        requiresAuth: false,
        payload,
      });
      if (res.ok) {
        setAccessToken(res.data.tokens.access);
        setRefreshToken(res.data.tokens.refresh);
        updateUser(res.data.user);
        return { ok: res.ok, data: res.data };
      }
    } catch (error) {
      return { ok: false, error: error.message };
    }
  };

  const logoutUser = async () => {
    try {
      unsetTokens();
      setUserState(USER_STATES.UNAUTHENTICATED);
      await fetchService('auth/logout', 'POST', {
        requiresAuth: true,
        payload: { refreshToken: refreshToken.token },
      });
    } catch (error) {
      return { ok: false, error: error.message };
    }
  };

  const refreshTokens = async () => {
    try {
      const res = await fetchService('auth/refresh-tokens', 'POST', {
        requiresAuth: false,
        payload: { refreshToken: refreshToken.token },
      });
      if (res.ok) {
        setAccessToken(res.data.tokens.access);
        setRefreshToken(res.data.tokens.refresh);
      }
    } catch (error) {
      return { ok: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userState,
        loginUser,
        registerUser,
        logoutUser,
        userDetails,
        accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
