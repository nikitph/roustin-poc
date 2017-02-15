// @flow

import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    temperature: require('./TemperatureRedux').reducer,
    login: require('./LoginRedux').reducer,
    search: require('./SearchRedux').reducer,
    itemget: require('./ItemGetRedux').reducer,
    itempost: require('./ItemPostRedux').reducer,
    itempatch: require('./ItemPatchRedux').reducer,
    message: require('./MessageGetRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}
