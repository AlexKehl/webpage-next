import React, { ButtonHTMLAttributes, FC, HTMLProps } from 'react'
import { joinClasses } from '../utils/TailWind'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
}

const HeaderButton: FC<ButtonProps> = ({ title, ...props }) => {
  return (
    <button
      className={joinClasses([
        'bg-gray-500',
        'rounded',
        'text-white',
        'cursor-pointer',
        'hover:bg-gray-700',
        'py-1',
        'px-4',
        'focus:outline-none',
        'focus:shadow-outline',
      ])}
      {...props}
    >
      {title}
    </button>
  )
}

export default HeaderButton
