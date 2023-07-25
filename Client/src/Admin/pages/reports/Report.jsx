import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../context/userContext/Context'
import axios from 'axios'
import { apiDomain } from '../../../utils/utilsDomain'
import { DataGrid } from "@mui/x-data-grid";
import { CirclesWithBar } from 'react-loader-spinner';

const Report = () => {
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const { user } = useContext(Context);
    const [id, setId] = useState("");

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${apiDomain}/transaction`, {
                headers: {
                    Authorization: `${user.token}`,
                },
            });

            const rowsWithId = response.data.map((row) => ({
                id: row.order_id,
                productName: row.productName,
                productID: row.productID,
                quantity: row.quantity,
                totalAmount: row.totalAmount,
                email: row.email,
                date: row.date,
                city: row.city,
                phone: row.phone,

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


    const columns = [
        { field: "id", headerName: "ID", width: 30, },
        { field: "productName", headerName: "Product Name", width: 150 },
        { field: "productID", headerName: "Product ID" },
        { field: "quantity", headerName: "Quantity" },
        { field: "totalAmount", headerName: "Total Amount" },
        { field: "email", headerName: "Email", width: 200, },
        { field: "city", headerName: "City" },
        { field: "date", headerName: "Time", width: 200, },
        { field: "phone", headerName: "Tell NO.", width: 150, },

    ];

    return (
        <div className='users'>
            <h1>Orders</h1>
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

                    <div style={{ height: 300, width: "100%" }}>

                        <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                    </div>
                )}
            </>
        </div>
    )
}

export default Report