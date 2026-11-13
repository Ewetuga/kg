import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonials } from '../data/products'
import Reveal from './Reveal'

export default function Testimonials() {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setIdx(i => (i+1) % testimonials.length), 5500)
    return () => clearInterval(t)
  }, [paused])

  const current = testimonials[idx]

  return (
    <section className="section" style={{background:'#fff'}}>
      <div className="container">
        <Reveal>
          <div className="section-head" style={{textAlign:'center',margin:'0 auto 3rem'}}>
            <span className="eyebrow">Testimonials</span>
            <h2>What our customers say</h2>
            <p>Sample reviews shown for demonstration purposes.</p>
          </div>
        </Reveal>

        <div style={{maxWidth:760,margin:'0 auto',position:'relative'}}
          onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}>
          <div style={{position:'relative',minHeight:300}}>
            <AnimatePresence mode="wait">
              <motion.div key={idx}
                initial={{opacity:0,y:24,scale:.98}} animate={{opacity:1,y:0,scale:1}}
                exit={{opacity:0,y:-24,scale:.98}} transition={{duration:.5,ease:[0.22,1,0.36,1]}}
                style={{background:'#FBF7EC',borderRadius:28,padding:'3rem 2.6rem',
                  border:'1px solid rgba(20,32,27,.06)',position:'relative',textAlign:'center'}}>
                <Quote size={40} color="#E3B23C" style={{margin:'0 auto 1rem',opacity:.5}}/>
                <div style={{display:'flex',justifyContent:'center',gap:'.25rem',marginBottom:'1.2rem'}}>
                  {Array.from({length:5}).map((_,i)=>(
                    <Star key={i} size={16} fill={i<current.stars ? '#E3B23C' : 'none'}
                      color={i<current.stars ? '#E3B23C' : '#cfd6d2'}/>
                  ))}
                </div>
                <p style={{fontSize:'1.15rem',color:'#14201B',lineHeight:1.7,fontStyle:'italic'}}>
                  “{current.text}”
                </p>
                <div style={{marginTop:'1.6rem'}}>
                  <div style={{fontFamily:'Plus Jakarta Sans, sans-serif',fontWeight:700,color:'#0a2a20'}}>{current.name}</div>
                  <div style={{fontSize:'.82rem',color:'#5C6B63'}}>{current.role}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'1rem',marginTop:'1.8rem'}}>
            <button onClick={()=>setIdx(i=>(i-1+testimonials.length)%testimonials.length)} aria-label="Previous"
              style={{width:44,height:44,borderRadius:'50%',background:'#0E3B2E',color:'#fff',
                display:'grid',placeItems:'center'}}><ChevronLeft size={20}/></button>
            <div style={{display:'flex',gap:'.4rem'}}>
              {testimonials.map((_,i)=>(
                <button key={i} onClick={()=>setIdx(i)} aria-label={`Go to testimonial ${i+1}`}
                  style={{width:i===idx?24:8,height:8,borderRadius:999,
                    background:i===idx ? '#E3B23C' : 'rgba(14,59,46,.2)',transition:'all .3s'}}/>
              ))}
            </div>
            <button onClick={()=>setIdx(i=>(i+1)%testimonials.length)} aria-label="Next"
              style={{width:44,height:44,borderRadius:'50%',background:'#0E3B2E',color:'#fff',
                display:'grid',placeItems:'center'}}><ChevronRight size={20}/></button>
          </div>
        </div>
      </div>
    </section>
  )
}