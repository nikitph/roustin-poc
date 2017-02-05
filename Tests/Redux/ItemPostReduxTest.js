import test from 'ava'
import Actions, {reducer, INITIAL_STATE} from '../../App/Redux/ItemPostRedux'

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.itemPostRequest('data'))

  t.true(state.fetching)
})

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.itemPostSuccess('hi'))

  t.is(state.payload, 'hi')
})

test('failure', t => {
  const state = reducer(INITIAL_STATE, Actions.itemPostFailure(99))

  t.false(state.fetching)
  t.true(state.error)
})
