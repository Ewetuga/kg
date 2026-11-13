import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { products } from '../data/products'
import ProductCard from './ProductCard'
import Reveal from './Reveal'

export default function FeaturedProducts({ onQuickView }) {
  return (
    <section className="section" style={{background:'#fff'}}>
      <div className="container">
        <Reveal>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',
            gap:'2rem',marginBottom:'3rem',flexWrap:'wrap'}}>
            <div className="section-head" style={{marginBottom:0}}>
              <span className="eyebrow">Featured Products</span>
              <h2>Our best-loved foodstuffs</h2>
              <p>Carefully selected, competitively priced, and delivered fresh.</p>
            </div>
            <Link to="/shop" className="btn btn-outline">View All <ArrowRight size={16}/></Link>
          </div>
        </Reveal>

        <style>{`
          .prod-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.4rem}
          @media (max-width:1024px){.prod-grid{grid-template-columns:repeat(3,1fr)}}
          @media (max-width:768px){.prod-grid{grid-template-columns:repeat(2,1fr)}}
          @media (max-width:480px){.prod-grid{grid-template-columns:1fr}}
        `}</style>

        <div className="prod-grid">
          {products.slice(0,8).map(p => (
            <ProductCard key={p.id} product={p} onQuickView={onQuickView}/>
          ))}
        </div>
      </div>
    </section>
  )
}