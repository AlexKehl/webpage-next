import { useRouter } from 'next/router'
import CATEGORIES from '../constants/Categories'
import React, { FC, Fragment } from 'react'
import HeaderButton from './HeaderButton'
import UserPanel from './UserPanel'
import useI18n from '../lib/hooks/useI18n'
import Dropdown from './Dropdown'

const Header: FC = () => {
  const router = useRouter()
  const { changeLanguage, i18n, locale } = useI18n()

  return (
    <div className="flex justify-between">
      <HeaderButton value="button" />
      <HeaderButton value="button" />
      <HeaderButton value="button" />
    </div>
    // <Fragment>
    //   <Toolbar className="flex justify-between my-2 mx-1">
    //     <div>
    //       <HeaderButton onClick={() => router.push('/')} size="small">
    //         Anatoly Kehl
    //       </HeaderButton>
    //     </div>
    //     <div className="flex justify-between">
    //       <HeaderButton size="small" onClick={() => router.push('/about')}>
    //         {i18n.about}
    //       </HeaderButton>
    //       <Dropdown
    //         buttonLabel={i18n.gallery}
    //         menuItems={CATEGORIES.map((category) => ({
    //           name: category,
    //           onClick: () => router.push(`/gallery/${category}`),
    //         }))}
    //       />
    //       <Dropdown
    //         buttonLabel={locale || ''}
    //         menuItems={['en', 'de', 'ru'].map((oneLocale) => ({
    //           name: oneLocale.toUpperCase(),
    //           onClick: () => changeLanguage(oneLocale),
    //         }))}
    //       />
    //       <UserPanel />
    //     </div>
    //   </Toolbar>
    // </Fragment>
  )
}

export default Header
