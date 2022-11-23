import { useState } from 'react'
import { trpc } from 'src/utils/Trpc'

const useSaveImage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {} = trpc.galleryImageRouter.save.useMutation()
}
export default useSaveImage
