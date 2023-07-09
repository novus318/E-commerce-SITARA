import './AdminDashboard.css'
import Logo from '../../assets/images/logo.png'
import React from 'react'
import MenuSidebar from './Sidebar'
import { Link } from 'react-router-dom'
function AdminDashboard() {
  
  return (
    <>
      <div className="d-flex">
        <MenuSidebar/>
    <div className="m-auto text-center">
    <Link to ='/'><img className='log' src={Logo}alt='logo'/></Link>


    </div>
    </div>
    </>
  )
}

export default AdminDashboard
