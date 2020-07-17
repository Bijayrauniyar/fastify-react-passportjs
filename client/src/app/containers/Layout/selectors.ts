import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.layout || initialState;

export const selectLayout = createSelector(
  [selectDomain],
  layoutState => layoutState,
);
