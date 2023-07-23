import React, { useContext, useState } from "react"
import { IoSettingsOutline } from "react-icons/io5"
import { BsBagCheck } from "react-icons/bs"
import { AiOutlineHeart } from "react-icons/ai"
import { GrHelp } from "react-icons/gr"
import { BiLogOut } from "react-icons/bi"
import { Link, useNavigate } from "react-router-dom"
import './user.css'
import { Context } from '../../context/userContext/Context'
import { ContextPhone } from "../../context/phoneContext/Context"

const AdminUser = () => {

    const { user, dispatch } = useContext(Context)
    const [profileOpen, setProfileOpen] = useState(false)
    const { dispatchPhone } = useContext(ContextPhone)
    const navigate = useNavigate();
    const close = () => {
        setProfileOpen(null)
    }

    const handleLogout = () => {
        dispatchPhone({ type: "default", payload: 'default' })

        navigate('/')
        dispatch({ type: "LOGOUT" });

    };

    return (
        <>
            <div className='profile'>

                <>
                    <button className='img' onClick={() => setProfileOpen(!profileOpen)}>
                        <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
                    </button>

                    {profileOpen && (
                        <div className='openProfile boxItems' onClick={close}>
                            <div className='image'>
                                <Link to='/account'>
                                    <div className='img'>
                                        <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
                                    </div>
                                </Link>
                                <div className='text'>
                                    <h4>Hi {user.username}</h4>
                                    <h4>{user.email}</h4>
                                </div>
                            </div>

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



            </div>
        </>
    )
}

export default AdminUser