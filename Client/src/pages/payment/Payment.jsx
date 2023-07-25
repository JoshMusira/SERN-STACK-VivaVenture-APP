import axios from 'axios'
import { useContext } from 'react';
import { Context } from '../../context/userContext/Context';


function Payment({ cartItems }) {
    // const { user } = useContext(Context)
    const user = 1;

    const handleCheckout = () => {
        axios.post('http://localhost:8081/stripe', {
            userID: user,
            cartItems
        }).then((res) => {
            if (res.data.url) {
                window.location.href = res.data.url
            }
        }).catch((error => {
            console.log(error)
        }))

    }
    return (
        <>
            <button className='cartControl' onClick={() => handleCheckout()}>
                proceed to  Checkout
            </button>
        </>
    )
}

export default Payment