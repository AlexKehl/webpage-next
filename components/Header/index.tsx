import {Fragment} from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { useCookies } from 'react-cookie'
import UserPanel from '../UserPanel'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    justifyContent: 'space-between'
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
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
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
      </Toolbar>
    </Fragment>
  )
}

Header.propTypes = {
  title: PropTypes.string,
}
