import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.project || initialState;

export const selectProject = createSelector(
  [selectDomain],
  projectState => projectState,
);
