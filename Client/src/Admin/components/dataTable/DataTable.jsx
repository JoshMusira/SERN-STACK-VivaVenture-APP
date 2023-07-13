import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Context } from '../../../context/userContext/Context';
import './datatable.css'

const DataTable = () => {
    const [rows, setRows] = useState([]);
    const { user } = useContext(Context);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8081/user', {
                headers: {
                    Authorization: `${user.token}`,
                },
            });

            const rowsWithId = response.data.map((row) => ({
                id: row.user_id,
                username: row.username,
                email: row.email,
                role: row.role,
            }));

            setRows(rowsWithId);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'username',
            headerName: 'Username',
            width: 150,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 250,
            editable: true,
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 150,
            editable: true,
        },
    ];

    return (
        <div className='dataTable'>
            <span className="jo">Joshua</span>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }
                }
                checkboxSelection
                disableRowSelectionOnClick
            />
        </div>
    );
};

export default DataTable;
