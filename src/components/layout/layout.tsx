import Footer from '../footer/footer'
import Navbar from '../navbar/navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
            <div className="flex-grow">
                <Outlet />
            </div>
        <Footer />
      </div>
    )
}

export default Layout
  