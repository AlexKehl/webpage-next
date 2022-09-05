import cuid from 'cuid'
import { User } from 'src/types/PrismaProxy'

export const User1: User = {
  id: cuid(),
  email: 'testUser1@foo.com',
  role: 'USER',
}
