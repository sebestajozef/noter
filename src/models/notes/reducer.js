import {
  NOTES_LIST_SUCCESS,
  NOTE_DETAIL_SUCCESS,
  NOTE_UPDATE_SUCCESS,
  NOTE_DELETE_SUCCESS,
  NOTE_CREATE_SUCCESS,
  RESET_FLAGS,
} from './constants'

const initialState = {
  notesData: [],
  noteData: {},
  isUpdated: false,
  isDeleted: false,
  isCreated: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTES_LIST_SUCCESS:
      return {
        ...state,
        notesData: action.notesData,
      }

    case NOTE_DETAIL_SUCCESS:
      return {
        ...state,
        noteData: action.noteData,
      }
    case NOTE_UPDATE_SUCCESS:
      return {
        ...state,
        isUpdated: action.isUpdated,
      }
    case NOTE_DELETE_SUCCESS:
      return {
        ...state,
        isDeleted: action.isDeleted,
      }
    case NOTE_CREATE_SUCCESS:
      return {
        ...state,
        isCreated: action.isCreated,
      }
    case RESET_FLAGS:
      return {
        ...state,
        isUpdated: action.isUpdated,
        isDeleted: action.isDeleted,
        isCreated: action.isCreated,
      }
    default:
      return state
  }
}

export default reducer
