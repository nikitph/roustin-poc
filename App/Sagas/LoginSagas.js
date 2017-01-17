import { put, call } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'

// attempts to login
export function * login (api, { username, password }) {

  const response = yield call(api.postLogin, { username, password });

  if (!response.ok)
    {
    // dispatch failure
    yield put(LoginActions.loginFailure('WRONG'))
  } else {
    // dispatch successful logins
    yield put(LoginActions.loginSuccess(response))
  }
}
