import React, { useContext, useState } from "react"
import { IoSettingsOutline } from "react-icons/io5"
import { BsBagCheck } from "react-icons/bs"
import { AiOutlineHeart } from "react-icons/ai"
import { GrHelp } from "react-icons/gr"
import { BiLogOut } from "react-icons/bi"
import { Link } from "react-router-dom"
import './user.css'
import { Context } from '../../context/userContext/Context'
const User = () => {
    const { user, dispatch } = useContext(Context)
    const [profileOpen, setProfileOpen] = useState(false)

    const close = () => {
        setProfileOpen(null)
    }

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });

    };

    return (
        <>
            <div className='profile'>
                {user ? (
                    <>
                        <button className='img' onClick={() => setProfileOpen(!profileOpen)}>
                            <img src='https://cdn-icons-png.flaticon.com/512/2202/2202112.png' alt='' />
                        </button>

                        {profileOpen && (
                            <div className='openProfile boxItems' onClick={close}>
                                <div className='image'>
                                    <Link to='/account'>
                                        <div className='img'>
                                            <img src='https://cdn-icons-png.flaticon.com/512/2202/2202112.png' alt='' />
                                        </div>
                                    </Link>
                                    <div className='text'>
                                        <h4>Hi {user.username}</h4>
                                        <h5>{user.email}</h5>
                                    </div>
                                </div>
                                <Link to='/myaccount'>
                                    <button className='box'>
                                        <IoSettingsOutline className='icon' />
                                        <h4>My Account</h4>
                                    </button>
                                </Link>
                                <Link to='/order'>
                                    <button className='box'>
                                        <BsBagCheck className='icon' />
                                        <h4>My Order</h4>
                                    </button>
                                </Link>
                                <Link to='/inbox'>
                                    <button className='box'>
                                        <AiOutlineHeart className='icon' />
                                        <h4>Inbox</h4>
                                    </button>
                                </Link>
                                <Link to='/settings'>
                                    <button className='box'>
                                        <GrHelp className='icon' />
                                        <h4>Settings</h4>
                                    </button>
                                </Link>
                                <button className='box' onClick={handleLogout}>
                                    <BiLogOut className='icon' />
                                    <h4>Log Out</h4>
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="loginPage">
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                        <li>
                            <Link to='/register'>Register</Link>
                        </li>
                    </div>
                )}
            </div>
        </>
    )
}

export default User