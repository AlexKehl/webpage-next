import WithHeader from '../src/components/HOC/WithHeader'
import Stepper from '../src/components/Payments/Stepper'
import useUser from '../src/lib/hooks/useUser'

const PaymentsPage = () => {
  const { user } = useUser()
  return <Stepper user={user} />
}

export default WithHeader(PaymentsPage)
