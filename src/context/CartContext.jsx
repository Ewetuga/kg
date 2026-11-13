import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { calcTotals } from '../utils/invoice'
import { DELIVERY_FEE } from '../data/products'

const CartContext = createContext()
const CART_KEY = 'kogbaagidi_cart'
const INV_KEY = 'kogbaagidi_invoices'

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [invoices, setInvoices] = useState([])
  const [deliveryFee, setDeliveryFee] = useState(DELIVERY_FEE)

  useEffect(() => {
    try { setItems(JSON.parse(localStorage.getItem(CART_KEY)) || []) } catch {}
    try { setInvoices(JSON.parse(localStorage.getItem(INV_KEY)) || []) } catch {}
  }, [])

  useEffect(() => { localStorage.setItem(CART_KEY, JSON.stringify(items)) }, [items])
  useEffect(() => { localStorage.setItem(INV_KEY, JSON.stringify(invoices)) }, [invoices])

  const addItem = (product, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i)
      return [...prev, { id:product.id, name:product.name, price:product.price, img:product.img, unit:product.unit, qty }]
    })
  }
  const updateQty = (id, qty) => {
    if (qty < 1) return removeItem(id)
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }
  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id))
  const clearCart = () => setItems([])
  const count = useMemo(() => items.reduce((s,i) => s + i.qty, 0), [items])
  const totals = useMemo(() => calcTotals(items, deliveryFee), [items, deliveryFee])
  const saveInvoice = (inv) => setInvoices(prev => [inv, ...prev])

  const value = {
    items, count, totals, deliveryFee, setDeliveryFee,
    addItem, updateQty, removeItem, clearCart,
    isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false),
    invoices, saveInvoice,
  }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
export const useCart = () => useContext(CartContext)