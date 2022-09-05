import cuid from 'cuid'
import { Cart } from 'src/types/PrismaProxy'
import { User1 } from './User'

export const Cart1: Cart = {
  id: cuid(),
  userId: User1.id,
}
