import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.user || initialState;

export const selectUser = createSelector(
  [selectDomain],
  userState => userState,
);
