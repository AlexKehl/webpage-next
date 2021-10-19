import { Center, Flex, IconButton, Text } from '@chakra-ui/react'
import React from 'react'
import { CartItem } from '../../types'
import ImagePresenter from '../ImagePresenter'
import { Endpoints } from '../../../common/constants/Endpoints'
import { API } from '../../constants/EnvProxy'
import { DeleteIcon } from '@chakra-ui/icons'
import TestIds from '../../constants/TestIds'

interface Props extends CartItem {
  onDelete: (item: CartItem) => void
}

const CartItemComponent = (props: Props) => {
  const { onDelete, description, id, name, category } = props
  return (
    <Center>
      <Flex p="5" maxW="5xl" boxShadow="md" bgColor="gray.50">
        <ImagePresenter
          src={`${API}${Endpoints.galleryGetImage
            .replace(':category', category)
            .replace(':name', id)}`}
        />
        <Text m="4" fontSize="xl">
          {name}
        </Text>
        <Text fontSize="md">{description}</Text>
        <IconButton
          onClick={() => onDelete(props)}
          data-testid={TestIds.deleteCartItem}
          icon={<DeleteIcon w={5} h={5} />}
          variant={'ghost'}
          aria-label={'Delete cart item'}
        />
      </Flex>
    </Center>
  )
}

export default CartItemComponent
