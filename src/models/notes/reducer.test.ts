/* global describe, it */
import {notesListSuccess, noteDetailSuccess, resetFlags} from './actions'
import {expect} from '../../testlib/unittests-env'
import reducer from './reducer'

const state = {
  notesData: [],
  noteData: {id: 0, title: ""},
  isUpdated: false,
  isDeleted: false,
  isCreated: false,
}

describe('notes reducer', () => {
  it('stores notes data when action notesListSuccess is invoked', () => {
    const data = [
      {
        id: 1,
        title: 'Jogging in park',
      },
      {
        id: 2,
        title: 'Pick-up posters from post-office',
      },
    ]
    const newState = reducer(state, notesListSuccess(data))
    expect(newState.notesData).to.deep.equal(data)
    expect(newState.noteData).to.deep.equal({id: 0, title: ""})
    expect(newState.isUpdated).to.deep.equal(false)
    expect(newState.isDeleted).to.deep.equal(false)
    expect(newState.isCreated).to.deep.equal(false)
  })
  it('stores note data when action notesDetailSuccess is invoked', () => {
    const data = {id: 1, title: 'Jogging in park'}
    const newState = reducer(state, noteDetailSuccess(data))
    expect(newState.notesData).to.deep.equal([])
    expect(newState.noteData).to.deep.equal(data)
    expect(newState.isUpdated).to.deep.equal(false)
    expect(newState.isDeleted).to.deep.equal(false)
    expect(newState.isCreated).to.deep.equal(false)
  })
  it('resets flags when action resetFlags is invoked', () => {
    const defaultState = {
      notesData: [],
      noteData: {id: 0, title: ""},
      isUpdated: true,
      isDeleted: true,
      isCreated: false,
    }
    const newState = reducer(defaultState, resetFlags())
    expect(newState.notesData).to.deep.equal([])
    expect(newState.noteData).to.deep.equal({id: 0, title: ""})
    expect(newState.isUpdated).to.deep.equal(false)
    expect(newState.isDeleted).to.deep.equal(false)
    expect(newState.isCreated).to.deep.equal(false)
  })
})
