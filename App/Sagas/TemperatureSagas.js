import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import TemperatureActions from '../Redux/TemperatureRedux'
import convertFromKelvin from '../Transforms/ConvertFromKelvin'

export function * getTemperature (api, action) {
  const { city } = action
  console.log(city)
  // make the call to the api
  const response = yield call(api.postTownship, city)

  setTimeout(function(){console.log('d')}, 500);
  if (response.ok) {
    const kelvin = path(['data', 'main', 'temp_max'], response)
    const temperature = convertFromKelvin(kelvin)
    yield put(TemperatureActions.temperatureSuccess(temperature, 'bonus'))
  } else {
    yield put(TemperatureActions.temperatureFailure())
  }
}
