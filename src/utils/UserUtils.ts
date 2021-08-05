import { Role, User } from '../types'

const hasRole = (user: User, role: Role) => {
  return user?.roles?.includes(role)
}

export { hasRole }
