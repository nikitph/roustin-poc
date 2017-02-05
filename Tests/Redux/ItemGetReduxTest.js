import test from 'ava'
import Actions, {reducer, INITIAL_STATE} from '../../App/Redux/ItemGetRedux'

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.itemGetRequest('data'))

  t.true(state.fetching)
})

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.itemGetSuccess('hi'))

  t.is(state.payload, 'hi')
})

test('failure', t => {
  const state = reducer(INITIAL_STATE, Actions.itemGetFailure(99))

  t.false(state.fetching)
  t.true(state.error)
})
