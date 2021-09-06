import React from 'react'
import WithHeader from './HOC/WithHeader'
import AboutText from '../constants/AboutText'
import Image from 'next/image'
import AboutPicture from '../../public/photo_2021-01-14 02.52.26.jpeg'

export const AboutPage = () => (
  <div className="max-w-4xl mx-auto">
    <div className="flex justify-center">
      <Image alt="" className="max-w-full p-4 border-2" src={AboutPicture} />
    </div>
    <div className="text-center font-bold p-4">My name is FooBar</div>
    <div className="p-4">{AboutText}</div>
  </div>
)

export default WithHeader(AboutPage)
