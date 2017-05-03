/* ***********************************************************
 * Wiring Instructions
 * To make this test work, you'll need to:
 *  - Add a Fixture named getItemDelete to the
 *    ./App/Services/FixtureApi file. You can just keep adding
 *    functions to that file.
 *************************************************************/

import test from 'ava'
import FixtureAPI from '../../App/Services/FixtureApi'
import { call, put } from 'redux-saga/effects'
import { getItemDelete } from '../../App/Sagas/ItemDeleteSagas'
import ItemDeleteActions from '../../App/Redux/ItemDeleteRedux'

const stepper = (fn) => (mock) => fn.next(mock).value

test('first calls API', t => {
  const step = stepper(getItemDelete(FixtureAPI, {data: 'taco'}))
  // first yield is the API
  t.deepEqual(step(), call(FixtureAPI.getItemDelete, 'taco'))
})

test('success path', t => {
  const response = FixtureAPI.getItemDelete('taco')
  const step = stepper(getItemDelete(FixtureAPI, {data: 'taco'}))
  // Step 1: hit the api
  step()
  // Second step successful return and data!
  t.deepEqual(step(response), put(ItemDeleteActions.itemdeleteSuccess(21)))
})

test('failure path', t => {
  const response = {ok: false}
  const step = stepper(getItemDelete(FixtureAPI, {data: 'taco'}))
  // Step 1: hit the api
  step()
  // Second step failed response
  t.deepEqual(step(response), put(ItemDeleteActions.itemdeleteFailure()))
})
