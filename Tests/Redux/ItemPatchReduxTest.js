import test from 'ava'
import Actions, {reducer, INITIAL_STATE} from '../../App/Redux/ItemPatchRedux'

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.itemPatchRequest('data'))

  t.true(state.fetching)
})

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.itemPatchSuccess('hi'))

  t.is(state.payload, 'hi')
})

test('failure', t => {
  const state = reducer(INITIAL_STATE, Actions.itemPatchFailure(99))

  t.false(state.fetching)
  t.true(state.error)
})
