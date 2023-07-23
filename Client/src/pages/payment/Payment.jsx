import axios from 'axios'


function Payment({ cartItems }) {
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