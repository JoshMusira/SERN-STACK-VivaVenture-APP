import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { GrUpdate } from 'react-icons/gr';
import { AiFillDelete } from 'react-icons/ai';
import { CirclesWithBar } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Image } from 'react-bootstrap';
import { apiDomain } from '../../../utils/utilsDomain';
import { Context } from '../../../context/userContext/Context';
import AddProduct from '../addProduct/AddProduct';

const ProductTable = ({ setOpen, open }) => {
    const { user } = useContext(Context);
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deleteTrigger, setDeleteTrigger] = useState(false); // State to trigger re-fetching after delete
    const [id, setId] = useState('')
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${apiDomain}/product`);

            const rowsWithId = response.data.map((row, index) => ({
                id: row.product_id, // Assign product_id as the unique id
                product_id: row.product_id,
                name: row.name,
                description: row.description,
                price: row.price,
                image_url: row.image_url,
                inventory_count: row.inventory_count,
                category: row.category,
                storage: row.storage,
                ram: row.ram,
            }));

            setRows(rowsWithId);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [deleteTrigger]); // Add deleteTrigger to the dependency array

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiDomain}/product/${id}`, {
                headers: { Authorization: `${user.token}` },
            });

            // Trigger re-fetching by updating the deleteTrigger state
            setDeleteTrigger((prevTrigger) => !prevTrigger);

            toast.success('Product deleted successfully');
        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        { field: 'product_id', headerName: 'Product ID', width: 90 },
        {
            field: 'image_url',
            headerName: 'Image',
            width: 100,
            renderCell: (params) => (
                <Image src={params.value} alt="Product Image" thumbnail />
            ),
        },
        { field: 'name', headerName: 'Name', width: 150, editable: false },
        { field: 'description', headerName: 'Description', width: 250, editable: false },
        { field: 'price', headerName: 'Price', width: 150, editable: false },
        { field: 'inventory_count', headerName: 'Inventory Count', width: 150, editable: false },
        { field: 'category', headerName: 'Category', width: 150, editable: false },
        { field: 'storage', headerName: 'Storage', width: 150, editable: false },
        { field: 'ram', headerName: 'RAM', width: 150, editable: false },
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
                    ariaLabel="circles-with-bar-loading"
                />
            ) : (
                <div>
                    <DataGrid
                        rows={rows}
                        className="dataGrid"
                        columns={columns}
                        pageSize={5}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 7,
                                },
                            },
                        }}
                        checkboxSelection
                        disableRowSelectionOnClick
                    />
                </div>
            )}
            <ToastContainer />
            {
                open && <AddProduct setOpen={setOpen} />
            }
        </>
    );
};

export default ProductTable;
