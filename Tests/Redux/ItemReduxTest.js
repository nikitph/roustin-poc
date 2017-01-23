import test from 'ava'
import Actions, {reducer, INITIAL_STATE} from '../../App/Redux/ItemRedux'

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.itemRequest('data'))

  t.true(state.fetching)
})

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.itemSuccess('hi'))

  t.is(state.payload, 'hi')
})

test('failure', t => {
  const state = reducer(INITIAL_STATE, Actions.itemFailure(99))

  t.false(state.fetching)
  t.true(state.error)
})
