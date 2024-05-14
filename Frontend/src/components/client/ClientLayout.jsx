import { Outlet } from 'react-router-dom'
import Header from './Header/Header'
import Footer from './Footer/Footer'

function ClientLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default ClientLayout
