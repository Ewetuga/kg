import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Truck, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section style={{
      position:'relative',minHeight:'100vh',display:'flex',alignItems:'center',
      paddingTop:110,paddingBottom:60,overflow:'hidden',
      background:'radial-gradient(1200px 600px at 80% 10%, #14513D 0%, #0E3B2E 45%, #0a2a20 100%)'
    }}>
      <motion.div animate={{y:[0,-18,0]}} transition={{duration:8,repeat:Infinity,ease:'easeInOut'}}
        style={{position:'absolute',top:'12%',right:'8%',width:220,height:220,borderRadius:'50%',
          background:'radial-gradient(circle, rgba(227,178,60,.35), transparent 70%)',filter:'blur(10px)'}}/>
      <div style={{position:'absolute',bottom:'-10%',left:'-5%',width:400,height:400,borderRadius:'50%',
        background:'radial-gradient(circle, rgba(255,255,255,.06), transparent 70%)'}}/>

      <div style={{width:'min(1240px,92%)',marginInline:'auto',
        display:'grid',gridTemplateColumns:'1.05fr .95fr',gap:'3rem',alignItems:'center',
        position:'relative',zIndex:2}} className="hero-grid">
        <style>{`@media (max-width:900px){ .hero-grid{grid-template-columns:1fr!important} .hero-img-wrap{display:none} }`}</style>

        <div>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.6}}
            style={{display:'inline-flex',alignItems:'center',gap:'.55rem',padding:'.5rem 1rem',
              borderRadius:999,color:'#fff',fontSize:'.82rem',fontWeight:600,background:'rgba(255,255,255,.12)',
              border:'1px solid rgba(255,255,255,.22)',backdropFilter:'blur(10px)',marginBottom:'1.4rem'}}>
            <Sparkles size={15} color="#E3B23C"/> Premium Nigerian Foodstuffs
          </motion.div>

          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.15}}
            style={{fontSize:'clamp(2.4rem,5.4vw,4.2rem)',color:'#F7F1E3',letterSpacing:'-.03em'}}>
            Good Food Begins With <span style={{color:'#E3B23C'}}>Quality Ingredients.</span>
          </motion.h1>

          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.3}}
            style={{color:'rgba(247,241,227,.82)',fontSize:'1.1rem',maxWidth:520,marginTop:'1.3rem'}}>
            Discover fresh, carefully selected foodstuffs and everyday essentials, delivered with quality you can trust.
          </motion.p>

          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.45}}
            style={{display:'flex',gap:'.9rem',marginTop:'2rem',flexWrap:'wrap'}}>
            <Link to="/shop" className="btn btn-gold">Shop Now <ArrowRight size={17}/></Link>
            <Link to="/shop?view=categories" className="btn btn-ghost">Explore Categories</Link>
          </motion.div>

          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.7}}
            style={{display:'flex',gap:'2.2rem',marginTop:'2.6rem',flexWrap:'wrap'}}>
            {[['10K+','Happy Customers'],['100%','Fresh Quality'],['48h','Fast Delivery']].map(([n,l])=>(
              <div key={l}>
                <div style={{fontFamily:'Plus Jakarta Sans, sans-serif',fontWeight:800,fontSize:'1.5rem',color:'#E3B23C'}}>{n}</div>
                <div style={{color:'rgba(247,241,227,.65)',fontSize:'.82rem'}}>{l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="hero-img-wrap" style={{position:'relative',height:520}}>
          <motion.div initial={{opacity:0,scale:.9,y:30}} animate={{opacity:1,scale:1,y:0}}
            transition={{duration:.9,delay:.3,ease:[0.22,1,0.36,1]}}
            style={{position:'absolute',top:0,right:0,width:'78%',height:'72%',borderRadius:28,
              overflow:'hidden',boxShadow:'0 30px 60px rgba(0,0,0,.35)'}}>
            <img src="https://images.unsplash.com/photo-1586201375761-83865001e31c?w=900&q=80"
              alt="Premium rice" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
          </motion.div>

          <motion.div initial={{opacity:0,scale:.85,y:20}} animate={{opacity:1,scale:1,y:0}}
            transition={{duration:.9,delay:.5,ease:[0.22,1,0.36,1]}}
            style={{position:'absolute',bottom:'8%',left:0,width:'52%',height:'44%',borderRadius:24,
              overflow:'hidden',boxShadow:'0 24px 50px rgba(0,0,0,.3)',border:'4px solid rgba(255,255,255,.15)'}}>
            <img src="https://images.unsplash.com/photo-1551462147-37885acc36f1?w=700&q=80"
              alt="Honey beans" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
          </motion.div>

          <motion.div animate={{y:[0,-12,0]}} transition={{duration:5,repeat:Infinity,ease:'easeInOut'}}
            style={{position:'absolute',top:'38%',left:'-6%',padding:'.9rem 1.1rem',borderRadius:16,
              background:'rgba(255,255,255,.92)',backdropFilter:'blur(14px)',
              boxShadow:'0 12px 30px rgba(0,0,0,.18)',display:'flex',alignItems:'center',gap:'.65rem'}}>
            <div style={{width:36,height:36,borderRadius:10,background:'rgba(14,59,46,.1)',display:'grid',placeItems:'center'}}>
              <ShieldCheck size={18} color="#0E3B2E"/>
            </div>
            <div>
              <div style={{fontWeight:700,fontSize:'.82rem',color:'#0a2a20'}}>Quality Assured</div>
              <div style={{fontSize:'.7rem',color:'#5C6B63'}}>Every single item</div>
            </div>
          </motion.div>

          <motion.div animate={{y:[0,12,0]}} transition={{duration:6,repeat:Infinity,ease:'easeInOut'}}
            style={{position:'absolute',bottom:'2%',right:'4%',padding:'.9rem 1.1rem',borderRadius:16,
              background:'rgba(255,255,255,.92)',backdropFilter:'blur(14px)',
              boxShadow:'0 12px 30px rgba(0,0,0,.18)',display:'flex',alignItems:'center',gap:'.65rem'}}>
            <div style={{width:36,height:36,borderRadius:10,background:'rgba(227,178,60,.18)',display:'grid',placeItems:'center'}}>
              <Truck size={18} color="#0a2a20"/>
            </div>
            <div>
              <div style={{fontWeight:700,fontSize:'.82rem',color:'#0a2a20'}}>Fast Delivery</div>
              <div style={{fontSize:'.7rem',color:'#5C6B63'}}>Nationwide</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}