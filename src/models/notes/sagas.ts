import {call, put, takeLatest} from 'redux-saga/effects'

import {
  NOTE_UPDATE_REQUEST,
  NOTES_LIST_REQUEST,
  NOTE_DETAIL_REQUEST,
  NOTE_DELETE_REQUEST,
  NOTE_CREATE_REQUEST,
} from './constants'
import {
  notesListSuccess,
  noteDetailError,
  notesListRequest,
  noteDetailSuccess,
  notesListError,
  noteUpdateError,
  noteUpdateSuccess,
  noteDeleteSuccess,
  noteDeleteError,
  noteCreateSuccess,
  noteCreateError,
} from './actions'
import {apiUrl} from '../../lib/api'
import axios from 'axios/index'

export function* doNotesListRequest() {
  try {
    const response = yield call([axios, 'get'], apiUrl)
    if (response.status === 200) {
      yield put(notesListSuccess(response.data))
    }
  } catch (error) {
    yield put(notesListError())
  }
}

export function* watchNotesListRequest() {
  yield takeLatest(NOTES_LIST_REQUEST, doNotesListRequest)
}

export function* doNoteDetailRequest(action) {
  try {
    const response = yield call([axios, 'get'], `${apiUrl}/${action.id}`)
    if (response.status === 200) {
      yield put(noteDetailSuccess(response.data))
    }
  } catch (error) {
    yield put(noteDetailError())
  }
}

export function* watchNoteDetailRequest() {
  yield takeLatest(NOTE_DETAIL_REQUEST, doNoteDetailRequest)
}

export function* doNoteUpdateRequest(action) {
  try {
    const response = yield call([axios, 'put'], `${apiUrl}/${action.id}`, {
      title: action.title,
    })
    if (response.status === 201) {
      yield put(noteUpdateSuccess())
      yield put(notesListRequest())
    }
  } catch (error) {
    yield put(noteUpdateError())
  }
}

export function* watchNoteUpdateRequest() {
  yield takeLatest(NOTE_UPDATE_REQUEST, doNoteUpdateRequest)
}

export function* doNoteDeleteRequest(action) {
  try {
    const response = yield call([axios, 'delete'], `${apiUrl}/${action.id}`)
    if (response.status === 204) {
      yield put(noteDeleteSuccess())
      yield put(notesListRequest())
    }
  } catch (error) {
    yield put(noteDeleteError())
  }
}

export function* watchNoteDeleteRequest() {
  yield takeLatest(NOTE_DELETE_REQUEST, doNoteDeleteRequest)
}

export function* doNoteCreateRequest(action) {
  try {
    const response = yield call([axios, 'post'], apiUrl, {
      title: action.title,
    })
    if (response.status === 201) {
      yield put(noteCreateSuccess())
      yield put(notesListRequest())
    }
  } catch (error) {
    yield put(noteCreateError())
  }
}

export function* watchNoteCreateRequest() {
  yield takeLatest(NOTE_CREATE_REQUEST, doNoteCreateRequest)
}
