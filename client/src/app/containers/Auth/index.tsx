/**
 *
 * Auth
 *
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './slice';
import { selectAuth } from './selectors';
import { Redirect } from 'react-router-dom';
import { Layout } from '../Layout';

//import { Role } from 'utils/role';
//import { selectProfile } from '../Profile/selectors';
//import { msalInstance } from './saga';

interface Props {}

export const WithAuth = (Component: React.FC, requiredRoles?: string[]) =>
  function WithAuthorization(props: Props) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dispatch = useDispatch();

    // const useEffectOnMount = async (effect: React.EffectCallback) => {
    //   useEffect(effect, []);
    // };
    // useEffectOnMount(() => {
    //   console.log('auth useEffect');
    //   dispatch(actions.enusureLoginRequest());
    // });

    const auth: any = useSelector(selectAuth);

    //  const profile = useSelector(selectProfile);
    // return (
    //   <Layout profile={profile}>
    //     <Component {...props} />
    //   </Layout>
    // );

    console.log(auth, 'auth form auth controller');
    return auth?.isAuthenticated ? (
      // && requiredRoles?.includes(profile?.admin ? Role.ADMIN : Role.USER)
      <Layout profile={auth.authResponse.user}>
        <Component {...props} />
      </Layout>
    ) : (
      <Redirect to="/app/login" />
    );
  };
