import axios from "axios";
import "./widgetSm.css";
import { DataGrid } from "@mui/x-data-grid";
import { apiDomain } from "../../../utils/utilsDomain";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../context/userContext/Context";
import { CirclesWithBar } from 'react-loader-spinner';

export default function Transaction() {
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
                totalAmount: row.totalAmount,
                email: row.email,
                phone: row.phone,
                date: row.date,
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
        { field: "id", headerName: "ID", width: 30 },
        { field: "totalAmount", headerName: "Total Amount" },
        { field: "email", headerName: "Email" },
        { field: "phone", headerName: "Tell NO." },
        { field: "date", headerName: "Time" },
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

                <div style={{ height: 300, width: "50%" }}>
                    <h3 className="dashboadNmaes">Latest Transaction</h3>
                    <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                </div>
            )}

        </>
    );
}
