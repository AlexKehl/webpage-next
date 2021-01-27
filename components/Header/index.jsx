import { Fragment } from 'react'
import useStyles from './styles'
import Toolbar from '@material-ui/core/Toolbar'
import HeaderButton from '../HeaderButton'
import UserPanel from '../UserPanel'
import { useRouter } from 'next/router'
import GalleryDropdown from '../GalleryDropdown'
import CATEGORIES from '../../constants/Categories'

const Header = () => {
  const classes = useStyles()

  const router = useRouter()

  return (
    <Fragment>
      <Toolbar className={classes.toolbar}>
        <div className={classes.leftHalf}>
          <HeaderButton onClick={() => router.push('/')} size="small">
            Anatoly Kehl
          </HeaderButton>
        </div>
        <div className={`${classes.rightHalf}`}>
          <HeaderButton size="small" onClick={() => router.push('/about')}>
            About
          </HeaderButton>
          <GalleryDropdown
            buttonLabel="Gallery"
            menuItems={CATEGORIES.map((category) => ({
              name: category,
              onClick: () => router.push(`/gallery/${category}`),
            }))}
          />
          <UserPanel />
        </div>
      </Toolbar>
    </Fragment>
  )
}

export default Header
