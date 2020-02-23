/* global describe, it*/
import {call, put, takeLatest} from 'redux-saga/effects'
import {NOTES_LIST_REQUEST} from './constants'
import {notesListSuccess, notesListError} from './actions'
import {watchNotesListRequest, doNotesListRequest} from './sagas'
import {expect} from '../../testlib/unittests-env'
import {urls} from '../../lib/api'
import axios from 'axios/index'
import {apiUrl} from '../../lib/api'

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

describe('notes model sagas - doNotesListRequest worker', () => {
  it('fetches notes data with response status 200', () => {
    const generator = doNotesListRequest()
    const nextResult = generator.next({}).value
    expect(nextResult).to.deep.equal(call([axios, 'get'], apiUrl))
    const result = generator.next({status: 200, data: data})
    expect(result.value).to.deep.equal(put(notesListSuccess(data)))
    expect(generator.next().done).to.be.true
  })

  it('fetches notes data with response status other than 200', () => {
    const generator = doNotesListRequest()

    const nextResult = generator.next({}).value
    expect(nextResult).to.deep.equal(call([axios, 'get'], apiUrl))
    const result = generator.next({status: 201, data: data})
    expect(result.done).to.be.true
  })

  it('fetches notes data with error response', () => {
    const generator = doNotesListRequest()
    const error = new Error('error')

    generator.next()
    const putValue = generator.throw(error).value
    expect(putValue).to.deep.equal(put(notesListError(error)))
  })

  it('watchNotesListRequest spawns doNotesListRequest worker', () => {
    const generator = watchNotesListRequest()
    const generatorResult = generator.next().value
    expect(generatorResult).to.deep.equal(
      takeLatest(NOTES_LIST_REQUEST, doNotesListRequest)
    )
  })
})
