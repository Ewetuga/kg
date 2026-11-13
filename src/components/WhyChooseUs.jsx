import { ShieldCheck, Sparkles, Wallet, Headphones, ShoppingBag } from 'lucide-react'
import Reveal from './Reveal'

const items = [
  { icon:ShieldCheck, title:'Quality Products', desc:'Every item is vetted for freshness and standard before it reaches you.' },
  { icon:Sparkles, title:'Carefully Selected', desc:'We handpick the finest Nigerian foodstuffs from trusted suppliers.' },
  { icon:Wallet, title:'Affordable Pricing', desc:'Fair, transparent prices with no hidden charges or surprises.' },
  { icon:Headphones, title:'Reliable Support', desc:'Friendly, responsive customer service whenever you need help.' },
  { icon:ShoppingBag, title:'Convenient Shopping', desc:'Order in seconds and get everything delivered to your door.' },
]

export default function WhyChooseUs() {
  return (
    <section className="section" style={{background:'#fff'}}>
      <div className="container">
        <Reveal>
          <div className="section-head" style={{textAlign:'center',margin:'0 auto 3rem'}}>
            <span className="eyebrow">Why Choose Us</span>
            <h2>Built on trust and quality</h2>
            <p>KOGBAAGIDI makes premium Nigerian foodstuffs accessible, dependable and convenient.</p>
          </div>
        </Reveal>

        <style>{`
          .why-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:1.2rem}
          @media (max-width:1024px){.why-grid{grid-template-columns:repeat(3,1fr)}}
          @media (max-width:640px){.why-grid{grid-template-columns:repeat(2,1fr)}}
          @media (max-width:420px){.why-grid{grid-template-columns:1fr}}
          .why-card{padding:1.6rem 1.3rem;border-radius:20px;background:#FBF7EC;
            border:1px solid rgba(20,32,27,.06);transition:transform .3s, box-shadow .3s}
          .why-card:hover{transform:translateY(-5px);box-shadow:0 18px 40px rgba(14,59,46,.1)}
        `}</style>

        <div className="why-grid">
          {items.map((it,i)=>(
            <Reveal key={it.title} delay={i*0.08}>
              <div className="why-card">
                <div style={{width:52,height:52,borderRadius:14,marginBottom:'1.1rem',
                  background:'linear-gradient(135deg, #0E3B2E, #14513D)',display:'grid',placeItems:'center'}}>
                  <it.icon size={24} color="#E3B23C"/>
                </div>
                <h3 style={{fontSize:'1.02rem',marginBottom:'.45rem',color:'#0a2a20'}}>{it.title}</h3>
                <p style={{fontSize:'.85rem',color:'#5C6B63',lineHeight:1.55}}>{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}