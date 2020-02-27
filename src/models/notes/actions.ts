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

import {NoteActionTypes} from "./actions.interfaces";

export const notesListRequest = ():NoteActionTypes => ({
  type: NOTES_LIST_REQUEST,
})

export const notesListError = ():NoteActionTypes => ({
  type: NOTES_LIST_ERROR,
})

export const notesListSuccess = (data):NoteActionTypes => ({
  type: NOTES_LIST_SUCCESS,
  notesData: data,
})

export const noteDetailRequest = (noteId):NoteActionTypes => ({
  type: NOTE_DETAIL_REQUEST,
  id: noteId,
})

export const noteDetailError = ():NoteActionTypes => ({
  type: NOTE_DETAIL_ERROR,
})

export const noteDetailSuccess = (data):NoteActionTypes => ({
  type: NOTE_DETAIL_SUCCESS,
  noteData: data,
})

export const noteUpdateRequest = (noteId, title):NoteActionTypes => ({
  type: NOTE_UPDATE_REQUEST,
  id: noteId,
  title: title,
})

export const noteUpdateError = ():NoteActionTypes => ({
  type: NOTE_UPDATE_ERROR,
})

export const noteUpdateSuccess = ():NoteActionTypes => ({
  type: NOTE_UPDATE_SUCCESS,
  isUpdated: true,
})

export const noteDeleteRequest = (noteId):NoteActionTypes => ({
  type: NOTE_DELETE_REQUEST,
  id: noteId,
})

export const noteDeleteError = ():NoteActionTypes => ({
  type: NOTE_DELETE_ERROR,
})

export const noteDeleteSuccess = ():NoteActionTypes => ({
  type: NOTE_DELETE_SUCCESS,
  isDeleted: true,
})

export const noteCreateRequest = (title):NoteActionTypes => ({
  type: NOTE_CREATE_REQUEST,
  title: title,
})

export const noteCreateError = ():NoteActionTypes => ({
  type: NOTE_CREATE_ERROR,
})

export const noteCreateSuccess = ():NoteActionTypes => ({
  type: NOTE_CREATE_SUCCESS,
  isCreated: true,
})

export const resetFlags = ():NoteActionTypes => ({
  type: RESET_FLAGS,
  isUpdated: false,
  isCreated: false,
  isDeleted: false,
})
