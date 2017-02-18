import { put, call } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import {path} from 'ramda'
import {Actions as NavigationActions} from 'react-native-router-flux'

// attempts to login
export function * login (api, { username, password }) {

  const response = yield call(api.postLogin, { username, password });
  console.log(path(['data', 'username'], response));

  if (!response.ok)
    {
    // dispatch failure
    yield put(LoginActions.loginFailure('WRONG'))
  } else {
    // dispatch successful logins
    yield put(LoginActions.loginSuccess(response.data.username));
    NavigationActions.homeScreen({type: 'reset'});
  }
}
