import React from 'react'
import { useContext } from 'react'
import { Context } from '../context/AdminContext/Context';
import User from '../pages/user/User'
import Product from '../pages/products/Product'
import Mails from '../pages/mails/Mails'
import Report from '../pages/reports/Report'
import Dashboard from '../pages/dashboard/Dashboard'

const AdminContainer = ({ addToCart }) => {
    const { ui } = useContext(Context);
    // console.log(ui)

    return (
        <>
            <section className='homeSlide contentWidth'>
                <div className='container'>
                    {
                        ui == "Users" ? (
                            <User />
                        ) : ui == "Products" ? (
                            <Product />
                        ) : ui == "Mails" ? (
                            <Mails />
                        ) : ui == "Reports" ? (
                            <Report />
                        ) : (
                            <Dashboard />
                        )

                    }
                </div>
            </section>
        </>
    )
}

export default AdminContainer