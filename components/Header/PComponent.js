import { Fragment } from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import HeaderButton from '../HeaderButton'
import UserPanel from '../UserPanel'
import Dropdown from '../Dropdown'
import CATEGORIES from '../../constants/Categories'
import PropTypes from 'prop-types'
import styles from './PComponent.module.css'

const Header = ({ router, i18n, locale, changeLanguage }) => (
  <Fragment>
    <Toolbar className={styles.toolbar}>
      <div className={styles.leftHalf}>
        <HeaderButton onClick={() => router.push('/')} size="small">
          Anatoly Kehl
        </HeaderButton>
      </div>
      <div className={`${styles.rightHalf}`}>
        <HeaderButton size="small" onClick={() => router.push('/about')}>
          {i18n.about}
        </HeaderButton>
        <Dropdown
          buttonLabel={i18n.gallery}
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

Header.propTypes = {
  router: PropTypes.object,
  i18n: PropTypes.object,
  locale: PropTypes.string,
  changeLanguage: PropTypes.func,
}

export default Header
