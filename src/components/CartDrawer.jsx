import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatNaira } from '../utils/format'

export default function CartDrawer() {
  const { isOpen, closeCart, items, totals, updateQty, removeItem, clearCart, deliveryFee } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            onClick={closeCart}
            style={{position:'fixed',inset:0,zIndex:300,background:'rgba(10,42,32,.5)',backdropFilter:'blur(4px)'}}/>
          <motion.aside initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}}
            transition={{type:'spring',stiffness:280,damping:30}}
            style={{position:'fixed',top:0,right:0,bottom:0,zIndex:310,
              width:'min(440px,100vw)',background:'#FBF7EC',display:'flex',flexDirection:'column',
              boxShadow:'-20px 0 60px rgba(0,0,0,.2)'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',
              padding:'1.4rem 1.6rem',borderBottom:'1px solid rgba(20,32,27,.08)'}}>
              <div style={{display:'flex',alignItems:'center',gap:'.6rem'}}>
                <ShoppingBag size={20} color="#0E3B2E"/>
                <span style={{fontFamily:'Plus Jakarta Sans, sans-serif',fontWeight:800,color:'#0a2a20'}}>
                  Your Cart ({items.length})
                </span>
              </div>
              <button onClick={closeCart} aria-label="Close cart"
                style={{width:36,height:36,borderRadius:'50%',background:'rgba(20,32,27,.06)',
                  display:'grid',placeItems:'center'}}><X size={18}/></button>
            </div>

            <div style={{flex:1,overflowY:'auto',padding:'1.2rem 1.6rem'}}>
              {items.length === 0 ? (
                <div style={{textAlign:'center',padding:'4rem 1rem'}}>
                  <div style={{width:72,height:72,borderRadius:'50%',background:'rgba(14,59,46,.08)',
                    display:'grid',placeItems:'center',margin:'0 auto 1.2rem'}}>
                    <ShoppingBag size={30} color="#0E3B2E"/>
                  </div>
                  <h3 style={{color:'#0a2a20',marginBottom:'.4rem'}}>Your cart is empty</h3>
                  <p style={{color:'#5C6B63',fontSize:'.9rem',marginBottom:'1.6rem'}}>
                    Add some premium foodstuffs to get started.
                  </p>
                  <Link to="/shop" onClick={closeCart} className="btn btn-primary">Shop Now</Link>
                </div>
              ) : (
                <div style={{display:'flex',flexDirection:'column',gap:'.9rem'}}>
                  {items.map(item => (
                    <motion.div key={item.id} layout
                      style={{display:'flex',gap:'.9rem',padding:'.8rem',background:'#fff',
                        borderRadius:16,border:'1px solid rgba(20,32,27,.06)'}}>
                      <img src={item.img} alt={item.name}
                        style={{width:70,height:70,borderRadius:12,objectFit:'cover',flexShrink:0}}/>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{display:'flex',justifyContent:'space-between',gap:'.4rem'}}>
                          <h4 style={{fontSize:'.9rem',color:'#0a2a20'}}>{item.name}</h4>
                          <button onClick={()=>removeItem(item.id)} aria-label="Remove"
                            style={{color:'#c0392b',flexShrink:0}}><Trash2 size={15}/></button>
                        </div>
                        <div style={{fontSize:'.75rem',color:'#5C6B63'}}>{item.unit}</div>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'.5rem'}}>
                          <div style={{display:'flex',alignItems:'center',border:'1px solid rgba(20,32,27,.15)',
                            borderRadius:999,overflow:'hidden'}}>
                            <button onClick={()=>updateQty(item.id, item.qty-1)}
                              style={{width:28,height:28,display:'grid',placeItems:'center'}}><Minus size={12}/></button>
                            <span style={{width:26,textAlign:'center',fontSize:'.8rem',fontWeight:700}}>{item.qty}</span>
                            <button onClick={()=>updateQty(item.id, item.qty+1)}
                              style={{width:28,height:28,display:'grid',placeItems:'center'}}><Plus size={12}/></button>
                          </div>
                          <div style={{fontFamily:'Plus Jakarta Sans, sans-serif',fontWeight:800,
                            fontSize:'.9rem',color:'#0E3B2E'}}>{formatNaira(item.price * item.qty)}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  <button onClick={clearCart}
                    style={{fontSize:'.82rem',color:'#c0392b',textDecoration:'underline',marginTop:'.4rem',
                      alignSelf:'flex-start'}}>Clear cart</button>
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div style={{padding:'1.2rem 1.6rem',borderTop:'1px solid rgba(20,32,27,.08)',background:'#fff'}}>
                <Row label="Subtotal" value={formatNaira(totals.subtotal)}/>
                <Row label="Delivery" value={formatNaira(totals.delivery)} muted/>
                <div style={{display:'flex',justifyContent:'space-between',marginTop:'.6rem',
                  paddingTop:'.6rem',borderTop:'1px dashed rgba(20,32,27,.12)'}}>
                  <span style={{fontWeight:700,color:'#0a2a20'}}>Total</span>
                  <span style={{fontFamily:'Plus Jakarta Sans, sans-serif',fontWeight:800,
                    fontSize:'1.15rem',color:'#0E3B2E'}}>{formatNaira(totals.grandTotal)}</span>
                </div>
                <Link to="/checkout" onClick={closeCart} className="btn btn-gold"
                  style={{width:'100%',justifyContent:'center',marginTop:'1rem'}}>
                  Proceed to Checkout <ArrowRight size={16}/>
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function Row({ label, value, muted }) {
  return (
    <div style={{display:'flex',justifyContent:'space-between',fontSize:'.88rem',
      color: muted ? '#5C6B63' : '#14201B',padding:'.2rem 0'}}>
      <span>{label}</span><span>{value}</span>
    </div>
  )
}