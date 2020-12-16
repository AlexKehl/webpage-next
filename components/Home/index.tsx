import { Fragment } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Header from 'components/Header'

export default function Blog() {
  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Header />
      </Container>
    </Fragment>
  )
}
