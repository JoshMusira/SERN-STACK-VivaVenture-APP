import React, { useContext, useEffect, useState } from 'react'
import axios, { Axios } from 'axios'
import './styles.css'
import { Context } from '../../context/userContext/Context';
import { apiDomain } from '../../utils/utilsDomain';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CirclesWithBar } from 'react-loader-spinner';

const TrackOrder = () => {
    const [order, setOrder] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const { user } = useContext(Context);
    // const [id, setId] = useState("");
    const id = user.id
    const fetchOrder = async () => {
        try {
            const response = await axios.get(`${apiDomain}/transaction/${id}`, {
                headers: {
                    Authorization: `${user.token}`,
                },
            });

            setOrder(response.data);
            setIsLoading(false); // Set loading state to false after data is fetched
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, []);
    console.log(order);


    const handleCancelOrder = async (order_id) => {
        try {
            await axios.delete(`${apiDomain}/transaction/${order_id}`, {
                headers: { Authorization: `${user.token}` },
            });

            // Remove the deleted user from the rows state
            setOrder((prevRows) => prevRows.filter((order) => order.order_id !== order_id));

            toast.success(' Order Cancelled successfully', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            // alert("Order Cancelled successfully")
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="OrderContainter">

                <div className="topTitle">
                    <h3>Order Tracker</h3>
                </div>

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
                    <div className="order">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>OrderID</th>
                                    <th>Email</th>
                                    <th>Product</th>
                                    <th>Order Status</th>
                                    <th>Cancel Order</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order && order.map((item) => (
                                    <tr key={item.order_id}>
                                        <td>{item.order_id}</td>
                                        <td>{item.email}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.status}</td>
                                        <td>
                                            <button onClick={() => handleCancelOrder(item.order_id)}>Cancel</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
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

        </>
    )
}

export default TrackOrder