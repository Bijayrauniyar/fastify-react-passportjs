/**
 *
 * Layout
 *
 */

import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { actions as authActions } from '../Auth/slice';
import { selectLayout } from './selectors';
import { layoutSaga } from './saga';
import { Navbar } from 'app/components/Navbar';
//import { User } from '../Profile/types';

interface Props {
  children: React.ReactNode;
  profile: any;
}

export const Layout = memo((props: Props) => {
  const logout = () => {
    window.open('http://localhost:3000/logout', '_self');
    //dispatch(authActions.logoutRequest());
  };

  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: layoutSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const layout = useSelector(selectLayout);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  return (
    <>
      <Navbar profile={props.profile} logout={logout}></Navbar>
      {props.children}
    </>
  );
});
