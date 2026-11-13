import { useState } from 'react'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import FeaturedProducts from '../components/FeaturedProducts'
import Promo from '../components/Promo'
import WhyChooseUs from '../components/WhyChooseUs'
import About from '../components/About'
import Testimonials from '../components/Testimonials'
import Newsletter from '../components/Newsletter'
import QuickViewModal from '../components/QuickViewModal'

export default function Home() {
  const [quickView, setQuickView] = useState(null)
  return (
    <>
      <Hero/>
      <Categories/>
      <FeaturedProducts onQuickView={setQuickView}/>
      <Promo/>
      <WhyChooseUs/>
      <About/>
      <Testimonials/>
      <Newsletter/>
      {quickView && <QuickViewModal product={quickView} onClose={()=>setQuickView(null)}/>}
    </>
  )
}