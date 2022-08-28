import { EditIcon } from '@chakra-ui/icons'
import { Button, Flex, VStack } from '@chakra-ui/react'
import { Category } from 'common/interface/Constants'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Lightbox from 'react-image-lightbox'
import ImagePresenter from 'src/components/ImagePresenter'
import useI18n from 'src/lib/hooks/useI18n'
import { getCyclic } from 'src/utils/Functions'
import { useQuery } from 'src/utils/Trpc'
import GalleryImageInfo from './GalleryImageInfo'

interface Props {
  category: Category
}

const Gallery = ({ category }: Props) => {
  const { t } = useI18n()
  const router = useRouter()
  const { data: session } = useSession()
  const { data: images } = useQuery(['gallery.imagesList', { category }])
  const [lightBox, setLightBox] = useState({ isOpen: false, idx: 0 })
  const [infoModal, setInfoModal] = useState({ isOpen: false, idx: 0 })

  const imageUrls = images?.map((i) => i.url)

  if (!images) {
    return <div />
  }

  return (
    <VStack my="3" mx="auto" maxW={{ base: '1', sm: '7xl' }}>
      {session?.user.role === 'ADMIN' && (
        <Button
          w="full"
          variant="ghost"
          onClick={() => router.push(`/galleryedit/${category}`)}
          rightIcon={<EditIcon />}
        >
          {t.edit}
        </Button>
      )}
      <Flex wrap="wrap">
        {images?.map((image, idx) => (
          <ImagePresenter
            key={idx}
            src={image.url}
            onClick={() => setLightBox({ idx, isOpen: true })}
            onInfoClick={() => setInfoModal({ idx, isOpen: true })}
          />
        ))}
      </Flex>
      {lightBox.isOpen && (
        <Lightbox
          imagePadding={0}
          mainSrc={imageUrls?.[lightBox.idx] || ''}
          nextSrc={getCyclic(imageUrls!, lightBox.idx + 1)}
          prevSrc={getCyclic(imageUrls!, lightBox.idx - 1)}
          onCloseRequest={() => setLightBox({ idx: 0, isOpen: false })}
          onMovePrevRequest={() =>
            setLightBox({
              idx: (lightBox.idx + images!.length + 1) % images!.length,
              isOpen: true,
            })
          }
          onMoveNextRequest={() =>
            setLightBox({
              idx: (lightBox.idx + images!.length - 1) % images!.length,
              isOpen: true,
            })
          }
        />
      )}
      <GalleryImageInfo
        isInfoModalOpen={infoModal.isOpen}
        image={images![infoModal.idx]!}
        onClose={() => setInfoModal({ idx: 0, isOpen: false })}
      />
    </VStack>
  )
}

export default Gallery
