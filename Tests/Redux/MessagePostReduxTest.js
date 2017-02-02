import test from 'ava'
import Actions, {reducer, INITIAL_STATE} from '../../App/Redux/MessagePostRedux'

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.messagePostRequest('data'))

  t.true(state.fetching)
})

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.messagePostSuccess('hi'))

  t.is(state.payload, 'hi')
})

test('failure', t => {
  const state = reducer(INITIAL_STATE, Actions.messagePostFailure(99))

  t.false(state.fetching)
  t.true(state.error)
})
