import {takeLatest, takeEvery} from 'redux-saga'
import API from '../Services/Api'
import loginAPI from '../Services/loginApi'
import FixtureAPI from '../Services/FixtureApi'
import DebugSettings from '../Config/DebugSettings'

/* ------------- Types ------------- */

import {StartupTypes} from '../Redux/StartupRedux'
import {TemperatureTypes} from '../Redux/TemperatureRedux'
import {LoginTypes} from '../Redux/LoginRedux'
import {OpenScreenTypes} from '../Redux/OpenScreenRedux'
import {ItemTypes} from '../Redux/ItemRedux'
import {MessageGetTypes} from '../Redux/MessageGetRedux'
import {MessagePostTypes} from '../Redux/MessagePostRedux'


/* ------------- Sagas ------------- */

import {startup} from './StartupSagas'
import {login} from './LoginSagas'
import {getTemperature} from './TemperatureSagas'
import {openScreen} from './OpenScreenSagas'
import {getItems, postItem} from './ItemSagas'
import {getMessageGet} from './MessageGetSagas'
import {getMessagePost} from './MessagePostSagas'


/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugSettings.useFixtures ? FixtureAPI : API.create();
const loginapi = loginAPI.create();

/* ------------- Connect Types To Sagas ------------- */

export default function * root() {
  yield [
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, loginapi),
    takeLatest(OpenScreenTypes.OPEN_SCREEN, openScreen),

    // some sagas receive extra parameters in addition to an action
    takeLatest(TemperatureTypes.TEMPERATURE_REQUEST, getTemperature, api),
    takeLatest(ItemTypes.ITEM_REQUEST, getItems, api),
    //takeLatest(ItemTypes.ITEM_REQUEST, postItem, api),
    takeLatest(MessageGetTypes.MESSAGE_GET_REQUEST, getMessageGet, api),
    takeLatest(MessagePostTypes.MESSAGE_POST_REQUEST, getMessagePost, api),

  ]
}
