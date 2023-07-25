import { AiFillHome } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import './checkout.css'

const Checkout = () => {
    const navigate = useNavigate();
    const GoHome = () => {
        navigate('/')
    }
    return (
        <div className="checkoutBox">
            <h1>Transaction successful</h1>
            <h2>Would you like to continue shoping with us?</h2>

            <div className="moreShopping" onClick={GoHome}>
                <button><AiFillHome /> Back Home</button>
            </div>

        </div>
    )
}

export default Checkout