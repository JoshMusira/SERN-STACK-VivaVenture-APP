import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from '../../context/userContext/Context';
import { apiDomain } from '../../utils/utilsDomain';

const MyAccount = () => {
    const [productItems, setProductItems] = useState([]);
    const { user } = useContext(Context);
    // const product = productItems.recordset[0];


    const fetchProductItems = async () => {
        try {
            const response = await axios.get(`${apiDomain}/product`, {
                headers: { Authorization: `${user.token}` }
            });
            setProductItems(response.data);
        } catch (error) {
            console.error('Error fetching product items:', error);
        }
    };

    useEffect(() => {
        fetchProductItems();
    }, []);

    // console.log(product);
    return (
        <div>
            <button onClick={fetchProductItems}>My Account</button>
            Display the fetched product items
            {productItems.map((product) => (
                <div key={product.id}>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default MyAccount;
