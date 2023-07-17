import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Context } from '../../../context/userContext/Context';
import './datatable.css';
import { GrUpdate } from 'react-icons/gr';
import { AiFillDelete } from 'react-icons/ai';
import { apiDomain } from '../../../utils/utilsDomain';
import { CirclesWithBar } from 'react-loader-spinner';
import Add from '../add/Add';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DataTable = ({ setOpen, open }) => {
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const { user } = useContext(Context);
    const [id, setId] = useState("");
    // const [selectedUser, setSelectedUser] = useState([]); // State to store the selected user data
    console.log(id);
    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${apiDomain}/user`, {
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
            setIsLoading(false); // Set loading state to false after data is fetched
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);


    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiDomain}/user/${id}`, {
                headers: { Authorization: `${user.token}` },
            });

            // Remove the deleted user from the rows state
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));

            toast.success('User deleted successfully', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'username', headerName: 'Username', width: 150, editable: false },
        { field: 'email', headerName: 'Email', width: 250, editable: false },
        { field: 'role', headerName: 'Role', width: 150, editable: false },
        {
            field: 'Update',
            headerName: 'Update',
            width: 100,
            renderCell: (params) => (
                <GrUpdate
                    onClick={() => { setId(params.row.id); setOpen(true); JSON.stringify(localStorage.setItem("id", params.row.id)) }}
                    style={{ cursor: 'pointer' }}
                />
            ),
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 100,
            renderCell: (params) => (
                <AiFillDelete
                    onClick={() => handleDelete(params.row.id)}
                    style={{ cursor: 'pointer' }}
                />
            ),
        },
    ];

    return (
        <>
            {isLoading ? (
                <div className="loader-container">
                    <CirclesWithBar
                        height="100"
                        width="100"
                        color="teal"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        outerCircleColor=""
                        innerCircleColor="gray"
                        barColor="gray"
                        ariaLabel='circles-with-bar-loading'
                    />
                </div>
            ) : (
                <div className="dataTable">
                    <DataGrid
                        rows={rows}
                        className="dataGrid"
                        columns={columns}
                        pageSize={5}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        checkboxSelection
                        disableRowSelectionOnClick
                    />
                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />

                </div>
            )}
            {/* Pass the selected user data to the editing component */}
            {
                open && <Add setOpen={setOpen} />
            }
        </>
    );
};

export default DataTable;
