/**
 *
 * Auth
 *
 */
import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../slice';
import { selectAuth } from '../../selectors';
import './login.scss';
import { Redirect } from 'react-router-dom';
interface Props {}

export const Login = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  const fbLogin = () => {
    window.open('http://localhost:3000/auth/facebook', '_self');
  };

  const googleLogin = () => {
    window.open('http://localhost:3000/auth/google', '_self');
  };

  // dispatch(actions.loginRequest());
  // check if user already logged in
  // const useEffectOnMount = (effect: React.EffectCallback) => {
  //   useEffect(effect, []);
  // };
  // useEffectOnMount(() => {
  //   dispatch(actions.enusureLoginRequest());
  // });

  const auth = useSelector(selectAuth);
  console.log(auth, 'auth form login');

  if (auth.isAuthenticated) {
    return <Redirect to="/app" />;
  }

  return (
    <>
      <Helmet>
        <title>Auth</title>
        <meta name="description" content="Description of Auth" />
      </Helmet>
      <div className="login-page">
        <div id="logInPanelHeading">LOGIN Panel</div>
        <div className="card">
          <div className="">
            <button onClick={fbLogin}>Login With Facebook</button>
          </div>
          <br />
          <div className="">
            <button onClick={googleLogin}>Login With Google</button>
          </div>
        </div>
      </div>
    </>
  );
});
