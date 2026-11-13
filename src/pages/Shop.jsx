import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { products, categories } from '../data/products'
import ProductCard from '../components/ProductCard'
import QuickViewModal from '../components/QuickViewModal'

export default function Shop() {
  const [params] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')
  const [category, setCategory] = useState(params.get('category') || 'all')
  const [sort, setSort] = useState('default')
  const [quickView, setQuickView] = useState(null)

  useEffect(() => {
    setQuery(params.get('q') || '')
    setCategory(params.get('category') || 'all')
  }, [params])

  const filtered = useMemo(() => {
    let list = [...products]
    if (query) {
      const q = query.toLowerCase()
      list = list.filter(p => p.name.toLowerCase().includes(q))
    }
    if (category !== 'all') list = list.filter(p => p.category === category)
    if (sort === 'low') list.sort((a,b) => a.price - b.price)
    if (sort === 'high') list.sort((a,b) => b.price - a.price)
    if (sort === 'name') list.sort((a,b) => a.name.localeCompare(b.name))
    return list
  }, [query, category, sort])

  return (
    <div style={{paddingTop:120,paddingBottom:60,minHeight:'100vh',background:'#FBF7EC'}}>
      <div className="container">
        <div style={{marginBottom:'2rem'}}>
          <span className="eyebrow">Shop</span>
          <h1 style={{fontSize:'clamp(2rem,4vw,3rem)',color:'#0a2a20'}}>All Foodstuffs</h1>
          <p style={{color:'#5C6B63',marginTop:'.6rem'}}>
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'} available · Demo prices in Naira
          </p>
        </div>

        <div style={{display:'flex',gap:'.8rem',flexWrap:'wrap',marginBottom:'1.6rem',
          alignItems:'center',padding:'1rem',background:'#fff',borderRadius:16,
          border:'1px solid rgba(20,32,27,.06)'}}>
          <div style={{position:'relative',flex:'1 1 240px'}}>
            <Search size={16} style={{position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',color:'#8a948f'}}/>
            <input value={query} onChange={e=>setQuery(e.target.value)}
              placeholder="Search products…"
              style={{width:'100%',padding:'.8rem 1rem .8rem 2.6rem',borderRadius:999,
                border:'1px solid rgba(20,32,27,.1)',outline:'none'}}/>
          </div>
          <select value={category} onChange={e=>setCategory(e.target.value)}
            style={{padding:'.8rem 1rem',borderRadius:999,border:'1px solid rgba(20,32,27,.1)',
              background:'#fff',outline:'none',cursor:'pointer'}}>
            <option value="all">All Categories</option>
            {categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select value={sort} onChange={e=>setSort(e.target.value)}
            style={{padding:'.8rem 1rem',borderRadius:999,border:'1px solid rgba(20,32,27,.1)',
              background:'#fff',outline:'none',cursor:'pointer'}}>
            <option value="default">Sort: Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="name">Name: A–Z</option>
          </select>
        </div>

        <style>{`
          .shop-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.4rem}
          @media (max-width:1024px){.shop-grid{grid-template-columns:repeat(3,1fr)}}
          @media (max-width:768px){.shop-grid{grid-template-columns:repeat(2,1fr)}}
          @media (max-width:480px){.shop-grid{grid-template-columns:1fr}}
        `}</style>

        {filtered.length === 0 ? (
          <div style={{textAlign:'center',padding:'4rem 1rem',color:'#5C6B63'}}>
            No products match your filters. Try a different search or category.
          </div>
        ) : (
          <div className="shop-grid">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} onQuickView={setQuickView}/>
            ))}
          </div>
        )}
      </div>

      {quickView && <QuickViewModal product={quickView} onClose={()=>setQuickView(null)}/>}
    </div>
  )
}