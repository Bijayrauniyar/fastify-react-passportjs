import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';
import * as Msal from 'msal';

// The initial state of the Auth container
export const initialState: ContainerState = {
  loading: false,
  error: null,
  isAuthenticated: false,
  token: null,
  authResponse: null,
  // user: {
  //   admin: false,
  //   _id: '',
  //   businessPhones: '',
  //   displayName: '',
  //   givenName: '',
  //   jobTitle: '',
  //   mail: '',
  //   mobilePhone: null,
  //   officeLocation: '',
  //   preferredLanguage: null,
  //   surname: '',
  //   userPrincipalName: '',
  //   providerId: '',
  //   authProvider: '',
  //   manager: '',
  //   __v: 0,
  // },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<Msal.AuthResponse>) {
      state.loading = false;
      state.authResponse = action.payload;
      state.isAuthenticated = true;
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    // logout
    logoutRequest(state) {
      state.loading = true;
      state.error = null;
    },
    logoutSuccess(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.authResponse = null;
    },
    logoutFailed(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload;
    },

    // login succsess
    enusureLoginRequest(state) {
      state.loading = true;
      state.error = null;
    },

    enusureLoginSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.authResponse = action.payload;
      //  state.token = action.payload.accessToken;
      state.isAuthenticated = true;
    },

    enusureLoginFailed(state, action: PayloadAction<string>) {
      state.isAuthenticated = false;
      state.error = action.payload;
    },
  },
});

export const { actions, reducer, name: sliceKey } = authSlice;
