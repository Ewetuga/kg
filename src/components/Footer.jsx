import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="contact" style={{background:'#0a2a20',color:'rgba(247,241,227,.75)',paddingTop:'4rem'}}>
      <div className="container">
        <div style={{display:'grid',gridTemplateColumns:'1.6fr 1fr 1fr 1.4fr',gap:'2.5rem',
          paddingBottom:'3rem'}} className="footer-grid">
          <style>{`
            @media (max-width:900px){.footer-grid{grid-template-columns:1fr 1fr!important}}
            @media (max-width:520px){.footer-grid{grid-template-columns:1fr!important}}
          `}</style>

          <div>
            <div style={{display:'flex',alignItems:'center',gap:'.6rem',marginBottom:'1rem'}}>
              <span style={{width:38,height:38,borderRadius:12,display:'grid',placeItems:'center',
                background:'linear-gradient(135deg, #14513D, #0E3B2E)',color:'#E3B23C',
                fontWeight:800,fontFamily:'Plus Jakarta Sans, sans-serif'}}>K</span>
              <span style={{fontFamily:'Plus Jakarta Sans, sans-serif',fontWeight:800,fontSize:'1.15rem',color:'#F7F1E3'}}>KOGBAAGIDI</span>
            </div>
            <p style={{fontSize:'.9rem',lineHeight:1.7,maxWidth:300}}>
              Premium Nigerian foodstuffs, carefully selected and delivered with quality you can trust.
            </p>
            <div style={{display:'flex',gap:'.5rem',marginTop:'1.2rem'}}>
              {[Facebook, Instagram, Twitter].map((Icon,i)=>(
                <a key={i} href="#" aria-label="Social link"
                  style={{width:38,height:38,borderRadius:10,display:'grid',placeItems:'center',
                    background:'rgba(255,255,255,.06)',transition:'background .25s'}}
                  onMouseEnter={e=>e.currentTarget.style.background='rgba(227,178,60,.2)'}
                  onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,.06)'}>
                  <Icon size={17} color="#E3B23C"/>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{color:'#F7F1E3',fontSize:'.95rem',marginBottom:'1rem'}}>Quick Links</h4>
            {[['Home','/'],['Shop','/shop'],['Invoice History','/invoices'],['About Us','/#about']].map(([l,to])=>(
              <Link key={l} to={to} style={{display:'block',fontSize:'.88rem',padding:'.32rem 0',
                color:'rgba(247,241,227,.7)'}}
                onMouseEnter={e=>e.currentTarget.style.color='#E3B23C'}
                onMouseLeave={e=>e.currentTarget.style.color='rgba(247,241,227,.7)'}>{l}</Link>
            ))}
          </div>

          <div>
            <h4 style={{color:'#F7F1E3',fontSize:'.95rem',marginBottom:'1rem'}}>Categories</h4>
            {[['Rice & Grains','rice-grains'],['Beans & Legumes','beans-legumes'],['Cooking Oils','cooking-oils'],['Spices & Seasonings','spices-seasonings']].map(([l,id])=>(
              <Link key={l} to={`/shop?category=${id}`}
                style={{display:'block',fontSize:'.88rem',padding:'.32rem 0',color:'rgba(247,241,227,.7)'}}
                onMouseEnter={e=>e.currentTarget.style.color='#E3B23C'}
                onMouseLeave={e=>e.currentTarget.style.color='rgba(247,241,227,.7)'}>{l}</Link>
            ))}
          </div>

          <div>
            <h4 style={{color:'#F7F1E3',fontSize:'.95rem',marginBottom:'1rem'}}>Contact</h4>
            <div style={{display:'flex',gap:'.6rem',fontSize:'.88rem',padding:'.3rem 0'}}>
              <MapPin size={16} color="#E3B23C" style={{flexShrink:0,marginTop:3}}/>
              <span>Lagos, Nigeria (placeholder address)</span>
            </div>
            <div style={{display:'flex',gap:'.6rem',fontSize:'.88rem',padding:'.3rem 0'}}>
              <Phone size={16} color="#E3B23C" style={{flexShrink:0,marginTop:3}}/>
              <span>+234 800 000 0000</span>
            </div>
            <div style={{display:'flex',gap:'.6rem',fontSize:'.88rem',padding:'.3rem 0'}}>
              <Mail size={16} color="#E3B23C" style={{flexShrink:0,marginTop:3}}/>
              <span>hello@kogbaagidi.example</span>
            </div>
          </div>
        </div>

        <div style={{borderTop:'1px solid rgba(255,255,255,.08)',padding:'1.5rem 0',
          display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:'1rem',fontSize:'.82rem'}}>
          <span>© {new Date().getFullYear()} KOGBAAGIDI. All rights reserved.</span>
          <span>Demo site — prices & testimonials are illustrative.</span>
        </div>
      </div>
    </footer>
  )
}