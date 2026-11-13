import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { categories } from '../data/products'
import Reveal from './Reveal'

export default function Categories() {
  return (
    <section className="section" id="categories" style={{background:'#FBF7EC'}}>
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">Shop by Category</span>
            <h2>Everything your kitchen needs</h2>
            <p>Explore our curated selection of premium Nigerian foodstuffs, organised for easy shopping.</p>
          </div>
        </Reveal>

        <style>{`
          .cat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.4rem}
          @media (max-width:1024px){.cat-grid{grid-template-columns:repeat(2,1fr)}}
          @media (max-width:520px){.cat-grid{grid-template-columns:1fr}}
          .cat-card{position:relative;border-radius:20px;overflow:hidden;aspect-ratio:4/5;
            display:block;cursor:pointer;transition:transform .4s ease, box-shadow .4s ease}
          .cat-card:hover{transform:translateY(-6px);box-shadow:0 24px 50px rgba(14,59,46,.18)}
          .cat-card img{width:100%;height:100%;object-fit:cover;transition:transform .6s ease}
          .cat-card:hover img{transform:scale(1.08)}
        `}</style>

        <div className="cat-grid">
          {categories.map((c,i)=>(
            <Reveal key={c.id} delay={i*0.06}>
              <Link to={`/shop?category=${c.id}`} className="cat-card">
                <img src={c.img} alt={c.name}/>
                <div style={{position:'absolute',inset:0,
                  background:'linear-gradient(to top, rgba(10,42,32,.88) 0%, rgba(10,42,32,.15) 55%, transparent 100%)'}}/>
                <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'1.4rem',color:'#fff'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',gap:'.5rem'}}>
                    <div>
                      <h3 style={{fontSize:'1.15rem',marginBottom:'.3rem'}}>{c.name}</h3>
                      <p style={{fontSize:'.8rem',color:'rgba(255,255,255,.78)'}}>{c.desc}</p>
                    </div>
                    <span style={{width:34,height:34,borderRadius:'50%',background:'rgba(255,255,255,.2)',
                      display:'grid',placeItems:'center',flexShrink:0}}>
                      <ArrowUpRight size={16}/>
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}