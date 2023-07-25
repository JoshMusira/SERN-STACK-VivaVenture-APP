import axios from 'axios'
import { useContext } from 'react';
import { Context } from '../../context/userContext/Context';


function Payment({ cartItems }) {
    const { user } = useContext(Context)
    const user1 = user.id;

    const handleCheckout = () => {
        axios.post('http://localhost:8081/stripe', {
            userID: user1,
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
            <button className='cartControl2' onClick={() => handleCheckout()}>
                Proceed to  Checkout
            </button>
        </>
    )
}

export default Payment