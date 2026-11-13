import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Promo() {
  return (
    <section className="section" style={{background:'#FBF7EC'}}>
      <div className="container">
        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}}
          viewport={{once:true,margin:'-80px'}} transition={{duration:.7,ease:[0.22,1,0.36,1]}}
          style={{position:'relative',borderRadius:32,overflow:'hidden',
            background:'linear-gradient(120deg, #0a2a20 0%, #0E3B2E 50%, #14513D 100%)',
            display:'grid',gridTemplateColumns:'1.1fr .9fr',alignItems:'center'}}
          className="promo-grid">
          <style>{`@media (max-width:860px){.promo-grid{grid-template-columns:1fr!important} .promo-img{height:260px!important}}`}</style>

          <div style={{padding:'3.5rem',color:'#fff',position:'relative',zIndex:2}}>
            <span style={{display:'inline-flex',alignItems:'center',gap:'.5rem',fontSize:'.78rem',
              fontWeight:700,letterSpacing:'.16em',textTransform:'uppercase',color:'#E3B23C',
              background:'rgba(227,178,60,.14)',padding:'.45rem .9rem',borderRadius:999,marginBottom:'1.2rem'}}>
              Limited Time
            </span>
            <h2 style={{fontSize:'clamp(2rem,4vw,3rem)',color:'#F7F1E3',lineHeight:1.1}}>
              Quality Foodstuffs.<br/><span style={{color:'#E3B23C'}}>Better Value.</span>
            </h2>
            <p style={{color:'rgba(247,241,227,.82)',marginTop:'1rem',maxWidth:440,fontSize:'1.02rem'}}>
              Save on bulk orders of rice, beans, palm oil and more. Fresh stock, reliable delivery, fair prices.
            </p>
            <Link to="/shop" className="btn btn-gold" style={{marginTop:'1.6rem'}}>
              Shop Now <ArrowRight size={17}/>
            </Link>
          </div>

          <div className="promo-img" style={{position:'relative',height:'100%',minHeight:340}}>
            <motion.div animate={{y:[0,-14,0]}} transition={{duration:6,repeat:Infinity,ease:'easeInOut'}}
              style={{position:'absolute',top:'8%',right:'14%',width:'62%',height:'62%',borderRadius:24,
                overflow:'hidden',boxShadow:'0 20px 40px rgba(0,0,0,.3)',border:'3px solid rgba(255,255,255,.12)'}}>
              <img src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80"
                alt="Palm oil" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
            </motion.div>
            <motion.div animate={{y:[0,12,0]}} transition={{duration:7,repeat:Infinity,ease:'easeInOut'}}
              style={{position:'absolute',bottom:'8%',left:'8%',width:'44%',height:'44%',borderRadius:20,
                overflow:'hidden',boxShadow:'0 20px 40px rgba(0,0,0,.3)',border:'3px solid rgba(255,255,255,.12)'}}>
              <img src="https://images.unsplash.com/photo-1551462147-37885acc36f1?w=500&q=80"
                alt="Beans" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}