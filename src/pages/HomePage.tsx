import React, { FunctionComponent, useEffect } from 'react';
import {connect} from 'react-redux'
import {isEmpty} from 'lodash'
import {compose} from 'recompose'
import {setLanguage, translate} from 'react-switch-lang'
import CircularProgress from '@material-ui/core/CircularProgress'
import {Snackbar, Grid, Button} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

import {notesListRequest, resetFlags} from '../models/notes/actions'
import BasicLayout from '../components/BasicLayout'
import Note from '../components/Note'
import CreateNote from '../components/CreateNote'

import '../assets/css/HomePage.less'
import { NoteDataModel } from "../interfaces/NoteModel";
import { RootState } from "../rootReducer";


interface Props extends NoteDataModel {
  notesListRequest: (() => void);
  resetFlags: (() => void);
  isDeleted: boolean;
  isCreated: boolean;
  isUpdated: boolean;
  t: ((arg0: string) => string),
  notesData: NoteDataModel[],
  loading: boolean
}


const _Homepage: FunctionComponent<Props> = props => {
  const {t, isUpdated, isCreated, isDeleted, notesData, resetFlags, loading, notesListRequest} = props
  useEffect(() => {
    notesListRequest()
  }, [notesListRequest])

  const handleSetLanguage = (key:string) => () => {
    setLanguage(key)
  }

  const closeSnackbar = () => {
    resetFlags()
  }

  const getSnackbarText = () => {
    let txtVar
    if (!isDeleted && !isUpdated && !isCreated) {
      return ''
    }
    if (isCreated) {
      txtVar = 'Created'
    } else if (isDeleted) {
      txtVar = 'Deleted'
    } else if (isUpdated) {
      txtVar = 'Updated'
    }
    return t(`Snackbar.note${txtVar}`)
  }

  const snackbarText = getSnackbarText()
  return (
    <BasicLayout>
      <div className="homepage">
        <div className="upper-section">
          <Snackbar
            open={
              isUpdated ||
              isCreated ||
              isDeleted
            }
            autoHideDuration={3000}
            onClose={closeSnackbar}
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            className="snackbar"
          >
            <Alert onClose={closeSnackbar} severity="success">
              {snackbarText}
            </Alert>
          </Snackbar>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <h1>{t('HomePage.title')}</h1>
            </Grid>
            <Grid item xs={6}>
              <Button type="button" onClick={handleSetLanguage('en')}>
                EN
              </Button>
              <Button type="button" onClick={handleSetLanguage('cz')}>
                CZ
              </Button>
            </Grid>
          </Grid>
          <CreateNote />
        </div>
        <div className="lower-section">
          {!!loading ? (
            <CircularProgress />
          ) : !isEmpty(notesData) ? (
            <React.Fragment>
              {notesData.map(note => (
                <Note key={note.id} title={note.title} id={note.id} />
              ))}
            </React.Fragment>
          ) : (
            <div>{t('Homepage.noNotes')}</div>
          )}
        </div>
      </div>
    </BasicLayout>
  )

}

const Homepage = compose(
  connect(
      (reduxState: RootState) => ({
      notesData: reduxState.notes.notesData,
      loading: reduxState.loadings.NOTES_LIST,
      isUpdated: reduxState.notes.isUpdated,
      isDeleted: reduxState.notes.isDeleted,
      isCreated: reduxState.notes.isCreated,
    }),
    {notesListRequest: notesListRequest, resetFlags}
  ),
  translate
)(_Homepage)

export default Homepage
