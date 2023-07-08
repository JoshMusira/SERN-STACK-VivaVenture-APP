import React from 'react'
import './Header.css'
import Head from './Head'
import Search from './Search'
import Navbar from './Navbar'

const Header = ({ CartItem }) => {
    return (
        <div>
            <Head />
            <Search CartItem={CartItem} />
            <Navbar />
        </div>
    )
}

export default Header