
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './common/Header'
import Pages from './pages/Pages'
import { useEffect, useState } from 'react'
import Footer from './common/footer/Footer'
import Cart from './common/cart/Cart'
import TrackOrder from './pages/trackOrder/TrackOrder'
import Contact from './pages/contact/Contact'
import Settings from './pages/settings/Settings'
import Inbox from './pages/inbox/Inbox'
import MyAccount from './pages/myAccount/MyAccount'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import { apiDomain } from './utils/utilsDomain'
import axios from 'axios'
import { useContext } from 'react'
import { Context } from './context/userContext/Context'
import AdminHome from './Admin/pages/adminHome/AdminHome'

function App() {
  const { user } = useContext(Context);
  const [productItems, setProductItems] = useState([]);

  const getProducts = async () => {
    const res = await axios.get(`${apiDomain}/product`);
    setProductItems(res.data);
  };

  useEffect(() => {
    getProducts();
  }, []);


  const [CartItem, setCartItem] = useState([])

  // const addToCart = (product) => {
  //   const productExist = CartItem.find((item) => item.id === product.id)

  //   if (productExist) {
  //     setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExist, qty: productExist.qty + 1 } : item)))
  //   } else {

  //     setCartItem([...CartItem, { ...product, qty: 1 }])
  //   }
  // }
  const addToCart = (product) => {
    const productIndex = CartItem.findIndex((item) => item.product_id === product.product_id);

    if (productIndex !== -1) {
      const updatedCart = [...CartItem];
      updatedCart[productIndex].qty += 1;
      setCartItem(updatedCart);
    } else {
      setCartItem([...CartItem, { ...product, qty: 1 }]);
    }
  };


  const decreaseQty = (product) => {
    const productIndex = CartItem.findIndex((item) => item.product_id === product.product_id);

    if (productIndex !== -1) {
      const updatedCart = [...CartItem];
      if (updatedCart[productIndex].qty === 1) {
        updatedCart.splice(productIndex, 1);
      } else {
        updatedCart[productIndex].qty -= 1;
      }
      setCartItem(updatedCart);
    }
  };

  return (
    <>
      <BrowserRouter>
        {
          user === null || user.role === "user" ? <Header CartItem={CartItem} /> : <AdminHome />
        }

        <Routes>
          <Route path='/' element={(user === null || user.role === "user" ? <Pages productItems={productItems} addToCart={addToCart} /> : <AdminHome />)} />
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
