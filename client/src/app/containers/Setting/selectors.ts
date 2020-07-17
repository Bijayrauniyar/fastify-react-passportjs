import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.setting || initialState;

export const selectSetting = createSelector(
  [selectDomain],
  settingState => settingState,
);
