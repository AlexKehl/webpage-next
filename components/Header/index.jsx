import { Fragment } from 'react'
import useStyles from './styles'
import Toolbar from '@material-ui/core/Toolbar'
import HeaderButton from '../HeaderButton'
import UserPanel from '../UserPanel'
import { useRouter } from 'next/router'
import GalleryDropdown from '../GalleryDropdown'

const Header = () => {
  const classes = useStyles()

  const router = useRouter()

  return (
    <Fragment>
      <Toolbar className={classes.toolbar}>
        <div className={classes.leftHalf}>
          <HeaderButton onClick={() => router.push('/')} size="small">
            Home
          </HeaderButton>
        </div>
        <div className={`${classes.rightHalf}`}>
          <HeaderButton size="small" onClick={() => router.push('/about')}>
            About
          </HeaderButton>
          <GalleryDropdown
            buttonLabel="Gallery"
            menuItems={[
              { name: 'Airbrush', onClick: () => router.push('/gallery') },
              { name: 'Acryl', onClick: () => router.push('/gallery') },
            ]}
          />
          <UserPanel />
        </div>
      </Toolbar>
    </Fragment>
  )
}

export default Header
