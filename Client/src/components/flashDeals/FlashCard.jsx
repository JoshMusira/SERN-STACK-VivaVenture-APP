import React, { useState } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Link } from "react-router-dom"

const NextArrow = (props) => {
    const { onClick } = props
    return (
        <div className='control-btn' onClick={onClick}>
            <button className='next'>
                <i className='fa fa-long-arrow-alt-right'></i>
            </button>
        </div>
    )
}
const PrevArrow = (props) => {
    const { onClick } = props
    return (
        <div className='control-btn' onClick={onClick}>
            <button className='prev'>
                <i className='fa fa-long-arrow-alt-left'></i>
            </button>
        </div>
    )
}

const FlashCard = ({ productItems, addToCart }) => {
    const [count, setCount] = useState(0)
    const increment = () => {
        setCount(count + 1)
    }
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    }

    return (
        <>
            <Slider {...settings}>
                {productItems.map((productItems, index) => {
                    return (
                        <Link to='/singleItem' >
                            <div key={index}
                                onClick={() => JSON.stringify(localStorage.setItem("id", productItems.product_id))}
                            >
                                <div className=' product mtop'>
                                    <div className='img'>
                                        <span className='discount'>{productItems.discount}% Off</span>
                                        <img src={productItems.image_url} alt='' />
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
                        </Link>
                    )
                })}
            </Slider>


        </>
    )
}

export default FlashCard