/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { combineReducers, Reducer, AnyAction } from '@reduxjs/toolkit';
import { history } from 'utils/history';
//import { reducer } from '../app/containers/Auth/slice';
import { connectRouter, RouterState } from 'connected-react-router';
import { InjectedReducersType } from 'utils/types/injector-typings';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers: InjectedReducersType = {}) {
  const rootReducer = combineReducers({
    router: connectRouter(history) as Reducer<RouterState, AnyAction>,
    //AuthState: reducer,
    ...injectedReducers,
  });
  return rootReducer;
}
