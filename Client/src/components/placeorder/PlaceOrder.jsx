import React from 'react'

const PlaceOrder = () => {
    return (
        <div className="main-help">
            <div className="video">
                <iframe
                    width="100%"
                    height="100%"
                    className='youtube'
                    src="https://www.youtube.com/embed/D8bAzaXKMGQ"
                    title="YouTube video"
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            <div className="side-help">
                <h4>To place an order follow the steps below</h4>
                <ol>
                    <li>Search for an item using the search bar</li>
                    <li>Compare prices & vendor score</li>
                    <li>Add to your cart</li>
                    <li>Then pay at checkout</li>
                </ol>
                <div className="tel-help">
                    <p>Need help placing an order? Call:</p>
                    <h4>+2541 1177 9815</h4>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrder