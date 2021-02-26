import { useDispatch, useSelector } from 'react-redux'

import { decrement, increment, selectCount } from '../redux/slices/counterSlice'

const Counter = () => {
  const dispatch = useDispatch()
  const count = useSelector(selectCount)

  const dispatchIncrement = () => {
    dispatch(increment())
  }

  const dispatchDecrement = () => {
    dispatch(decrement())
  }

  return (
    <div className="container">
      <button onClick={dispatchIncrement}>Increment</button>
      <button onClick={dispatchDecrement}>Decrement</button>
      <h1>{count}</h1>
    </div>
  )
}

export default Counter
