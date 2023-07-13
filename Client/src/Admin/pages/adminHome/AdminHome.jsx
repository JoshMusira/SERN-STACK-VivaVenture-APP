import React from 'react'
import Sidebar from '../../components/Sidebar'
import AdminContainer from '../../components/AdminContainer'
import './adminhome.css'
const AdminHome = () => {
    return (
        <div className='adminContainer'>
            <Sidebar />
            <AdminContainer />
        </div>
    )
}

export default AdminHome