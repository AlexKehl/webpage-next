import { Cart1 } from 'test/fixtures/Cart'
import { GalleryImage1 } from 'test/fixtures/GalleryImage'
import { User1 } from 'test/fixtures/User'
import { setupServer } from 'test/utils/Setup'
import prisma from 'src/lib/prisma'

const { getServerClient } = setupServer()

describe('add', () => {
  it('adds item to cart if cart already exists', async () => {
    const { caller } = await getServerClient()

    await prisma.galleryImage.create({ data: GalleryImage1 })
    await prisma.user.create({ data: User1 })
    await prisma.cart.create({ data: Cart1 })

    await caller.mutation('cart.add', {
      imageId: GalleryImage1.id,
    })

    const updatedCart = await prisma.cart.findUnique({
      where: { id: Cart1.id },
      include: { galleryImages: true },
    })
    expect(updatedCart?.galleryImages[0]).toMatchObject(GalleryImage1)
    expect(updatedCart).toMatchObject(Cart1)
  })

  it('creates cart (if not existing) and adds item', async () => {
    const { caller } = await getServerClient()

    await prisma.galleryImage.create({ data: GalleryImage1 })
    await prisma.user.create({ data: User1 })

    await caller.mutation('cart.add', {
      imageId: GalleryImage1.id,
    })

    const newCart = await prisma.cart.findFirst({
      include: { galleryImages: true },
    })
    expect(newCart?.galleryImages[0]).toMatchObject(GalleryImage1)
  })

  it('returns error if item is already present in cart', async () => {
    const { caller } = await getServerClient()

    await prisma.galleryImage.create({ data: GalleryImage1 })
    await prisma.user.create({ data: User1 })
    await prisma.cart.create({
      data: { ...Cart1, galleryImages: { connect: { id: GalleryImage1.id } } },
    })

    try {
      await caller.mutation('cart.add', {
        imageId: GalleryImage1.id,
      })
      throw new Error()
    } catch (e) {
      expect(e.message).toEqual('Image is already in the cart')
    }
  })
})

describe('delete', () => {
  it('deletes item from cart', async () => {
    const { caller } = await getServerClient()

    await prisma.galleryImage.create({ data: GalleryImage1 })
    await prisma.user.create({ data: User1 })
    await prisma.cart.create({
      data: { ...Cart1, galleryImages: { connect: { id: GalleryImage1.id } } },
    })

    await caller.mutation('cart.delete', {
      imageId: GalleryImage1.id,
    })

    const updatedCart = await prisma.cart.findUnique({
      where: { id: Cart1.id },
      include: { galleryImages: true },
    })

    expect(updatedCart?.galleryImages.length).toBe(0)
  })

  it('only deletes the referece to images. Not images themselves', async () => {
    const { caller } = await getServerClient()

    await prisma.galleryImage.create({ data: GalleryImage1 })
    await prisma.user.create({ data: User1 })
    await prisma.cart.create({
      data: { ...Cart1, galleryImages: { connect: { id: GalleryImage1.id } } },
    })

    await caller.mutation('cart.delete', {
      imageId: GalleryImage1.id,
    })

    const cart = await prisma.cart.findFirst({
      include: { galleryImages: true },
    })

    expect(cart?.galleryImages.length).toBe(0)
  })
})
