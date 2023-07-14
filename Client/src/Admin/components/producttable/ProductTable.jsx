import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { GrUpdate } from 'react-icons/gr';
import { AiFillDelete } from 'react-icons/ai';

const ProductTable = () => {
    const [rows, setRows] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8081/product');

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
                rom: row.rom,
                ram: row.ram,
            }));

            setRows(rowsWithId);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = (id) => {
        // Handle delete functionality here
        alert('Delete product with ID: ' + id);
    };

    const columns = [
        { field: 'product_id', headerName: 'Product ID', width: 90 },
        { field: 'image_url', headerName: 'Image URL', width: 150, editable: true },
        { field: 'name', headerName: 'Name', width: 150, editable: true },
        { field: 'description', headerName: 'Description', width: 250, editable: true },
        { field: 'price', headerName: 'Price', width: 150, editable: true },
        { field: 'inventory_count', headerName: 'Inventory Count', width: 150, editable: true },
        { field: 'category', headerName: 'Category', width: 150, editable: true },
        { field: 'storage', headerName: 'Storage', width: 150, editable: true },
        { field: 'rom', headerName: 'ROM', width: 150, editable: true },
        { field: 'ram', headerName: 'RAM', width: 150, editable: true },
        {
            field: 'Update',
            headerName: 'Update',
            width: 100,
            renderCell: (params) => (
                <GrUpdate
                    onClick={() => handleUpdate(params.getValue('product_id'))}
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
                    onClick={() => handleDelete(params.getValue('product_id'))}
                    style={{ cursor: 'pointer' }}
                />
            ),
        },
    ];

    return (
        <div>
            <DataGrid
                rows={rows}
                className='dataGrid'
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </div>
    );
};

export default ProductTable;
