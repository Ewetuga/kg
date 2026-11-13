import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Checkout from './pages/Checkout'
import InvoiceHistory from './pages/InvoiceHistory'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior:'smooth' })
    } else {
      window.scrollTo({ top:0, behavior:'instant' })
    }
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop/>
      <Navbar/>
      <CartDrawer/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/shop" element={<Shop/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/invoices" element={<InvoiceHistory/>}/>
      </Routes>
      <Footer/>
    </>
  )
}