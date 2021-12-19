import { Endpoints } from '../../common/constants/Endpoints'
import HttpStatus from '../../common/constants/HttpStatus'
import { ValueOf } from '../../common/types'

export const fulfilledQuery = ({
  endpoint,
  payload,
}: {
  endpoint: keyof typeof Endpoints
  payload: Record<string, any>
}) => {
  return {
    type: 'api/executeQuery/fulfilled',
    payload,
    meta: {
      arg: {
        endpointName: endpoint,
      },
    },
  }
}

export const fulfilledMutation = ({
  endpoint,
  payload,
}: {
  endpoint: keyof typeof Endpoints
  payload?: Record<string, any>
}) => {
  return {
    type: 'api/executeMutation/fulfilled',
    payload,
    meta: {
      arg: {
        endpointName: endpoint,
      },
    },
  }
}

export const rejectedMutation = ({
  endpoint,
  payload,
}: {
  endpoint: keyof typeof Endpoints
  payload?: {
    status: ValueOf<typeof HttpStatus>
    data?: Record<string, any>
  }
}) => {
  return {
    type: 'api/executeMutation/rejected',
    payload,
    meta: {
      arg: {
        endpointName: endpoint,
      },
    },
  }
}
