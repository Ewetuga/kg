import { DELIVERY_FEE } from '../data/products'

export const generateInvoiceRef = () => {
  const d = new Date()
  const stamp = `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`
  const rand = Math.random().toString(36).slice(2,6).toUpperCase()
  return `KOG-${stamp}-${rand}`
}

export const calcTotals = (items, deliveryFee = DELIVERY_FEE) => {
  const subtotal = items.reduce((s,i) => s + (Number(i.price) * Number(i.qty)), 0)
  const delivery = items.length ? deliveryFee : 0
  return { subtotal, delivery, grandTotal: subtotal + delivery }
}