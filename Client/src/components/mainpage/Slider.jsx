import React from 'react'
import SliderCard from './SliderCard'
import { ContextPhone } from '../../context/phoneContext/Context'
import { useContext } from 'react'
import Apple from '../apple/Apple'
import Samsung from '../samsung/Samsung'
import Nokia from '../nokia/Nokia'
import Redmi from '../redmi/Redmi'
import Oppo from '../oppo/Oppo'


const Slider = ({ addToCart }) => {
    const { ui } = useContext(ContextPhone);
    // console.log(ui)

    return (
        <>
            <section className='homeSlide contentWidth'>
                <div className='container'>
                    {
                        ui == "Apple" ? (
                            <Apple addToCart={addToCart} />
                        ) : ui == "samsung" ? (
                            <Samsung addToCart={addToCart} />
                        ) : ui == "Nokia" ? (
                            <Nokia addToCart={addToCart} />
                        ) : ui == "Redmi" ? (
                            <Redmi addToCart={addToCart} />
                        ) : ui == "Oppo" ? (
                            <Oppo addToCart={addToCart} />
                        ) : ui == "default" ? (
                            <SliderCard />
                        ) : null

                    }
                </div>
            </section>
        </>
    )
}

export default Slider