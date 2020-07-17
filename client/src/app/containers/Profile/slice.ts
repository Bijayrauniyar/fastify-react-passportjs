import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the Profile container
export const initialState: ContainerState = {
  user: {},
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
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // apiAuthAccess
    apiAuthAccessRequest(state) {
      state.loading = true;
      state.error = null;
    },
    apiAuthAcessSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.user = action.payload;
    },
    apiAuthAccessFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { actions, reducer, name: sliceKey } = profileSlice;
