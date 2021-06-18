import { FC } from 'react'
import ImageCarousel from '../ImageCarousel'
import WithHeader from '../WithHeader'

const Home: FC = () => {
  return <ImageCarousel />
}

export default WithHeader(Home)
