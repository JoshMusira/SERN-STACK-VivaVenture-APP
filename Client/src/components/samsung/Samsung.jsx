import React, { useEffect, useState } from 'react'
import './styles.css'
import { apiDomain } from '../../utils/utilsDomain';
import axios from 'axios';
import './apple.css'
import { Link } from 'react-router-dom';

const Samsung = ({ addToCart }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productItems, setProductItems] = useState([]);

    const getProducts = async () => {
        const res = await axios.get(`${apiDomain}/product/samsung`);
        setProductItems(res.data);
    };

    useEffect(() => {
        getProducts();
    }, []);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };
    return (

        <Link to='/singleItem' >
            <div className="gridContainer">
                {productItems && productItems.map((product, index) => (
                    <div

                        key={index}
                        onClick={() => JSON.stringify(localStorage.setItem("id", product.product_id))}
                    >
                        <div className="custom-box">
                            <div className='custom-product custom-mtop'>
                                <div className='custom-img'>
                                    <span className='custom-discount'>{product.discount}% Off</span>
                                    <div className='custom-product-like'>
                                        <label>0</label>
                                        <i className='fa-regular fa-heart' ></i>
                                    </div>
                                </div>
                                <div className="img-container">
                                    <img src={product.image_url} style={{ width: '100%', height: '100%', backgroundPosition: 'center' }} alt='' />
                                </div>
                                <div className='custom-product-details'>
                                    <h3>{product.name}</h3>
                                    <div className='custom-rate'>
                                        <i className='fa fa-star'></i>
                                        <i className='fa fa-star'></i>
                                        <i className='fa fa-star'></i>
                                        <i className='fa fa-star'></i>
                                        <i className='fa fa-star'></i>
                                    </div>
                                    <div className='custom-price'>
                                        <h4>${product.price}.00</h4>
                                        <button className="close-btn" onClick={() => setSelectedProduct(null)}>
                                            Show
                                        </button>
                                        <button onClick={() => addToCart(product)}>
                                            <i className='fa fa-plus'></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Rest of your code */}
                    </div>
                ))}

            </div>
        </Link>
    )
}

export default Samsung