import React, { useState } from "react"
import { IoSettingsOutline } from "react-icons/io5"
import { BsBagCheck } from "react-icons/bs"
import { AiOutlineHeart } from "react-icons/ai"
import { GrHelp } from "react-icons/gr"
import { BiLogOut } from "react-icons/bi"
import { Link } from "react-router-dom"
import './user.css'

const User = () => {
    const user = true
    const [profileOpen, setProfileOpen] = useState(false)

    const close = () => {
        setProfileOpen(null)
    }
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
                                        <h4>Eden Smith</h4>
                                        <label htmlFor=''>Los Angeles,CA</label>
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
                                <button className='box'>
                                    <BiLogOut className='icon' />
                                    <h4>Log Out</h4>
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <button>My Account</button>
                )}
            </div>
        </>
    )
}

export default User