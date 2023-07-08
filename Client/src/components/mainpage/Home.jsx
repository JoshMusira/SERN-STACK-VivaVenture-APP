import React from 'react'
import Categories from './Categories'
// import SliderCard from './SliderCard'
import './home.css'
import Slider from './Slider'

const Home = () => {
    return (
        <>
            <section className='home'>
                <div className='container d_flex'>
                    <Categories />
                    <Slider />
                </div>
            </section>
        </>
    )
}

export default Home