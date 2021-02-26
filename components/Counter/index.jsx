import { useDispatch, useSelector } from 'react-redux'
import {
  decrement,
  increment,
  selectCount,
} from '../../redux/slices/counterSlice'
import Counter from './Counter'

const CounterContainer = () => {
  const dispatch = useDispatch()
  const count = useSelector(selectCount)

  return (
    <Counter
      count={count}
      increment={() => dispatch(increment())}
      decrement={() => dispatch(decrement())}
    />
  )
}

export default CounterContainer
