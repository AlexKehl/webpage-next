import WithHeader from '../src/components/HOC/WithHeader'
import Stepper from '../src/components/Payments/Stepper'

const PaymentsPage = () => {
  return <Stepper />
}

export default WithHeader(PaymentsPage)
