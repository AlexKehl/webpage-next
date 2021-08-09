import { Role } from '../../../common/interface/Constants'
import { User } from '../../../common/interface/ConsumerResponses'

const hasRole = (user: User, role: Role) => {
  return user?.roles?.includes(role)
}

export { hasRole }
