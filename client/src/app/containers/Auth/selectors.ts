import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.auth || initialState;

export const selectAuth = createSelector(
  [selectDomain],
  authState => authState,
);

export const selectToken = createSelector(
  [selectDomain],
  authState => authState.token,
);
