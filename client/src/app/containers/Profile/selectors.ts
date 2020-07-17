import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.profile || initialState;

export const selectProfile = createSelector(
  [selectDomain],
  profileState => profileState.user,
);
