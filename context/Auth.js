import { useState, useEffect, createContext } from 'react';
import { fetchService } from '@helpers';
import useLocalStorage from '@hooks/useLocalStorage';

export const USER_STATES = {
  AUTHENTICATED: 'AUTHENTICATED',
  UNVERIFIED: 'UNVERIFIED',
  UNAUTHENTICATED: 'UNAUTHENTICATED',
};
export const USER_ROLES = {
  EMPLOYER: 'employer',
  USER: 'user',
  ADMIN: 'admin',
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
    if (user.isEmailVerified) {
      setUserState(USER_STATES.AUTHENTICATED);
    } else {
      setUserState(USER_STATES.UNVERIFIED);
    }
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

      console.log('res', res);
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

  const registerUser = async (payload) => {
    try {
      const res = await fetchService('auth/register', 'POST', {
        requiresAuth: false,
        payload,
      });
      if (res.ok) {
        // setAccessToken(res.data.tokens.access);
        // setRefreshToken(res.data.tokens.refresh);
        updateUser(res.data.user);
        return { ok: res.ok, data: res.data };
      }
    } catch (error) {
      return { ok: false, error: error.message };
    }
  };

  const registerEmployer = async ({
    name,
    email,
    username,
    password,
    company,
    industry,
  }) => {
    const payload = {
      name,
      email,
      username,
      password,
      company,
      industry,
    };
    try {
      const res = await fetchService('auth/register', 'POST', {
        requiresAuth: false,
        payload,
      });
      if (res.ok) {
        updateUser(res.data);
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

  const forgotPassword = async (email) => {
    try {
      console.log(email);
      const res = await fetchService('auth/forgot-password', 'POST', {
        requiresAuth: false,
        payload: { email },
      });
      return { ok: true };
    } catch (error) {
      console.log(error);
      return { ok: false, error: error.message };
    }
  };

  const resetPassword = async (password, token) => {
    try {
      const res = await fetchService(
        `auth/reset-password?token=${token}`,
        'POST',
        {
          requiresAuth: false,
          payload: { password },
        }
      );
      return { ok: true };
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
        registerEmployer,
        logoutUser,
        forgotPassword,
        resetPassword,
        userDetails,
        accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
