import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.report || initialState;

export const selectReport = createSelector(
  [selectDomain],
  reportState => reportState,
);
