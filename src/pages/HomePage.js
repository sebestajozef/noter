import {connect} from 'react-redux'
import {isEmpty} from 'lodash'
import React from 'react'
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

class _Homepage extends React.PureComponent {
  componentDidMount() {
    this.props.notesListRequest()
  }

  handleSetLanguage = key => () => {
    setLanguage(key)
  }

  closeSnackbar = () => {
    this.props.resetFlags()
  }

  getSnackbarText = () => {
    let txtVar
    const {isDeleted, isUpdated, isCreated} = this.props
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
    return this.props.t(`Snackbar.note${txtVar}`)
  }

  render() {
    const {t} = this.props
    const notesData = this.props.notesData
    const snackbarText = this.getSnackbarText()
    return (
      <BasicLayout>
        <div className="homepage">
          <div className="upper-section">
            <Snackbar
              open={
                this.props.isUpdated ||
                this.props.isCreated ||
                this.props.isDeleted
              }
              autoHideDuration={3000}
              onClose={this.closeSnackbar}
              anchorOrigin={{vertical: 'top', horizontal: 'center'}}
              className="snackbar"
            >
              <Alert onClose={this.closeSnackbar} severity="success">
                {snackbarText}
              </Alert>
            </Snackbar>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <h1>{t('HomePage.title')}</h1>
              </Grid>
              <Grid item xs={6}>
                <Button type="button" onClick={this.handleSetLanguage('en')}>
                  EN
                </Button>
                <Button type="button" onClick={this.handleSetLanguage('cz')}>
                  CZ
                </Button>
              </Grid>
            </Grid>
            <CreateNote />
          </div>
          <div className="lower-section">
            {!!this.props.loading ? (
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
}

const Homepage = compose(
  connect(
    reduxState => ({
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
