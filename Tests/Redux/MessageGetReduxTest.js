import test from 'ava'
import Actions, {reducer, INITIAL_STATE} from '../../App/Redux/MessageGetRedux'

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.messageGetRequest('data'))

  t.true(state.fetching)
})

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.messageGetSuccess('hi'))

  t.is(state.payload, 'hi')
})

test('failure', t => {
  const state = reducer(INITIAL_STATE, Actions.messageGetFailure(99))

  t.false(state.fetching)
  t.true(state.error)
})
