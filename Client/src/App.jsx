
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './common/Header'
import Pages from './pages/Pages'
import Data from "./components/Data"
import { useState } from 'react'
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

function App() {
  //step 1: Fetch data from the database
  const { productItems } = Data

  //Step 2 :
  const [CartItem, setCartItem] = useState([])

  const addToCart = (product) => {
    // if hamro product alredy cart xa bhane  find garna help garxa
    const productExit = CartItem.find((item) => item.id === product.id)

    // if item and product doesnt match then will add new items
    if (productExit) {
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty + 1 } : item)))
    } else {
      // but if the product doesnt exit in the cart that mean if card is empty
      // then new product is added in cart  and its qty is initalize to 1
      setCartItem([...CartItem, { ...product, qty: 1 }])
    }
  }
  // console.log(addToCart);
  // Stpe: 6
  const decreaseQty = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id)

    // if product is exit and its qty is 1 then we will run a fun  setCartItem
    // else
    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id))
    } else {
      // if product is exit and qty  of that produt is not equal to 1
      // then will run function call setCartItem
      // inside setCartItem we will run map method
      // this map() will check if item.id match to produt.id  then we have to desc the qty of product by 1
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty - 1 } : item)))
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
