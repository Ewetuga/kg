import { motion } from 'framer-motion'
import { Heart, Eye, Plus, Star } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { formatNaira } from '../utils/format'

export default function ProductCard({ product, onQuickView }) {
  const { addItem } = useCart()
  const { isWished, toggle } = useWishlist()
  const wished = isWished(product.id)

  return (
    <motion.div
      initial={{ opacity:0, y:26 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:'-60px' }}
      transition={{ duration:.55, ease:[0.22,1,0.36,1] }}
      whileHover={{ y:-6 }}
      style={{
        background:'#fff',borderRadius:20,overflow:'hidden',
        boxShadow:'0 4px 14px rgba(14,59,46,.06)',
        border:'1px solid rgba(20,32,27,.06)',
        display:'flex',flexDirection:'column',
        transition:'box-shadow .3s'
      }}
    >
      <div style={{position:'relative',aspectRatio:'4/3',overflow:'hidden',background:'#F7F1E3'}}>
        <img src={product.img} alt={product.name}
          style={{width:'100%',height:'100%',objectFit:'cover',transition:'transform .6s'}}/>
        {product.tag && (
          <span style={{position:'absolute',top:12,left:12,padding:'.3rem .7rem',borderRadius:999,
            background:'#E3B23C',color:'#0a2a20',fontSize:'.7rem',fontWeight:700}}>{product.tag}</span>
        )}
        <button onClick={()=>toggle(product.id)} aria-label="Wishlist"
          style={{position:'absolute',top:12,right:12,width:36,height:36,borderRadius:'50%',
            background:'rgba(255,255,255,.92)',display:'grid',placeItems:'center',
            boxShadow:'0 4px 12px rgba(0,0,0,.08)',transition:'transform .2s'}}>
          <Heart size={16} fill={wished ? '#e74c3c' : 'none'} color={wished ? '#e74c3c' : '#0a2a20'}/>
        </button>
        <button onClick={()=>onQuickView(product)} aria-label="Quick view"
          style={{position:'absolute',bottom:12,right:12,padding:'.45rem .8rem',borderRadius:999,
            background:'rgba(10,42,32,.82)',color:'#fff',fontSize:'.72rem',fontWeight:600,
            display:'flex',alignItems:'center',gap:'.3rem',backdropFilter:'blur(8px)'}}>
          <Eye size={13}/> Quick View
        </button>
      </div>

      <div style={{padding:'1.1rem',display:'flex',flexDirection:'column',gap:'.35rem',flex:1}}>
        <div style={{display:'flex',alignItems:'center',gap:'.35rem',fontSize:'.75rem',color:'#5C6B63'}}>
          <Star size={12} fill="#E3B23C" color="#E3B23C"/>
          {product.rating} · {product.unit}
        </div>
        <h3 style={{fontSize:'1.02rem',color:'#0a2a20'}}>{product.name}</h3>
        <div style={{marginTop:'auto',display:'flex',alignItems:'center',justifyContent:'space-between',paddingTop:'.6rem'}}>
          <div>
            <div style={{fontFamily:'Plus Jakarta Sans, sans-serif',fontWeight:800,fontSize:'1.15rem',color:'#0E3B2E'}}>
              {formatNaira(product.price)}
            </div>
            <div style={{fontSize:'.68rem',color:'#8a948f'}}>Demo price</div>
          </div>
          <button onClick={()=>addItem(product)} aria-label="Add to cart"
            style={{width:42,height:42,borderRadius:12,background:'#0E3B2E',color:'#fff',
              display:'grid',placeItems:'center',transition:'transform .2s, background .2s'}}
            onMouseEnter={e=>{e.currentTarget.style.background='#14513D';e.currentTarget.style.transform='scale(1.05)'}}
            onMouseLeave={e=>{e.currentTarget.style.background='#0E3B2E';e.currentTarget.style.transform='scale(1)'}}>
            <Plus size={19}/>
          </button>
        </div>
      </div>
    </motion.div>
  )
}