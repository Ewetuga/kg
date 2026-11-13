import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Check } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | error | success

  const submit = (e) => {
    e.preventDefault()
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    if (!ok) return setStatus('error')
    setStatus('success')
    setEmail('')
  }

  return (
    <section className="section" style={{background:'#FBF7EC'}}>
      <div className="container">
        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}}
          viewport={{once:true,margin:'-60px'}} transition={{duration:.7}}
          style={{position:'relative',borderRadius:32,overflow:'hidden',
            background:'linear-gradient(135deg, #0E3B2E 0%, #14513D 100%)',
            padding:'3.5rem 2rem',textAlign:'center',boxShadow:'0 30px 60px rgba(14,59,46,.2)'}}>
          <div style={{position:'absolute',top:'-30%',right:'-10%',width:340,height:340,borderRadius:'50%',
            background:'radial-gradient(circle, rgba(227,178,60,.25), transparent 70%)'}}/>
          <div style={{position:'relative',zIndex:2,maxWidth:560,margin:'0 auto'}}>
            <div style={{width:56,height:56,borderRadius:16,background:'rgba(227,178,60,.18)',
              display:'grid',placeItems:'center',margin:'0 auto 1.2rem'}}>
              <Mail size={26} color="#E3B23C"/>
            </div>
            <h2 style={{color:'#F7F1E3',fontSize:'clamp(1.7rem,3vw,2.3rem)'}}>Stay Updated With KOGBAAGIDI</h2>
            <p style={{color:'rgba(247,241,227,.78)',marginTop:'.8rem',fontSize:'.98rem'}}>
              Get early access to new stock, seasonal deals and exclusive discounts. No spam — just good food news.
            </p>

            <form onSubmit={submit} style={{display:'flex',gap:'.6rem',marginTop:'1.8rem',flexWrap:'wrap',
              justifyContent:'center'}}>
              <input type="email" value={email} onChange={e=>{setEmail(e.target.value);setStatus('idle')}}
                placeholder="Enter your email address"
                style={{flex:'1 1 260px',padding:'.95rem 1.2rem',borderRadius:999,
                  border:'1px solid rgba(255,255,255,.2)',background:'rgba(255,255,255,.12)',
                  color:'#fff',outline:'none',backdropFilter:'blur(10px)'}}/>
              <button type="submit" className="btn btn-gold">Subscribe</button>
            </form>

            {status === 'error' && (
              <p style={{color:'#ffb4a8',marginTop:'.8rem',fontSize:'.85rem'}}>Please enter a valid email address.</p>
            )}
            {status === 'success' && (
              <motion.p initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}
                style={{color:'#B7E4C7',marginTop:'.8rem',fontSize:'.9rem',
                  display:'inline-flex',alignItems:'center',gap:'.4rem'}}>
                <Check size={16}/> Thanks for subscribing! (Demo only)
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}