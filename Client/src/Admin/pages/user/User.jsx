import React, { useState } from 'react'
import DataTable from '../../components/dataTable/DataTable'
import Add from '../../components/add/Add';
import './user.css'

const User = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className='users'>
            <h1>Users</h1>
            <button onClick={() => setOpen(true)}>Add New User</button>
            <DataTable setOpen={setOpen} />
            {open && <Add setOpen={setOpen} open={open} />}
        </div>
        // slug="user" columns={columns}
    )
}

export default User