import React from 'react'
import DataTable from '../../components/dataTable/DataTable'

const User = () => {
    return (
        <div className='users'>
            <h1>Users</h1>
            <button>Add New User</button>
            <DataTable />
        </div>
    )
}

export default User