import create from 'zustand';
import { showErrorMsg, showSuccessMsg } from '@helpers/feedback';
import { fetchService } from '@helpers/fetch';
import { GoogleAuthProvider } from 'firebase/auth';
import { getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { persist } from 'zustand/middleware';

export const USER_STATUS = {
  AUTHENTICATED: 'AUTHENTICATED',
  UNVERIFIED: 'UNVERIFIED',
  UNAUTHENTICATED: 'UNAUTHENTICATED',
};

const provider = new GoogleAuthProvider();

export const useAuth = create(
  persist(
    (set, get) => ({
      count: 1,
      // auth modal
      authModalVisible: false,
      openAuthModal: () => set((state) => ({ authModalVisible: true })),
      setVisibleAuthModal: (value) =>
        set((state) => ({ authModalVisible: value })),

      // user state
      user: undefined,
      userStatus: USER_STATUS.UNAUTHENTICATED,
      accessToken: '',
      refreshToken: '',

      isLogined: () => get().userStatus === USER_STATUS.AUTHENTICATED,
      signUpEmail: (email: string, password: string) =>
        set(async (state) => {
          try {
            const res = await fetchService('/v1/auth/login', 'POST', {
              payload: { email, password },
            });
            if (!res?.ok) throw new Error(res.message);
            showSuccessMsg('Succesfully signed in');
            return {
              userStatus: USER_STATUS.AUTHENTICATED,
              accessToken: res.data.Tokens.access,
              refreshToken: res.data.Tokens.refresh,
            };
          } catch (error) {
            showErrorMsg('Failed signing in: ' + error?.message);
          }
          return {};
        }),
      signInEmail: (email: string, password: string) =>
        set(async (state) => {
          try {
            const res = await fetchService('/v1/auth/login', 'POST', {
              payload: { email, password },
            });
            if (!res?.ok) throw new Error(res.message);
            showSuccessMsg('Succesfully signed in');
            return {
              userStatus: USER_STATUS.AUTHENTICATED,
              accessToken: res.data.Tokens.access,
              refreshToken: res.data.Tokens.refresh,
            };
          } catch (error) {
            showErrorMsg('Failed signing in: ' + error?.message);
          }
          return {};
        }),
      signOut: () =>
        set(async (state) => {
          if (state.userStatus === USER_STATUS.UNAUTHENTICATED) return {};
          try {
            const auth = getAuth();
            const result = await signOut(auth);
            window.location.href = '/';
            showErrorMsg(`Successfully signed out`);
          } catch (error) {
            showErrorMsg(`Failed signing out`);
          }
        }),
      signInGoogle: async () => {
        try {
          const auth = getAuth();
          const result = await signInWithPopup(auth, provider);
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
          const user = result.user;
          showSuccessMsg(`Successfully signed in!`);
          set((state) => ({
            authModalVisible: false,
            user: {
              name: user.displayName,
              email: user.email,
              image: user.photoURL,
              isEmailVerified: user.emailVerified,
            },
            userStatus: USER_STATUS.AUTHENTICATED,
            accessToken: token,
          }));
        } catch (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
          showErrorMsg(
            `Failed signing in with ${email}: ${errorCode} ${errorMessage}`
          );
        }
      },
    }),
    {
      name: 'auth-storage',
      getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
    }
  )
);
