import React from 'react';
import './shipping.css'

const ShippingTable = () => {
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Location</th>
                        <th>VivaVenture Express</th>
                        <th>Standard Shipping</th>
                        <th>Shipped From Overseas</th>
                        <th>Kenyan Postal Service</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Nairobi, Kiambu Town, Thika Town, Syokimau/Mlolongo/Athi River</td>
                        <td>1 Day (Mon - Sat)</td>
                        <td>1 - 2 Days (Mon - Sat)</td>
                        <td>7 - 10 Days (Mon - Sat)</td>
                        <td>30 - 32 Days (Mon - Sat)</td>
                    </tr>
                    <tr>
                        <td>Mombasa, Naivasha, Eldoret, Kisumu</td>
                        <td>2 - 3 Days (Mon - Sat)</td>
                        <td>2 - 3 Days (Mon - Sat)</td>
                        <td>8 - 10 Days (Mon - Sat)</td>
                        <td>30 - 32 Days (Mon - Sat)</td>
                    </tr>
                    <tr>
                        <td>Bungoma, Busia, Kilifi, Kisii</td>
                        <td>2 - 4 Days (Mon - Sat)</td>
                        <td>3 - 4 Days (Mon - Sat)</td>
                        <td>8 - 11 Days (Mon - Sat)</td>
                        <td>30 - 32 Days (Mon - Sat)</td>
                    </tr>
                    <tr>
                        <td>Kakamega, Kericho, Siaya, Turkana, Isiolo</td>
                        <td>2 - 4 Days (Mon - Sat)</td>
                        <td>3 - 5 Days (Mon - Sat)</td>
                        <td>8 - 12 Days (Mon - Sat)</td>
                        <td>30 - 32 Days (Mon - Sat)</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ShippingTable;
