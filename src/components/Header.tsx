import { useRouter } from 'next/router'
import React, { FC } from 'react'
import HeaderButton from './HeaderButton'
import Dropdown from './Dropdown'
import useUser from '../lib/hooks/useUser'

const Header: FC = () => {
  const router = useRouter()
  const { isLoggedIn, performLogout } = useUser()
  console.log(isLoggedIn)

  return (
    <div className="flex justify-between bg-gray-100 px-12 py-2">
      <div>
        <HeaderButton title="Home" onClick={() => router.push('/')} />
      </div>
      <div className="flex justify-between space-x-3">
        <HeaderButton title="About" onClick={() => router.push('/about')} />
        <HeaderButton title="Gallery" onClick={() => router.push('/gallery')} />
        {!isLoggedIn && (
          <Dropdown
            menuItems={[
              {
                value: 'Sign in',
                onClick: () => router.push('/login'),
              },
            ]}
          />
        )}
        {isLoggedIn && (
          <Dropdown
            menuItems={[
              {
                value: 'Profile',
                onClick: () => router.push('/profile'),
              },
              {
                value: 'Logout',
                onClick: performLogout,
              },
            ]}
          />
        )}
      </div>
    </div>
  )
}

export default Header
