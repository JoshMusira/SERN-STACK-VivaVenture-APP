import React, { useState } from 'react'
import { useContext } from 'react';
import { ContextPhone } from '../../context/phoneContext/Context';
import appleImage from '../../../public/images/category/cat-1.png'
import samsungImage from '../../../public/images/category/cat-2.png'
import OppoImage from '../../../public/images/category/cat-1.png'
import redmiImage from '../../../public/images/category/cat-1.png'
import nokiaImage from '../../../public/images/category/cat-2.png'
import { Link } from 'react-router-dom';
import { Axios } from 'axios';
import { apiDomain } from '../../utils/utilsDomain';
import { Context } from '../../context/userContext/Context'

const Categories = () => {

    const { dispatch } = useContext(ContextPhone);
    const { user } = useContext(Context)
    const [productItems, setProductItems] = useState([]);


    const handleApple = () => {
        dispatch({ type: "Apple", payload: 'Apple' })
    }
    const handleSamsung = () => {
        dispatch({ type: "Samsung", payload: 'samsung' })
    }
    const handleNokia = () => {
        dispatch({ type: "Nokia", payload: 'Nokia' })
    }
    const handleRedmi = () => {
        dispatch({ type: "Redmi", payload: 'Redmi' })
    }
    const handleOppo = () => {
        dispatch({ type: "Oppo", payload: 'Oppo' })
    }


    return (

        <>
            <div className='category'>
                <div className='chead d_flex'>
                    <h1>Brands </h1>
                    <h1>Shops </h1>
                </div>
                {/* <Link to='/apple'> */}
                < div className='box f_flex' onClick={handleApple}>
                    <img src={appleImage} alt='' />
                    <span>Apple</span>
                </div>

                <div className='box f_flex' onClick={handleSamsung}>
                    <img src={samsungImage} alt='' />
                    <span>Samsung</span>
                </div>
                <div className='box f_flex' onClick={handleOppo}>
                    <img src={OppoImage} alt='' />
                    <span>Oppo</span>
                </div>
                <div className='box f_flex' onClick={handleNokia}>
                    <img src={nokiaImage} alt='' />
                    <span>Nokia</span>
                </div>
                <div className='box f_flex' onClick={handleRedmi}>
                    <img src={redmiImage} alt='' />
                    <span>Redmi</span>
                </div>


            </div >
        </>
    )
}

export default Categories