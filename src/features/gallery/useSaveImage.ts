import { useState } from 'react'
import { useMutation } from 'src/utils/Trpc'

const useSaveImage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {} = useMutation('gallery.save')
}
export default useSaveImage
