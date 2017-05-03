import test from 'ava'
import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/ItemDeleteRedux'

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.itemDeleteRequest('data'))

  t.true(state.fetching)
})

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.itemDeleteSuccess('hi'))

  t.is(state.payload, 'hi')
})

test('failure', t => {
  const state = reducer(INITIAL_STATE, Actions.itemDeleteFailure(99))

  t.false(state.fetching)
  t.true(state.error)
})
