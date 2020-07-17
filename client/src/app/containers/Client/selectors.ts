import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.client || initialState;

export const selectClient = createSelector(
  [selectDomain],
  clientState => clientState,
);
