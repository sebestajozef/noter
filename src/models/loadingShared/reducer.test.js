import {expect} from '../../testlib/unittests-env'
import reducer from './reducer'

import {
  noteDetailRequest,
  noteDetailSuccess,
  noteDetailError,
  notesListError,
} from './../notes/actions'

const state = {}

let newState
let newState2

describe('loading shared reducer', () => {
  it('changes boolean value of loading state to false through success action', () => {
    newState = reducer(state, noteDetailRequest())
    expect(newState.NOTE_DETAIL).to.be.true
    const data = {id: 1, title: 'Jogging in park'}
    newState2 = reducer(newState, noteDetailSuccess(data))
    expect(newState2.NOTE_DETAIL).to.be.false
  })
  it('changes boolean value of loading state to false through error action', () => {
    newState = reducer(state, noteDetailRequest())
    expect(newState.NOTE_DETAIL).to.be.true
    const error = new Error('error')
    newState2 = reducer(newState, noteDetailError(error))
    expect(newState2.NOTE_DETAIL).to.be.false
  })
  it('does not change boolean value of loading state through another request action', () => {
    newState = reducer(state, noteDetailRequest())
    expect(newState.NOTE_DETAIL).to.be.true
    newState2 = reducer(newState, noteDetailRequest())
    expect(newState.NOTE_DETAIL).to.be.true
  })
  it('does not change boolean value of loading state to false through other action', () => {
    newState = reducer(state, noteDetailRequest())
    expect(newState.NOTE_DETAIL).to.be.true
    newState2 = reducer(newState, notesListError())
    expect(newState2.NOTE_DETAIL).to.be.true
  })
})
