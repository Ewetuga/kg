import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Search, Menu, X, Heart, ReceiptText } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const links = [
  { to:'/', label:'Home' },
  { to:'/shop', label:'Shop' },
  { to:'/shop?view=categories', label:'Categories' },
  { to:'/#about', label:'About Us' },
  { to:'/#contact', label:'Contact' },
]

export default function Navbar() {
  const { count, openCart } = useCart()
  const { ids } = useWishlist()
  const [scrolled, setScrolled] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <style>{`
        @media (max-width:980px){ .nav-links{display:none!important} .hamburger{display:grid!important} }
        @media (max-width:520px){ .cart-label{display:none} }
      `}</style>

      <motion.header
        initial={{ y:-80, opacity:0 }} animate={{ y:0, opacity:1 }}
        transition={{ duration:.6, ease:[0.22,1,0.36,1] }}
        style={{
          position:'fixed', top:0, left:0, right:0, zIndex:100,
          background: scrolled ? 'rgba(251,247,236,.92)' : 'rgba(255,255,255,.14)',
          backdropFilter:'blur(18px)',
          borderBottom: scrolled ? '1px solid rgba(20,32,27,.08)' : '1px solid rgba(255,255,255,.18)',
          boxShadow: scrolled ? '0 8px 30px rgba(14,59,46,.08)' : 'none',
          transition:'background .4s ease, box-shadow .4s ease, border .4s ease',
        }}>
        <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between',height:76}}>
          <Link to="/" style={{display:'flex',alignItems:'center',gap:'.6rem'}}>
            <span style={{width:38,height:38,borderRadius:12,display:'grid',placeItems:'center',
              background:'linear-gradient(135deg, #0E3B2E, #14513D)',color:'#E3B23C',
              fontWeight:800,fontFamily:'Plus Jakarta Sans, sans-serif'}}>K</span>
            <span style={{fontFamily:'Plus Jakarta Sans, sans-serif',fontWeight:800,fontSize:'1.15rem',
              letterSpacing:'-.02em', color: scrolled ? '#0a2a20' : '#0a2a20'}}>KOGBAAGIDI</span>
          </Link>

          <nav className="nav-links" style={{display:'flex',gap:'2rem'}}>
            {links.map(l => (
              <NavLink key={l.to} to={l.to} style={({isActive}) => ({
                fontSize:'.95rem',fontWeight:600,
                color: scrolled ? (isActive ? '#0E3B2E' : '#14201B') : '#0a2a20',
                position:'relative',paddingBottom:4
              })}>{l.label}</NavLink>
            ))}
          </nav>

          <div style={{display:'flex',alignItems:'center',gap:'.4rem'}}>
            <IconBtn onClick={()=>setSearchOpen(s=>!s)} label="Search" scrolled={scrolled}><Search size={19}/></IconBtn>

            {/* ❌ Wishlist heart removed from top bar — now lives in the mobile drawer */}

            <button onClick={openCart} aria-label="Cart Now" style={{
              display:'flex',alignItems:'center',gap:'.55rem',
              padding:'.55rem .95rem',borderRadius:999,
              background: scrolled ? '#0E3B2E' : 'rgba(255,255,255,.18)',
              color: scrolled ? '#e3b23c' : '#0a2a20',
              border: scrolled ? 'none' : '1px solid rgba(255,255,255,.35)',
              fontWeight:600,fontSize:'.85rem',transition:'all .25s'}}>
              <ShoppingBag size={18}/>
              <span className="cart-label">Cart Now</span>
              <span style={{background:'#E3B23C',color:'#0a2a20',minWidth:22,height:22,borderRadius:999,
                display:'grid',placeItems:'center',fontSize:'.72rem',fontWeight:800}}>{count}</span>
            </button>
            <button onClick={()=>setMobile(true)} className="hamburger" aria-label="Menu" style={{
              display:'none',width:42,height:42,borderRadius:12,placeItems:'center',
              background: scrolled ? 'rgba(14,59,46,.08)' : 'rgba(255,255,255,.18)',
              color: scrolled ? '#0E3B2E' : '#0a2a20'}}><Menu size={20}/></button>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}
              style={{overflow:'hidden',borderTop:'1px solid rgba(20,32,27,.08)'}}>
              <form onSubmit={(e)=>{e.preventDefault(); if(query.trim()) window.location.href=`/shop?q=${encodeURIComponent(query.trim())}`}}
                className="container" style={{padding:'1rem 0',display:'flex',gap:'.6rem'}}>
                <input autoFocus value={query} onChange={e=>setQuery(e.target.value)}
                  placeholder="Search rice, beans, garri, palm oil…"
                  style={{flex:1,padding:'.9rem 1.1rem',borderRadius:999,
                    border:'1px solid rgba(20,32,27,.08)',background:'#fff',outline:'none'}}/>
                <button className="btn btn-primary" type="submit">Search</button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {mobile && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              style={{position:'fixed',inset:0,background:'rgba(10,42,32,.55)',backdropFilter:'blur(6px)',zIndex:200}}
              onClick={()=>setMobile(false)}>
              <motion.div initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}}
                transition={{type:'spring',stiffness:280,damping:30}}
                onClick={e=>e.stopPropagation()}
                style={{position:'absolute',right:0,top:0,width:'min(340px,86vw)',
                  background:'#FBF7EC',padding:'1.5rem',display:'flex',flexDirection:'column',gap:'.4rem'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.2rem'}}>
                  <span style={{fontFamily:'Plus Jakarta Sans, sans-serif',fontWeight:800,color:'#0a2a20'}}>KOGBAAGIDI</span>
                  <button onClick={()=>setMobile(false)} aria-label="Close"><X/></button>
                </div>
                {links.map((l,i)=>(
                  <motion.div key={l.to} initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:.05*i}}>
                    <Link to={l.to} onClick={()=>setMobile(false)}
                      style={{display:'block',padding:'1rem .6rem',borderRadius:12,fontWeight:600,
                        borderBottom:'1px solid rgba(20,32,27,.08)'}}>{l.label}</Link>
                  </motion.div>
                ))}
                <Link to="/invoices" onClick={()=>setMobile(false)}
                  style={{display:'flex',alignItems:'center',gap:'.6rem',padding:'1rem .6rem',fontWeight:600,borderRadius:12}}>
                  <ReceiptText size={18}/> Invoice History
                </Link>

                {/* ✅ Wishlist moved here — bottom of the link stack */}
                <Link to="/shop" onClick={()=>setMobile(false)}
                  style={{display:'flex',alignItems:'center',gap:'.6rem',padding:'1rem .6rem',fontWeight:600,borderRadius:12}}>
                  <Heart size={18} color="#e74c3c" fill={ids.length ? '#e74c3c' : 'none'}/>
                  <span style={{flex:1}}>Wishlist</span>
                  {ids.length > 0 && (
                    <span style={{minWidth:22,height:22,borderRadius:999,
                      background:'#E3B23C',color:'#0a2a20',fontSize:'.7rem',fontWeight:800,
                      display:'grid',placeItems:'center',padding:'0 6px'}}>{ids.length}</span>
                  )}
                </Link>

                <div style={{marginTop:'auto'}}>
                  <Link to="/shop" onClick={()=>setMobile(false)} className="btn btn-gold" style={{width:'100%',justifyContent:'center'}}>
                    Shop Now
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}

function IconBtn({ children, onClick, scrolled, label }) {
  return (
    <button onClick={onClick} aria-label={label} style={{
      width:42,height:42,borderRadius:12,display:'grid',placeItems:'center',
      background: scrolled ? 'rgba(14,59,46,.06)' : 'rgba(255,255,255,.16)',
      color: scrolled ? '#0a2a20' : '#fff',
      border: scrolled ? '1px solid rgba(20,32,27,.08)' : '1px solid rgba(255,255,255,.3)',
      transition:'all .25s'}}>{children}</button>
  )
}