import React from 'react'

const TrackOrder = () => {
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
                <h4>To track an order follow the steps below</h4>
                <ol>
                    <li>From your account click on orders</li>
                    <li>Then click see details in front of the order you wish to track</li>
                    <li>Click the Track Item button and the delivery details willl be displayed</li>
                </ol>

            </div>
        </div>
    )
}

export default TrackOrder