import { FC } from 'react'

interface Props {
  onClick?: (event: any) => void
  url: string
}

const ImagePresenter: FC<Props> = ({ onClick, url }) => {
  return (
    <span className="inline-block mx-3 mb-3 p-0 w-48 h-48 bg-gray-100 rounded-lg">
      <img
        className="object-cover h-full m-auto p-1 border"
        src={url}
        onClick={onClick}
      />
    </span>
  )
}

export default ImagePresenter
