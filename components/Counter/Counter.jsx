const Counter = ({ count, increment, decrement }) => (
  <div className="container">
    <button onClick={increment}>Increment</button>
    <button onClick={decrement}>Decrement</button>
    <h1>{count}</h1>
  </div>
)

export default Counter
