import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { formatNaira } from '../utils/format'

export default function QuickViewModal({ product, onClose }) {
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)

  if (!product) return null

  return (
    <AnimatePresence>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
        onClick={onClose}
        style={{position:'fixed',inset:0,zIndex:400,background:'rgba(10,42,32,.6)',
          backdropFilter:'blur(6px)',display:'grid',placeItems:'center',padding:'1rem'}}>
        <motion.div initial={{scale:.94,opacity:0,y:20}} animate={{scale:1,opacity:1,y:0}}
          exit={{scale:.94,opacity:0}} transition={{type:'spring',stiffness:260,damping:26}}
          onClick={e=>e.stopPropagation()}
          style={{background:'#fff',borderRadius:24,maxWidth:820,width:'100%',overflow:'hidden',
            display:'grid',gridTemplateColumns:'1fr 1fr',boxShadow:'0 40px 80px rgba(0,0,0,.35)'}}
          className="quickview">
          <style>{`@media (max-width:700px){.quickview{grid-template-columns:1fr!important}}`}</style>

          <div style={{aspectRatio:'1/1',background:'#F7F1E3'}}>
            <img src={product.img} alt={product.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
          </div>

          <div style={{padding:'2rem',display:'flex',flexDirection:'column',position:'relative'}}>
            <button onClick={onClose} aria-label="Close"
              style={{position:'absolute',top:'1rem',right:'1rem',width:36,height:36,borderRadius:'50%',
                background:'rgba(20,32,27,.06)',display:'grid',placeItems:'center'}}>
              <X size={18}/>
            </button>

            <div style={{display:'flex',gap:'.4rem',alignItems:'center',color:'#5C6B63',fontSize:'.82rem'}}>
              <Star size={14} fill="#E3B23C" color="#E3B23C"/> {product.rating} · {product.unit}
            </div>
            <h2 style={{fontSize:'1.7rem',marginTop:'.5rem',color:'#0a2a20'}}>{product.name}</h2>
            <p style={{color:'#5C6B63',fontSize:'.92rem',marginTop:'.6rem'}}>
              Premium quality {product.name.toLowerCase()}, carefully selected and hygienically packaged for your family.
            </p>

            <div style={{marginTop:'1.4rem',fontFamily:'Plus Jakarta Sans, sans-serif',
              fontWeight:800,fontSize:'1.8rem',color:'#0E3B2E'}}>{formatNaira(product.price)}</div>
            <div style={{fontSize:'.72rem',color:'#8a948f'}}>Demo price · illustrative only</div>

            <div style={{marginTop:'1.4rem',display:'flex',alignItems:'center',gap:'.6rem'}}>
              <div style={{display:'flex',alignItems:'center',border:'1px solid rgba(20,32,27,.15)',
                borderRadius:999,overflow:'hidden'}}>
                <button onClick={()=>setQty(q=>Math.max(1,q-1))}
                  style={{width:40,height:40,fontSize:'1.2rem'}}>−</button>
                <span style={{width:36,textAlign:'center',fontWeight:700}}>{qty}</span>
                <button onClick={()=>setQty(q=>q+1)}
                  style={{width:40,height:40,fontSize:'1.2rem'}}>+</button>
              </div>
              <button onClick={()=>{addItem(product, qty); onClose()}}
                className="btn btn-gold" style={{flex:1,justifyContent:'center'}}>
                <ShoppingBag size={17}/> Add to Cart
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}