import About from '../components/About'
import WithHeader from '../components/WithHeader'

export const AboutPage = () => (
  <div className="container">
    <About />
  </div>
)

export default WithHeader(AboutPage)
