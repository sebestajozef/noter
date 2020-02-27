import {combineReducers} from 'redux'

import loadingSharedReducer from './models/loadingShared/reducer'
import notesReducer from './models/notes/reducer'

export const rootReducer = combineReducers({
  notes: notesReducer,
  loadings: loadingSharedReducer,
})

export type RootState = ReturnType<typeof rootReducer>
