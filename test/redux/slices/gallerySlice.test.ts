import { API } from '../../../src/constants/EnvProxy'
import gallerySlice, {
  galleryActions,
  GalleryState,
  imageSelector,
  initialState,
} from '../../../src/redux/slices/gallerySlice'
import {
  fileWithMeta,
  generateFileWithMeta,
} from '../../fixtures/GalleryImages'

describe('openLightBox', () => {
  it('sets required data', () => {
    const state = gallerySlice(undefined, galleryActions.openLightBox(1))

    expect(state.currentImageIdx).toBe(1)
    expect(state.isViewerOpen).toBe(true)
  })
})

describe('closeLightBox', () => {
  it('sets isViewerOpen to false', () => {
    const state = gallerySlice(undefined, galleryActions.closeLightBox())

    expect(state.isViewerOpen).toBe(false)
  })
})

describe('openNextImage', () => {
  it('increments currentImageIdx circular', () => {
    const initial = {
      ...initialState,
      images: [fileWithMeta, fileWithMeta],
    }
    const state = gallerySlice(initial, galleryActions.openNextImage())
    expect(state.currentImageIdx).toBe(1)
    const state2 = gallerySlice(state, galleryActions.openNextImage())
    expect(state2.currentImageIdx).toBe(0)
    const state3 = gallerySlice(state2, galleryActions.openNextImage())
    expect(state3.currentImageIdx).toBe(1)
  })
})

describe('openPrevImage', () => {
  it('decrements currentImageIdx circular', () => {
    const initial = {
      ...initialState,
      images: [fileWithMeta, fileWithMeta],
    }
    const state = gallerySlice(initial, galleryActions.openPrevImage())
    expect(state.currentImageIdx).toBe(1)
    const state2 = gallerySlice(state, galleryActions.openPrevImage())
    expect(state2.currentImageIdx).toBe(0)
    const state3 = gallerySlice(state2, galleryActions.openPrevImage())
    expect(state3.currentImageIdx).toBe(1)
  })
})

describe('addFiles', () => {
  it('adds files', () => {
    const state = gallerySlice(
      undefined,
      galleryActions.addFiles({ category: 'acryl', files: [fileWithMeta.file] })
    )

    const expected = [
      {
        file: fileWithMeta.file,
        name: '',
        url: '',
        id: '',
        width: 0,
        height: 0,
        category: 'acryl',
        isForSell: false,
      },
    ]

    expect(state.images).toEqual(expected)
  })
})

describe('imageSelector', () => {
  it('returns obj with current image data', () => {
    const initial: GalleryState = {
      ...initialState,
      images: [
        generateFileWithMeta(),
        generateFileWithMeta(),
        generateFileWithMeta(),
      ],
    }

    const res = imageSelector(initial)

    expect(res.currentImage).toEqual(initial.images[0])
    expect(res.currentImageUrl).toEqual(`${API}${initial.images[0]!.url}`)
    expect(res.nextImageUrl).toEqual(`${API}${initial.images[1]!.url}`)
    expect(res.prevImageUrl).toEqual(`${API}${initial.images[2]!.url}`)
  })
})
