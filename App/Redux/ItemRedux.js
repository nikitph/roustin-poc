import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  itemRequest: ['data'],
  itemSuccess: ['payload'],
  itemFailure: null
})

export const ItemTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, {data}) =>
  state.merge({fetching: true, data, payload: null})

// successful api lookup
export const success = (state, action) => {
  const {payload} = action
  return state.merge({fetching: false, error: null, payload})
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({fetching: false, error: true, payload: null})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ITEM_REQUEST]: request,
  [Types.ITEM_SUCCESS]: success,
  [Types.ITEM_FAILURE]: failure
})
