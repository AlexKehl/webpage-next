import Dropdown from '../Dropdown'
import CATEGORIES from '../../constants/Categories'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { Toolbar } from '@material-ui/core'
import HeaderButton from '../HeaderButton'
import UserPanel from '../UserPanel'

const Header = ({ router, i18n, locale, changeLanguage }) => (
  <Fragment>
    <Toolbar className="flex justify-between my-2 mx-1">
      <div>
        <HeaderButton onClick={() => router.push('/')} size="small">
          Anatoly Kehl
        </HeaderButton>
      </div>
      <div className="flex justify-between">
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
