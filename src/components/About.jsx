import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'

export default function About() {
  return (
    <section className="section" id="about" style={{background:'#FBF7EC'}}>
      <div className="container">
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'3.5rem',alignItems:'center'}}
          className="about-grid">
          <style>{`@media (max-width:860px){.about-grid{grid-template-columns:1fr!important}}`}</style>

          <Reveal>
            <div style={{position:'relative'}}>
              <motion.div whileHover={{scale:1.02}} transition={{duration:.4}}
                style={{borderRadius:28,overflow:'hidden',boxShadow:'0 30px 60px rgba(14,59,46,.15)'}}>
                <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80"
                  alt="Nigerian spices and foodstuffs"
                  style={{width:'100%',height:480,objectFit:'cover'}}/>
              </motion.div>
              <motion.div animate={{y:[0,-10,0]}} transition={{duration:6,repeat:Infinity,ease:'easeInOut'}}
                style={{position:'absolute',bottom:-24,right:-16,padding:'1.2rem 1.4rem',
                  borderRadius:18,background:'#0E3B2E',color:'#fff',boxShadow:'0 20px 40px rgba(14,59,46,.3)'}}>
                <div style={{fontFamily:'Plus Jakarta Sans, sans-serif',fontWeight:800,fontSize:'1.6rem',color:'#E3B23C'}}>10K+</div>
                <div style={{fontSize:'.78rem',opacity:.8}}>Satisfied customers</div>
              </motion.div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <span className="eyebrow">About KOGBAAGIDI</span>
            <h2 style={{fontSize:'clamp(1.9rem,3.6vw,2.8rem)',color:'#0a2a20'}}>
              Bringing Quality Foodstuffs Closer to You.
            </h2>
            <p style={{color:'#5C6B63',marginTop:'1.2rem',fontSize:'1.02rem',lineHeight:1.75}}>
              KOGBAAGIDI was founded with a simple promise: to make premium Nigerian foodstuffs accessible to every household.
              We source directly from trusted farmers and producers, so you get freshness, authenticity and value — every time.
            </p>
            <p style={{color:'#5C6B63',marginTop:'1rem',fontSize:'1.02rem',lineHeight:1.75}}>
              From ofada rice and honey beans to palm oil and ground crayfish, we're committed to convenience, affordability
              and complete customer satisfaction — because good food truly begins with quality ingredients.
            </p>
            <div style={{display:'flex',gap:'2rem',marginTop:'1.8rem',flexWrap:'wrap'}}>
              {[['100%','Quality sourced'],['48h','Fast delivery'],['100%','Customer focused']].map(([n,l])=>(
                <div key={l}>
                  <div style={{fontFamily:'Plus Jakarta Sans, sans-serif',fontWeight:800,fontSize:'1.35rem',color:'#0E3B2E'}}>{n}</div>
                  <div style={{fontSize:'.82rem',color:'#5C6B63'}}>{l}</div>
                </div>
              ))}
            </div>
            <Link to="/shop" className="btn btn-primary" style={{marginTop:'2rem'}}>
              Explore Our Store <ArrowRight size={17}/>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}