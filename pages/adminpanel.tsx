import WithHeader from '../src/components/WithHeader'
import AdminPanel from '../src/components/AdminPanel'

export const AdminPanelPage = () => (
  <div className="container">
    <AdminPanel />
  </div>
)

export default WithHeader(AdminPanelPage)
