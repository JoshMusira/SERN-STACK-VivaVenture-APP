import React from 'react'
import Categories from './Categories'
// import SliderCard from './SliderCard'
import './home.css'
import Slider from './Slider'

const Home = ({ addToCart }) => {
    return (
        <>
            <section className='home'>
                <div className='container d_flex'>
                    <Categories />
                    <Slider addToCart={addToCart} />
                </div>
            </section>
        </>
    )
}

export default Home