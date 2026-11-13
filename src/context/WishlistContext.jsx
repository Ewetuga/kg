import { createContext, useContext, useEffect, useState } from 'react'
const WishlistContext = createContext()
const KEY = 'kogbaagidi_wishlist'

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState([])
  useEffect(() => { try { setIds(JSON.parse(localStorage.getItem(KEY)) || []) } catch {} }, [])
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(ids)) }, [ids])
  const toggle = (id) => setIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  const isWished = (id) => ids.includes(id)
  return <WishlistContext.Provider value={{ ids, toggle, isWished }}>{children}</WishlistContext.Provider>
}
export const useWishlist = () => useContext(WishlistContext)