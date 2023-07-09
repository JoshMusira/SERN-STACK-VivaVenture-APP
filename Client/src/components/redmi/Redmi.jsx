import React from 'react'
import productItem from './Sdata'
const Redmi = ({ addToCart }) => {
    const productItems = productItem.shopItems
    return (
        <>
            {productItems.map((productItems, index) => {
                return (
                    <div className='box' key={index}>
                        <div className='product mtop'>
                            <div className='img'>
                                <span className='discount'>{productItems.discount}% Off</span>
                                <img src={productItems.cover} alt='' />
                                <div className='product-like'>
                                    <label>0</label> <br />
                                    <i className='fa-regular fa-heart' ></i>
                                </div>
                            </div>
                            <div className='product-details'>
                                <h3>{productItems.name}</h3>
                                <div className='rate'>
                                    <i className='fa fa-star'></i>
                                    <i className='fa fa-star'></i>
                                    <i className='fa fa-star'></i>
                                    <i className='fa fa-star'></i>
                                    <i className='fa fa-star'></i>
                                </div>
                                <div className='price'>
                                    <h4>${productItems.price}.00 </h4>
                                    {/* step : 3  
                                    if hami le button ma click garryo bahne 
                                    */}
                                    <button onClick={() => addToCart(productItems)}>
                                        <i className='fa fa-plus'></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}

        </>
    )
}

export default Redmi