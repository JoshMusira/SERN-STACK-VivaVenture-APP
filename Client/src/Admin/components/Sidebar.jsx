import React, { useContext, useState } from 'react';
import './sidebar.css'
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { Context } from '../../Admin/context/AdminContext/Context';

const Sidebar = ({ children }) => {
    const { dispatch } = useContext(Context)
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);

    const handleDashboard = () => {
        dispatch({ type: "Dashboard", payload: 'Dashboard' })
    }
    const handleUsers = () => {
        dispatch({ type: "Users", payload: 'Users' })
    }
    const handleProducts = () => {
        dispatch({ type: "Products", payload: 'Products' })
    }
    const handleMails = () => {
        dispatch({ type: "Mails", payload: 'Mails' })
    }
    const handleOrders = () => {
        dispatch({ type: "Reports", payload: 'Reports' })
    }

    return (
        <div className="containerv">
            <div style={{ width: isOpen ? "300px" : "50px" }} className="sidebar2">
                <div className="top_section">
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="logo2">VivaVenture</h1>
                    <div style={{ marginLeft: isOpen ? "40px" : "0px" }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>

                <div className="link2" id="active2" onClick={handleDashboard}>
                    <div className="icon2"><FaTh /></div>
                    <div style={{ display: isOpen ? "block" : "none" }} className="link_text2">Dashboard</div>
                </div>
                <div className="link2" id="active2" onClick={handleOrders}>
                    <div className="icon2"><FaShoppingBag /></div>
                    <div style={{ display: isOpen ? "block" : "none" }} className="link_text2">Orders</div>
                </div>
                <div className="link2" id="active2" onClick={handleUsers}>
                    <div className="icon2"><FaUserAlt /></div>
                    <div style={{ display: isOpen ? "block" : "none" }} className="link_text2">Users</div>
                </div>
                <div className="link2" id="active2" onClick={handleProducts}>
                    <div className="icon2"><FaRegChartBar /></div>
                    <div style={{ display: isOpen ? "block" : "none" }} className="link_text2">Products</div>
                </div>
                <div className="link2" id="active2" onClick={handleMails}>
                    <div className="icon2"><FaCommentAlt /></div>
                    <div style={{ display: isOpen ? "block" : "none" }} className="link_text2">Mails</div>
                </div>


            </div>
        </div>
    );
};

export default Sidebar;