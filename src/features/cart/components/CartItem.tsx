import { DeleteIcon } from '@chakra-ui/icons'
import { Flex, GridItem, IconButton, SimpleGrid, Text } from '@chakra-ui/react'
import { Endpoints } from 'common/constants/Endpoints'
import React from 'react'
import ImagePresenter from 'src/components/ImagePresenter'
import { API } from 'src/constants/EnvProxy'
import useI18n from 'src/lib/hooks/useI18n'
import { CartItem } from 'src/types'

interface Props extends CartItem {
  onDelete: (item: CartItem['id']) => void
}

const CartItemComponent = (props: Props) => {
  const { onDelete, description, id, name, category } = props
  const { t } = useI18n()
  return (
    <SimpleGrid
      spacing="4"
      columns={12}
      border="1px"
      w={{ base: '100%', sm: 'xl' }}
      bgColor="gray.50"
    >
      <GridItem colSpan={{ base: 3, sm: 6 }} alignSelf="center">
        <ImagePresenter
          width={{ base: '50', sm: '60' }}
          height={{ base: '50', sm: '60' }}
          src={`${API}${Endpoints.galleryGetImage
            .replace(':category', category)
            .replace(':name', id)}`}
        />
      </GridItem>
      <GridItem colSpan={{ base: 8, sm: 5 }}>
        <Text my="4" fontSize="xl">
          {name}
        </Text>
        <Text fontSize="md">{description}</Text>
        <Text fontSize="sm">
          {props.width}cm x {props.height}cm
        </Text>

        <Flex>
          <Text my="4" fontSize="lg">
            {t.price}:
          </Text>
          <Text my="4" mx="2" fontSize="lg" color="orange.400">
            {' '}
            {props.price} €
          </Text>
        </Flex>
      </GridItem>
      <GridItem colStart={12}>
        <IconButton
          onClick={() => onDelete(props.id)}
          icon={<DeleteIcon w={5} h={5} />}
          variant={'ghost'}
          aria-label={'Delete cart item'}
          ml="-6"
        />
      </GridItem>
    </SimpleGrid>
  )
}

export default CartItemComponent
