import Text from './text'
import { FC } from 'react'

const About: FC = () => (
  <div className="max-w-4xl mx-auto">
    <div className="flex justify-center">
      <img
        className="max-w-full p-4 border-2"
        src="/photo_2021-01-14 02.52.26.jpeg"
      />
    </div>
    <div className="text-center font-bold p-4">My name is FooBar</div>
    <div className="p-4">{Text}</div>
  </div>
)

export default About
