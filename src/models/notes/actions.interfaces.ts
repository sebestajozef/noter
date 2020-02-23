import {
  NOTES_LIST_REQUEST,
  NOTES_LIST_ERROR,
  NOTES_LIST_SUCCESS,
  NOTE_DETAIL_ERROR,
  NOTE_DETAIL_REQUEST,
  NOTE_DETAIL_SUCCESS,
  NOTE_UPDATE_ERROR,
  NOTE_UPDATE_REQUEST,
  NOTE_UPDATE_SUCCESS,
  NOTE_DELETE_ERROR,
  NOTE_DELETE_REQUEST,
  NOTE_DELETE_SUCCESS,
  NOTE_CREATE_REQUEST,
  NOTE_CREATE_ERROR,
  NOTE_CREATE_SUCCESS,
  RESET_FLAGS,
} from './constants'

import {NoteDataModel} from './../../interfaces/NoteModel'


interface NotesListRequestAction {
  type: typeof NOTES_LIST_REQUEST,
}

interface NotesListSuccessAction {
  type: typeof NOTES_LIST_SUCCESS,
  notesData: NoteDataModel[]
}

interface NotesListErrorAction {
  type: typeof NOTES_LIST_ERROR
}

interface NoteDetailRequestAction {
  type: typeof NOTE_DETAIL_REQUEST,
  id: number
}

interface NoteDetailErrorAction {
  type: typeof NOTE_DETAIL_ERROR,
}

interface NoteDetailSuccessAction {
  type: typeof NOTE_DETAIL_SUCCESS,
  noteData: NoteDataModel,
}

interface NoteUpdateErrorAction {
  type: typeof NOTE_UPDATE_ERROR,
}

interface NotesUpdateRequestAction {
  type: typeof NOTE_UPDATE_REQUEST,
  id: number,
  title: string,
}

interface NoteUpdateSuccessAction {
  type: typeof NOTE_UPDATE_SUCCESS,
  isUpdated: boolean
}

interface NoteDeleteErrorAction {
  type: typeof NOTE_DELETE_ERROR,
}

interface NoteDeleteRequestAction {
  type: typeof NOTE_DELETE_REQUEST,
  id: number,
}

interface NoteDeleteSuccessAction {
  type: typeof NOTE_DELETE_SUCCESS,
  isDeleted: boolean
}

interface NoteCreateSuccessAction {
  type: typeof NOTE_CREATE_SUCCESS,
  isCreated: boolean,
}

interface NoteCreateErrorAction {
  type: typeof NOTE_CREATE_ERROR,
}

interface NoteCreateRequestAction {
  type: typeof NOTE_CREATE_REQUEST,
  title: string,
}

interface NoteResetFlagsAction {
  type: typeof RESET_FLAGS,
  isDeleted: boolean,
  isUpdated: boolean,
  isCreated: boolean
}

export type NoteActionTypes = NotesListRequestAction | NotesListSuccessAction | NotesListErrorAction | NoteDetailRequestAction | NoteDetailSuccessAction | NoteDetailErrorAction |
NoteUpdateErrorAction | NoteUpdateSuccessAction | NotesUpdateRequestAction | NoteDeleteErrorAction | NoteDeleteRequestAction | NoteDeleteSuccessAction | NoteCreateErrorAction | NoteCreateSuccessAction | NoteCreateRequestAction | NoteResetFlagsAction
