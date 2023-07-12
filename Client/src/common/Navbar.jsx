import React, { useContext, useState } from 'react'
import { Link } from "react-router-dom"
import { ContextPhone } from '../context/phoneContext/Context'
import { Context } from '../context/userContext/Context'

const Navbar = () => {
    const { dispatch } = useContext(ContextPhone)
    const { user } = useContext(Context)
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });

    };
    // Toogle Menu
    const [MobileMenu, setMobileMenu] = useState(false)
    const handleDefault = () => {
        dispatch({ type: "default", payload: 'default' })
    }
    return (
        <>
            <header className='header'>
                <div className='container d_flex'>
                    <div className='catgrories d_flex'>
                        <h4>
                            Available Phones
                        </h4>
                    </div>

                    <div className='navlink'>
                        <ul className={MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"} onClick={() => setMobileMenu(false)}>
                            <li>
                                <Link to='/' onClick={handleDefault}>Home</Link>
                            </li>
                            <li>
                                <Link to='/pages'>Need help</Link>
                            </li>
                            {
                                user &&
                                <li>
                                    <Link to='/order'>Track Order</Link>
                                </li>
                            }

                            <li>
                                <Link to='/contact'>Contact</Link>
                            </li>
                            {
                                !user && (
                                    <>
                                        <li>
                                            <Link to='/login'>Login</Link>
                                        </li>
                                        <li>
                                            <Link to='/register'>Register</Link>
                                        </li></>

                                )
                            }



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