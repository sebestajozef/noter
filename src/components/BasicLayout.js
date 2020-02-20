import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import '../assets/css/BasicLayout.less'

export default class BasicLayout extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container fixed>
          <Typography component="div" className="basic-layout">
            {this.props.children}
          </Typography>
        </Container>
      </React.Fragment>
    )
  }
}
