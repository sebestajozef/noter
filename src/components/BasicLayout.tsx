import React, { FunctionComponent} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import '../assets/css/BasicLayout.less'

const BasicLayout:FunctionComponent = props => {
return (
  <React.Fragment>
    <CssBaseline />
    <Container fixed>
      <Typography component="div" className="basic-layout">
        {props.children}
      </Typography>
    </Container>
  </React.Fragment>
)
}

export default BasicLayout
