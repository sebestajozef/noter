import {all} from 'redux-saga/effects'
import {
  watchNotesListRequest,
  watchNoteDetailRequest,
  watchNoteUpdateRequest,
  watchNoteDeleteRequest,
  watchNoteCreateRequest,
} from './models/notes/sagas'

export default function* rootSaga() {
  yield all([
    watchNotesListRequest(),
    watchNoteDetailRequest(),
    watchNoteUpdateRequest(),
    watchNoteDeleteRequest(),
    watchNoteCreateRequest(),
  ])
}
