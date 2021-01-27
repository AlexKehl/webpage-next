import About from '../components/About'
import WithHeader from '../components/WithHeader'
import WithAuth from '../components/WithAuth'

export const AboutPage = () => (
  <div className="container">
    <About />
  </div>
)

export const getServerSideProps = WithAuth

export default WithHeader(AboutPage)
