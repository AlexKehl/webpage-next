import { Fragment } from 'react'
import useStyles from './styles'
import Toolbar from '@material-ui/core/Toolbar'
import HeaderButton from '../HeaderButton'
import UserPanel from '../UserPanel'
import { useRouter } from 'next/router'
import useI18n from '../../lib/hooks/useI18n'
import Dropdown from '../Dropdown'
import CATEGORIES from '../../constants/Categories'

const Header = () => {
  const classes = useStyles()
  const router = useRouter()
  const { changeLanguage, translated, locale } = useI18n()

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
            {translated.about}
          </HeaderButton>
          <Dropdown
            buttonLabel={translated.gallery}
            menuItems={CATEGORIES.map((category) => ({
              name: category,
              onClick: () => router.push(`/gallery/${category}`),
            }))}
          />
          <Dropdown
            buttonLabel={locale}
            menuItems={['en', 'de', 'ru'].map((oneLocale) => ({
              name: oneLocale.toUpperCase(),
              onClick: () => changeLanguage(oneLocale),
            }))}
          />
          <UserPanel />
        </div>
      </Toolbar>
    </Fragment>
  )
}

export default Header
