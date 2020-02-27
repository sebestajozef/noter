import React, { FunctionComponent, useState } from 'react'
import {
  Button,
  Modal,
  Tooltip,
  CircularProgress,
  FormControl,
  DialogContent,
  DialogActions,
  Dialog,
  Box,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import {connect} from 'react-redux'
import {Formik, Form, Field} from 'formik'
import {TextField} from 'formik-material-ui'
import {translate} from 'react-switch-lang'
import {compose} from 'recompose'

import {
  noteDetailRequest,
  noteUpdateRequest,
  noteDeleteRequest,
} from '../models/notes/actions'

import '../assets/css/Note.less'
import { NoteDataModel } from "../interfaces/NoteModel";
import { RootState } from "../rootReducer";


interface Props extends NoteDataModel {
  noteDetailRequest: ((arg0: number) => void);
  noteDeleteRequest: ((arg0: number) => void);
  noteUpdateRequest: ((arg0: number, arg1: string) => void);
  noteData: NoteDataModel,
  t: ((arg0: string) => string),
  loading: boolean,
}

const _Note: FunctionComponent<Props> = props => {
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const {id, title, noteDetailRequest, noteUpdateRequest, noteDeleteRequest, noteData, t, loading} = props

  const handleDetailModalOpen = () => {
    setDetailModalOpen(true)
    noteDetailRequest(id)
  }

  const handleDetailModalClose = () => {
    setDetailModalOpen(false)
  }

  const handleUpdateModalOpen = () => {
    setUpdateModalOpen(true)
  }

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false)
  }

  const submitUpdate = title => {
    noteUpdateRequest(id, title)
    handleUpdateModalClose()
  }

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false)
  }

  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true)
  }

  const handleDelete = () => {
    noteDeleteRequest(id)
    handleDeleteModalClose()
  }

  return (
    <div className="note">
      <Box
        display="flex"
        alignItems="flex-start"
        p={1}
        m={1}
        bgcolor="background.paper"
        css={{maxWidth: 580}}
      >
        <Box width={'320px'}>{title}</Box>
        <Box p={1}>
          <Tooltip title={t('Button.detail')}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleDetailModalOpen}
            >
              <SearchIcon />
            </Button>
          </Tooltip>
        </Box>
        <Box p={1}>
          <Tooltip title={t('Button.edit')}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleUpdateModalOpen}
            >
              <EditIcon />
            </Button>
          </Tooltip>
        </Box>
        <Box p={1}>
          <Tooltip title={t('Button.delete')}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDeleteModalOpen}
            >
              <DeleteIcon />
            </Button>
          </Tooltip>
        </Box>
      </Box>
      <Modal
        open={detailModalOpen}
        onClose={handleDetailModalClose}
        className="modal detail-modal"
      >
        {!!loading ? (
          <CircularProgress />
        ) : (
          <div className="content">
            <p>{noteData.title}</p>
            <div className="action-buttons">
              <Button
                autoFocus
                variant="outlined"
                onClick={handleDetailModalClose}
                color="primary"
              >
                OK
              </Button>
            </div>
          </div>
        )}
      </Modal>
      <Modal
        open={updateModalOpen}
        onClose={handleUpdateModalClose}
        className="modal update-modal"
      >
        <div className="content">
          <Formik
            initialValues={{title}}
            validate={values => {
              const errors: {title?: string} = {}
              if (!values.title) {
                errors.title = 'Required'
              }
              return errors
            }}
            onSubmit={values => {
              submitUpdate(values.title)
            }}
          >
            {({handleSubmit}) => (
              <Form onSubmit={handleSubmit}>
                <FormControl className="title" required>
                  <Field
                    name="title"
                    component={TextField}
                    label={t('Form.title')}
                  />
                </FormControl>
                <div className="action-buttons">
                  <Button
                    variant="outlined"
                    color="primary"
                    type="submit"
                    className="space-from-left"
                  >
                    {t('Button.apply')}
                  </Button>
                  <Button
                    onClick={handleUpdateModalClose}
                    color="primary"
                    variant="outlined"
                  >
                    {t('Button.cancel')}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
      <Dialog
        maxWidth="xs"
        open={deleteModalOpen}
        onClose={handleDeleteModalClose}
      >
        <DialogContent>{t('Modal.deleteConfirmText')}</DialogContent>
        <DialogActions className="delete-dialog-actions">
          <Button
            autoFocus
            onClick={handleDeleteModalClose}
            variant={'outlined'}
            color="primary"
          >
            {t('Button.cancel')}
          </Button>
          <Button
            onClick={handleDelete}
            variant={'outlined'}
            color="primary"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}


const Note = compose(
  connect(
    (reduxState: RootState) => ({
      noteData: reduxState.notes.noteData,
      loading: reduxState.loadings.NOTE_DETAIL,
    }),
    {noteDetailRequest, noteUpdateRequest, noteDeleteRequest}
  ),
  translate
)(_Note)

export default Note
