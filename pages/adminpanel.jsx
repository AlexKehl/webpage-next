import AdminPanel from '../components/AdminPanel'
import WithHeader from '../components/WithHeader'

export const AdminPanelPage = () => (
  <div className="container">
    <AdminPanel />
  </div>
)

export default WithHeader(AdminPanelPage)
