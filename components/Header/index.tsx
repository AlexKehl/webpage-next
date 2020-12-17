import {Fragment} from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { useCookies } from 'react-cookie'
import UserPanel from '../UserPanel'
import { useRouter } from 'next/router'

const useStyles = makeStyles(() => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '2em'
  },
  rightHalf: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}))

export default function Header() {
  const classes = useStyles()

  const [cookies] = useCookies(['cookie-name'])
  const router = useRouter()

  return (
    <Fragment>
      <Toolbar className={classes.toolbar}>
        <Button onClick={() => router.push('/')} size="small">Home</Button>
        <div className={classes.rightHalf}>
          <Button size="small" onClick={() => router.push('/about')}>About</Button>
          <Button size="small">Gallery</Button>
          {!cookies?.hasActiveToken ? 
            <Button variant="outlined" size="small" onClick={() => router.push('login')}>
              Sign up
            </Button>
            : 
            <UserPanel/>
          }
        </div>
      </Toolbar>
    </Fragment>
  )
}

Header.propTypes = {
  title: PropTypes.string,
}
