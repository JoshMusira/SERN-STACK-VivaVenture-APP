
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './common/Header'
import Pages from './pages/Pages'
import Data from "./components/Data"
import { useEffect, useState } from 'react'
import Footer from './common/footer/Footer'
import Cart from './common/cart/Cart'
import Apple from './components/apple/Apple'
import TrackOrder from './pages/trackOrder/TrackOrder'
import Contact from './pages/contact/Contact'
import Settings from './pages/settings/Settings'
import Inbox from './pages/inbox/Inbox'
import MyAccount from './pages/myAccount/MyAccount'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
// import { useContext } from 'react'
// import { Context } from './context/userContext/Context'
import { apiDomain } from './utils/utilsDomain'
import axios from 'axios'

function App() {
  // const { user } = useContext(Context);
  const [productItems, setProductItems] = useState([]);

  const getProducts = async () => {
    const res = await axios.get(`${apiDomain}/product`);
    setProductItems(res.data);
  };

  useEffect(() => {
    getProducts();
  }, []);


  const [CartItem, setCartItem] = useState([])

  const addToCart = (product) => {
    const productExist = CartItem.find((item) => item.id === product.id)

    if (productExist) {
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExist, qty: productExist.qty + 1 } : item)))
    } else {

      setCartItem([...CartItem, { ...product, qty: 1 }])
    }
  }

  const decreaseQty = (product) => {
    const productExist = CartItem.find((item) => item.id === product.id)

    if (productExist.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id))
    } else {

      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExist, qty: productExist.qty - 1 } : item)))
    }
  }
  return (
    <>
      <BrowserRouter>
        <Header CartItem={CartItem} />
        <Routes>
          <Route path='/' element={<Pages productItems={productItems} addToCart={addToCart} />} />
          <Route path='/cart' element={<Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} />} />
          <Route path='/order' element={<TrackOrder />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/inbox' element={<Inbox />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/myaccount' element={<MyAccount />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </>
  )
}

export default App
