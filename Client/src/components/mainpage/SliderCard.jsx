import React, { useEffect, useState } from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import axios from 'axios'
import pic from '../../../public/images/flash/flash-1.png'
import { apiDomain } from '../../utils/utilsDomain'

const SliderCard = () => {

    // const { user } = useContext(Context);
    const [productItems, setProductItems] = useState([]);

    const getProducts = async () => {
        const res = await axios.get(`${apiDomain}/product`);
        setProductItems(res.data);
    };

    useEffect(() => {
        getProducts();
    }, []);
    // console.log(productItems);

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        appendDots: (dots) => {
            return <ul style={{ margin: "0px" }}>{dots}</ul>
        },
    }
    return (
        <>
            <Slider {...settings}>
                {productItems.map((value, index) => {
                    return (

                        <div className='sliding-container' key={index}>
                            <div className='left-content'>
                                <h1>{value.name}</h1>
                                <p>{value.description}</p>
                                <div className="div">

                                    <img src={value.image_url} alt='' />
                                </div>

                            </div>
                            <div className='right-content'>
                                <button className='btn-primary'>Visit Collections</button>


                            </div>

                        </div>

                    )
                })}
            </Slider>
        </>
    )
}

export default SliderCard