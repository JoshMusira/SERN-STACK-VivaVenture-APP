import React from 'react'
import { Axios } from 'axios'
import './styles.css'

const TrackOrder = () => {
    // Example data for the table
    const [tableData, setTableData] = React.useState([
        { orderId: 1, email: 'jane@example.com', product: 'Phone', orderStatus: 'Shipped' },
        { orderId: 2, email: 'jane@example.com', product: 'Laptop', orderStatus: 'Processing' },
        { orderId: 3, email: 'jane@example.com', product: 'Headphones', orderStatus: 'Delivered' },
        { orderId: 4, email: 'jane@example.com', product: 'Camera', orderStatus: 'Cancelled' },
    ]);

    const handleCancelOrder = async (orderId) => {
        try {
            // Make an API request to cancel the order with the given orderId
            // Replace the API endpoint with your actual endpoint for canceling an order

            const response = await Axios.patch(`/api/orders/${orderId}`, { orderStatus: 'Cancelled' });

            if (response.status === 200) {
                // If the API request is successful, update the order status in the tableData state
                const updatedTableData = tableData.map((item) => {
                    if (item.orderId === orderId) {
                        return { ...item, orderStatus: 'Cancelled' };
                    }
                    return item;
                });
                setTableData(updatedTableData);
                console.log('Order cancelled successfully!');
            } else {
                console.error('Failed to cancel the order');
            }
        } catch (error) {
            console.error('An error occurred while cancelling the order:', error);
        }
    };

    return (
        <>
            <div className="OrderContainter">

                <div className="topTitle">
                    <h3>Order Tracker</h3>
                </div>
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
                            {tableData.map((item) => (
                                <tr key={item.orderId}>
                                    <td>{item.orderId}</td>
                                    <td>{item.email}</td>
                                    <td>{item.product}</td>
                                    <td>{item.orderStatus}</td>
                                    <td>
                                        <button onClick={() => handleCancelOrder(item.orderId)}>Cancel</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}

export default TrackOrder