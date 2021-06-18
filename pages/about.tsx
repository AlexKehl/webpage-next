import About from '../src/components/About'
import WithHeader from '../src/components/WithHeader'

export const AboutPage = () => (
  <div className="container">
    <About />
  </div>
)

export default WithHeader(AboutPage)
