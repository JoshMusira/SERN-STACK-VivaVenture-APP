import React from 'react'
import Home from '../components/mainpage/Home'
import FlashDeals from '../components/flashDeals/FlashDeals'
import Wrapper from '../components/wrapper/Wrapper'
import Login from './login/Login'

const Pages = ({ productItems, addToCart, CartItem, }) => {
    return (
        <>
            <Home CartItem={CartItem} addToCart={addToCart} />
            <FlashDeals productItems={productItems} addToCart={addToCart} />
            <Login />
            <Wrapper />

        </>
    )
}

export default Pages