import { selectToken } from './selectors';
import { put, takeLatest, call, select } from 'redux-saga/effects';
import { actions } from './slice';
import { actions as profileActions } from '../Profile/slice';
import * as Msal from 'msal';
import { request } from 'utils/request';
const cacheLocation: 'localStorage' = 'localStorage';
const msalConfig = {
  auth: {
    clientId: 'c37907bd-62f6-4ead-be19-16e246bd91ba',
    authority:
      'https://login.microsoftonline.com/d98941a7-ce70-4286-9ec7-8341bfa6c276',
    redirectUri: 'http://localhost:3001/app',
    navigateToLoginRequestUrl: false,
    postLogoutRedirectUri: 'http://localhost:3001/app/login',
  },
  cache: {
    cacheLocation: cacheLocation,
    storeAuthStateInCookie: true,
  },
};
export const msalInstance = new Msal.UserAgentApplication(msalConfig);

const scopes = {
  scopes: ['user.read'],
};
export function* login() {
  try {
    const response: Msal.AuthResponse = yield msalInstance.loginPopup(scopes);

    if (response) {
      yield put(actions.loginSuccess(response));
    } else {
      yield put(actions.loginFailed('Login Failed'));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.loginFailed('NOt Found'));
    } else {
      yield put(actions.loginFailed(err));
    }
  }
}

export function* logout() {
  try {
    yield msalInstance.logout();
    yield put(actions.logoutSuccess());
  } catch (err) {
    yield put(actions.logoutFailed(err));
  }
}

export function* ensureLogin() {
  const requestURL = `http://localhost:3000/login/success`;
  try {
    //Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL);
    if (response) {
      yield put(actions.enusureLoginSuccess(response));
    }
  } catch (err) {
    yield put(actions.enusureLoginFailed(err));
  }
}

export function* apiAuthAccess() {
  const token: string = yield select(selectToken);
  const requestURL = `http://localhost:3000/login/succsess`;

  const authHeader = new Headers();
  authHeader.append('Authorization', token);
  const configInit: RequestInit = {
    headers: authHeader,
  };

  try {
    // Call our request helper (see 'utils/request')
    const user = yield call(request, requestURL, configInit);
    if (user) {
      yield put(profileActions.apiAuthAcessSuccess(user.user));
    }
  } catch (err) {
    yield put(profileActions.apiAuthAccessFailed(err));
  }
}

export function* authSaga() {
  yield takeLatest(actions.loginRequest.type, login);
  yield takeLatest(actions.logoutRequest.type, logout);
  yield takeLatest(actions.enusureLoginRequest.type, ensureLogin);
  yield takeLatest(profileActions.apiAuthAccessRequest.type, apiAuthAccess);
}
