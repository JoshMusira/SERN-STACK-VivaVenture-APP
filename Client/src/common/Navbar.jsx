import React, { useState } from 'react'
import { Link } from "react-router-dom"
const Navbar = () => {
    // Toogle Menu
    const [MobileMenu, setMobileMenu] = useState(false)
    return (
        <>
            <header className='header'>
                <div className='container d_flex'>
                    <div className='catgrories d_flex'>
                        <span class='fa-solid fa-border-all'></span>
                        <h4>
                            Categories
                        </h4>
                    </div>

                    <div className='navlink'>
                        <ul className={MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"} onClick={() => setMobileMenu(false)}>
                            {/*<ul className='link f_flex uppercase {MobileMenu ? "nav-links-MobileMenu" : "nav-links"} onClick={() => setMobileMenu(false)}'>*/}
                            <li>
                                <Link to='/'>Home</Link>
                            </li>
                            <li>
                                <Link to='/pages'>Need help</Link>
                            </li>
                            <li>
                                <Link to='/user'>Track Order</Link>
                            </li>
                            <li>
                                <Link to='/contact'>Contact</Link>
                            </li>
                        </ul>

                        <button className='toggle' onClick={() => setMobileMenu(!MobileMenu)}>
                            {MobileMenu ? <i className='fas fa-times close home-btn'></i> : <i className='fas fa-bars open'></i>}
                        </button>
                    </div>
                </div>
            </header>
        </>

    )
}

export default Navbar