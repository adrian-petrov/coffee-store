import React from 'react';
import { createCtx } from '../helpers/createAuthContextHelper';

type Props = {
  children: React.ReactNode;
};

// get cached auth state from local storage
const cachedAuthStatus = !!window.localStorage.getItem('isAuthenticated');
const cachedAuthUser = window.localStorage.getItem('authUser');
// set initial state to cached auth state
const [ctx, AuthContextProvider] = createCtx({
  isAuthenticated: cachedAuthStatus,
  authUser: cachedAuthUser,
});

export const AuthContext = ctx;

export function AuthProvider({ children }: Props) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
