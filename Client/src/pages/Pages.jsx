import React from 'react'
import Home from '../components/mainpage/Home'
import FlashDeals from '../components/flashDeals/FlashDeals'

const Pages = ({ productItems, addToCart, CartItem, }) => {
    return (
        <>
            <Home CartItem={CartItem} />
            <FlashDeals productItems={productItems} addToCart={addToCart} />
        </>
    )
}

export default Pages