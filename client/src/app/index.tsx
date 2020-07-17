/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 *  * / (after logged in home)
 * /login
 * /logout
 * /profile
 *
 * /setting
 *
 *
 * admin permission
 * /reports
 * /clients
 * /projects
 * /users
 * /users/:id/timesheets
 *
 * users permission
 *
 * /timesheets
 * /reports
 *
 *
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { useInjectSaga, useInjectReducer } from 'utils/redux-injectors';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { reducer, sliceKey } from './containers/Auth/slice';
import { authSaga } from './containers/Auth/saga';
import { Login } from './containers/Auth/components/login/login';
import { WithAuth } from './containers/Auth';
import { actions } from '../app/containers/Auth/slice';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
//import '../styles/global-styles';
import '../styles/App.scss';
import routes from '../routes';

export function App() {
  useInjectReducer({
    key: sliceKey,
    reducer: reducer,
  });
  useInjectSaga({
    key: sliceKey,
    saga: authSaga,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('useEffect..........');
    dispatch(actions.enusureLoginRequest());
  }, []);

  const getRoutes = route =>
    route.map(prop => {
      return (
        <Route
          exact
          path={process.env.REACT_APP_BASE_PATH + prop.path}
          component={WithAuth(prop.component, prop.roles)}
          key={uuidv4()}
        />
      );
    });

  return (
    <>
      <BrowserRouter>
        <Helmet
          titleTemplate="%s - React Boilerplate"
          defaultTitle="React Boilerplate"
        >
          <meta name="description" content="A React Boilerplate application" />
        </Helmet>

        <Switch>
          <Route
            exact
            path={process.env.REACT_APP_BASE_PATH + '/login'}
            component={Login}
          />

          {routes && getRoutes(routes)}
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
