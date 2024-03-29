import React from 'react'
import WithHeader from './HOC/WithHeader'
import AboutText from '../constants/AboutText'
import Image from 'next/image'
import AboutPicture from '../../public/photo_2021-01-14 02.52.26.jpeg'
import { Text, Center, VStack } from '@chakra-ui/react'

export const AboutPage = () => (
  <Center>
    <VStack maxW="4xl">
      <Image alt="" src={AboutPicture} />
      <Text fontSize="xl">My name is FooBar</Text>
      <Text px="2">{AboutText}</Text>
    </VStack>
  </Center>
)

export default WithHeader(AboutPage)
