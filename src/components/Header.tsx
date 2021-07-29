import { useRouter } from 'next/router'
import React, { FC } from 'react'
import HeaderButton from './HeaderButton'
import Dropdown from './Dropdown'

const Header: FC = () => {
  const router = useRouter()

  return (
    <div className="flex justify-between bg-gray-100 px-12 py-2">
      <div>
        <HeaderButton title="Home" onClick={() => router.push('/')} />
      </div>
      <div className="flex justify-between space-x-3">
        <HeaderButton title="About" onClick={() => router.push('/about')} />
        <HeaderButton title="Gallery" onClick={() => router.push('/gallery')} />
        <HeaderButton title="Sign in" onClick={() => router.push('/login')} />
        <Dropdown
          menuItems={[
            {
              value: 'Sign in',
              onClick: () => router.push('/login'),
            },
            {
              value: 'Do',
              onClick: () => router.push('/login'),
            },
          ]}
        />
      </div>
    </div>
  )
}

export default Header
