import { galleryImageDto } from 'common/fixtures/GalleryImages'
import cartSlice, { cartActions, CartState } from 'src/redux/slices/cartSlice'
import { withLocalStorage, withRedirect, withToasts } from 'src/redux/utils'

describe('addCartItem', () => {
  const initialState: CartState = {
    ...withRedirect,
    ...withToasts,
    ...withLocalStorage,
    cart: {
      items: [],
    },
  }
  it('adds item to cart', () => {
    const res = cartSlice(
      initialState,
      cartActions.addCartItem(galleryImageDto)
    )
    expect(res.cart.items[0]).toEqual(galleryImageDto)
    expect(res.cart.items.length).toBe(1)
  })
})

describe('deleteCartItem', () => {
  const initialState: CartState = {
    ...withRedirect,
    ...withToasts,
    ...withLocalStorage,
    cart: {
      items: [galleryImageDto],
    },
  }
  it('removes item from cart by given id', () => {
    const res = cartSlice(
      initialState,
      cartActions.deleteCartItem(galleryImageDto.id)
    )
    expect(res.cart.items.length).toBe(0)
  })

  it('does not do anything if id does not match', () => {
    const res = cartSlice(initialState, cartActions.deleteCartItem('foo'))

    expect(res.cart.items.length).toBe(1)
    expect(res.cart.items[0]).toEqual(galleryImageDto)
  })
})
