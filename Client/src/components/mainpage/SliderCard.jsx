import React, { useEffect, useState } from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
// import Sdata from "./Sdata"
// import { Context } from '../../context/userContext/Context'
import axios from 'axios'
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

                        <div className='box d_flex top' key={index}>
                            <div className='left'>
                                <h1>{value.name}</h1>
                                <p>{value.description}</p>
                                <button className='btn-primary'>Visit Collections</button>
                            </div>
                            <div className='right'>
                                <img src={value.image_url} alt='' />
                            </div>
                        </div>

                    )
                })}
            </Slider>
        </>
    )
}

export default SliderCard