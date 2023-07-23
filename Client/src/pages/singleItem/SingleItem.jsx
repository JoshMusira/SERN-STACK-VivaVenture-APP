import React, { useEffect, useState } from 'react'
import './singleItem.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { apiDomain } from '../../utils/utilsDomain'
import { BsArrow90DegLeft } from 'react-icons/bs'

const SingleItem = ({ addToCart }) => {
    const navigate = useNavigate()
    const id = JSON.parse(localStorage.getItem('id'))
    const [product, setProductItem] = useState([])
    // console.log(id);

    const HandleHome = () => {
        navigate('/')
    }
    const getSingleProducts = async () => {
        const res = await axios.get(`${apiDomain}/products/${id}`);
        setProductItem(res.data);
    };

    useEffect(() => {
        getSingleProducts();
    }, []);


    return (

        <div className="Single-product">
            {
                product && product.map((items, index) => (
                    <div className="mainSingle" key={index}>
                        <div className="mainContainer2">
                            <div className="leftSingleImage">
                                <img src={items.image_url} alt="" />
                            </div>
                            <div className="rightSingleImage">
                                <div className="official"><p>Official Store</p><p>💓</p></div>
                                <div className="names">
                                    <h2>{items.name}</h2>
                                    <h3><span>Brand: </span>{items.category}</h3>
                                </div>
                                <div className="decr">
                                    <p> <span>Description: </span>{items.description}</p>
                                    <div className="storage">
                                        <p><span>Storage: </span>{items.storage}GB</p>
                                        <p><span>Ram: </span> {items.ram}GB</p>
                                    </div>
                                    <div className="subDesc">
                                        <h2>KSH. {items.price}</h2>
                                        <h3>KSH. {items.price + 3550}</h3>
                                        <span>-25%{items.discount}</span>
                                    </div>
                                </div>
                                <div className="flashDeals">
                                    <p>  <i className='fa fa-bolt'></i> Flash Sales</p>
                                    <p className='time2'>Starts on: 30 Jul, 9:00am</p>
                                </div>
                                <p className='total'>Instock</p>
                                <div className='custom-rate'>
                                    <i className='fa fa-star'></i>
                                    <i className='fa fa-star'></i>
                                    <i className='fa fa-star'></i>
                                    <i className='fa fa-star'></i>
                                    <i className='fa fa-star'></i>
                                    <span>  (126 Verified Ratings)</span>
                                </div>
                                <div className="cart2">
                                    <button onClick={() => addToCart(items)} className="addToCart">Add to Cart</button>
                                    <button className='backHome' onClick={HandleHome}><BsArrow90DegLeft /> Back home</button>
                                </div>

                            </div>

                        </div>
                    </div>
                ))
            }

        </div>

    )
}

export default SingleItem