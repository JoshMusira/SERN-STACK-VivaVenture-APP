import React, { useContext } from 'react'
import { Context } from '../../../context/userContext/Context'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const { dispatch } = useContext(Context)
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate('/')
    }
    return (
        <div className='main_wrapper_container'>
            <h2>Dashboard</h2>
            <h3 onClick={handleLogout}>LOGOUT</h3>
        </div>
    )
}

export default Dashboard