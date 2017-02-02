/* ***********************************************************
 * Wiring Instructions
 * To make this test work, you'll need to:
 *  - Add a Fixture named getMessagePost to the
 *    ./App/Services/FixtureApi file. You can just keep adding
 *    functions to that file.
 *************************************************************/

import test from 'ava'
import FixtureAPI from '../../App/Services/FixtureApi'
import {call, put} from 'redux-saga/effects'
import {getMessagePost} from '../../App/Sagas/MessagePostSagas'
import MessagePostActions from '../../App/Redux/MessagePostRedux'

const stepper = (fn) => (mock) => fn.next(mock).value

test('first calls API', t => {
  const step = stepper(getMessagePost(FixtureAPI, {data: 'taco'}))
  // first yield is the API
  t.deepEqual(step(), call(FixtureAPI.getMessagePost, 'taco'))
})

test('success path', t => {
  const response = FixtureAPI.getMessagePost('taco')
  const step = stepper(getMessagePost(FixtureAPI, {data: 'taco'}))
  // Step 1: hit the api
  step()
  // Second step successful return and data!
  t.deepEqual(step(response), put(MessagePostActions.messagepostSuccess(21)))
})

test('failure path', t => {
  const response = {ok: false}
  const step = stepper(getMessagePost(FixtureAPI, {data: 'taco'}))
  // Step 1: hit the api
  step()
  // Second step failed response
  t.deepEqual(step(response), put(MessagePostActions.messagepostFailure()))
})
