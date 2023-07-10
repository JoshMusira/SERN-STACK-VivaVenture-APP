import React from 'react'
import { Link } from 'react-router-dom'

const Head = () => {
    return (
        <>
            <section className='head'>
                <div className='container d_flex'>
                    <div className='left row'>
                        <i className='fa fa-phone'></i>
                        <label> +25411 177 9815</label>
                        <i className='fa fa-envelope'></i>
                        <label> support@vivaVenture.com</label>
                    </div>
                    <div className='right row RText'>
                        <label>Theme FAQ"s</label>
                        <label>More about us?</label>
                        <label> <Link to='/login'>Login</Link></label>
                        <label> <Link to='/register'>Register</Link></label>
                        <span>🏳️</span>
                        <label>KEN</label>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Head