import React from 'react'
import {Field, Form, Formik} from 'formik'
import {TextField} from 'formik-material-ui'
import {Button, Grid, Tooltip, FormControl} from '@material-ui/core'
import {connect} from 'react-redux'
import AddIcon from '@material-ui/icons/Add'
import {compose} from 'recompose'
import {translate} from 'react-switch-lang'

import {noteCreateRequest} from '../models/notes/actions'

import '../assets/css/CreateNote.less'

class _CreateNote extends React.PureComponent {
  state = {
    initialValues: {title: ''},
  }

  render() {
    const {t} = this.props
    return (
      <div className="create-note">
        <Formik
          initialValues={this.state.initialValues}
          validate={values => {
            const errors = {}
            if (!values.title) {
              errors.title = t('Form.required')
            }
            return errors
          }}
          onSubmit={(values, {resetForm}) => {
            this.props.noteCreateRequest(values.title)
            resetForm(this.state.initialValues)
          }}
        >
          {({handleSubmit}) => (
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={10}>
                  <FormControl required>
                    <Field
                      type="text"
                      name="title"
                      component={TextField}
                      label={t('Form.title')}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <Tooltip title={t('Button.add')}>
                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                      size="large"
                      disabled={!!this.props.loading}
                    >
                      <AddIcon />
                    </Button>
                  </Tooltip>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    )
  }
}

const CreateNote = compose(
  connect(
    reduxState => ({
      loading: reduxState.loadings.NOTE_CREATE,
    }),
    {noteCreateRequest}
  ),
  translate
)(_CreateNote)

export default CreateNote
