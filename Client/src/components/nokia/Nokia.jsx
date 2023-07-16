import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { apiDomain } from '../../utils/utilsDomain'

const Nokia = ({ addToCart }) => {
    const [productItems, setProductItems] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchProductItems = async () => {
        try {
            const response = await axios.get(`${apiDomain}/product/Nokia`);
            setProductItems(response.data);
            // alert('Nokia successfull')
        } catch (error) {
            console.error('Error fetching product items:', error);
        }
    };

    useEffect(() => {
        fetchProductItems();
    }, []);
    // console.log(productItems);
    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    return (
        <div className="gridContainer">
            {productItems.map((product, index) => (
                <div
                    className="custom-box"
                    key={index}
                    onClick={() => handleProductClick(product)}
                >

                    <div className='custom-product custom-mtop'>
                        <div className='custom-img'>
                            <span className='custom-discount'>{product.discount}% Off</span>
                            <div className='custom-product-like'>
                                <label>0</label>
                                <i className='fa-regular fa-heart' ></i>
                            </div>
                        </div>
                        <div className="img-container">
                            <img src={product.image_url} style={{ width: '100%', height: '100%', backgroundPosition: 'center', objectFit: 'cover' }} alt='' />
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

                    {/* Rest of your code */}
                </div>
            ))}
            {/* Popup for selected product */}
            {selectedProduct && (
                <div className="popup">
                    <div className="popup-content">
                        <div className='custom-product custom-mtop'>
                            <div className='custom-img'>
                                <span className='custom-discount'>{selectedProduct.discount}% Off</span>
                                <div className='custom-product-like'>
                                    <label>0</label>
                                    <i className='fa-regular fa-heart' ></i>
                                </div>
                            </div>
                            <div className="img-container">
                                <img src={selectedProduct.cover} style={{ width: '100%', height: '100%', backgroundPosition: 'center', objectFit: 'cover' }} alt='' />
                            </div>
                            <div className='custom-product-details'>
                                <h3>{selectedProduct.name}</h3>
                                <div className='custom-rate'>
                                    <i className='fa fa-star'></i>
                                    <i className='fa fa-star'></i>
                                    <i className='fa fa-star'></i>
                                    <i className='fa fa-star'></i>
                                    <i className='fa fa-star'></i>
                                </div>
                                <div className='custom-price'>
                                    <h4>${selectedProduct.price}.00</h4>
                                    <button className="close-btn" onClick={() => setSelectedProduct(null)}>
                                        Close
                                    </button>
                                    <button onClick={() => addToCart(selectedProduct)}>
                                        <i className='fa fa-plus'></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Nokia