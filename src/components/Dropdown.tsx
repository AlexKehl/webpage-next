import React, { FC, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { joinClasses } from '../utils/TailWind'
import { UserCircleIcon } from '@heroicons/react/solid'

interface MenuItem {
  value: string
  onClick: () => void
}

interface Props {
  menuItems: MenuItem[]
}

const Dropdown: FC<Props> = ({ menuItems }) => {
  return (
    <Menu as="div" className="ml-3 relative">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">Open user menu</span>
              <UserCircleIcon className="h-8 w-8 text-blue-100" />
            </Menu.Button>
          </div>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              {menuItems.map((menuItem, key) => (
                <Menu.Item key={key}>
                  {({ active }) => (
                    <button
                      onClick={menuItem.onClick}
                      className={joinClasses([
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700, w-full',
                      ])}
                    >
                      {menuItem.value}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}

export default Dropdown
