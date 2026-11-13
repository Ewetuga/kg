import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Download, Printer, Share2, MessageCircle, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { useCart } from '../context/CartContext'
import { formatNaira, formatDate } from '../utils/format'
import { generateInvoiceRef } from '../utils/invoice'
import { WHATSAPP_NUMBER } from '../data/products'
import InvoicePreview from '../components/InvoicePreview'

export default function Checkout() {
  const { items, totals, deliveryFee, setDeliveryFee, clearCart, saveInvoice } = useCart()
  const navigate = useNavigate()
  const invoiceRef = useRef(null)

  const [customer, setCustomer] = useState({
    fullName:'', phone:'', email:'', address:'', notes:''
  })
  const [errors, setErrors] = useState({})
  const [invoice, setInvoice] = useState(null)

  const validate = () => {
    const e = {}
    if (!customer.fullName.trim()) e.fullName = 'Full name is required.'
    if (!customer.phone.trim()) e.phone = 'Phone number is required.'
    if (!customer.address.trim()) e.address = 'Delivery address is required.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const generate = () => {
    if (!validate()) return
    if (items.length === 0) return alert('Your cart is empty.')
    const inv = {
      ref: generateInvoiceRef(),
      date: new Date().toISOString(),
      customer: { ...customer },
      items: [...items],
      subtotal: totals.subtotal,
      delivery: deliveryFee,
      grandTotal: totals.subtotal + deliveryFee,
    }
    setInvoice(inv)
    saveInvoice(inv)
  }

  const downloadPDF = () => {
    if (!invoice) return
    const doc = new jsPDF({ unit:'mm', format:'a4' })
    doc.setFillColor(14,59,46)
    doc.rect(0,0,210,32,'F')
    doc.setTextColor(227,178,60)
    doc.setFont('helvetica','bold'); doc.setFontSize(22)
    doc.text('KOGBAAGIDI', 14, 18)
    doc.setTextColor(247,241,227); doc.setFontSize(10)
    doc.text('Premium Nigerian Foodstuffs', 14, 25)
    doc.setTextColor(20,32,27)
    doc.setFontSize(18); doc.setFont('helvetica','bold')
    doc.text('INVOICE', 196, 46, { align:'right' })
    doc.setFontSize(10); doc.setFont('helvetica','normal')
    doc.text(`Ref: ${invoice.ref}`, 196, 52, { align:'right' })
    doc.text(`Date: ${formatDate(invoice.date)}`, 196, 57, { align:'right' })

    doc.setFont('helvetica','bold'); doc.setFontSize(11)
    doc.text('Billed To:', 14, 46)
    doc.setFont('helvetica','normal'); doc.setFontSize(10)
    doc.text(invoice.customer.fullName, 14, 52)
    doc.text(invoice.customer.address, 14, 57, { maxWidth:90 })
    doc.text(invoice.customer.phone, 14, 62)
    if (invoice.customer.email) doc.text(invoice.customer.email, 14, 67)

    autoTable(doc, {
      startY: 78,
      head: [['Product','Qty','Unit Price','Subtotal']],
      body: invoice.items.map(i => [i.name, i.qty, formatNaira(i.price), formatNaira(i.price*i.qty)]),
      theme: 'grid',
      headStyles: { fillColor:[14,59,46], textColor:[247,241,227] },
      styles: { fontSize:9 },
      columnStyles: {
        1:{ halign:'center' }, 2:{ halign:'right' }, 3:{ halign:'right' }
      }
    })

    const afterY = doc.lastAutoTable.finalY + 10
    doc.setFontSize(10); doc.setFont('helvetica','normal')
    doc.text(`Subtotal: ${formatNaira(invoice.subtotal)}`, 196, afterY, { align:'right' })
    doc.text(`Delivery: ${formatNaira(invoice.delivery)}`, 196, afterY+6, { align:'right' })
    doc.setFont('helvetica','bold'); doc.setFontSize(12)
    doc.text(`Grand Total: ${formatNaira(invoice.grandTotal)}`, 196, afterY+14, { align:'right' })
    doc.setFontSize(8); doc.setFont('helvetica','italic'); doc.setTextColor(120,128,124)
    doc.text('Demo invoice — no payment has been processed.', 14, 285)
    doc.save(`${invoice.ref}.pdf`)
  }

  const printInvoice = () => window.print()

  const shareInvoice = async () => {
    if (!invoice) return
    const text = buildWhatsAppText(invoice)
    if (navigator.share) {
      try { await navigator.share({ title:'KOGBAAGIDI Invoice', text }) } catch {}
    } else {
      await navigator.clipboard.writeText(text)
      alert('Invoice details copied to clipboard (Web Share unavailable).')
    }
  }

  const whatsapp = () => {
    if (!invoice) return
    const text = encodeURIComponent(buildWhatsAppText(invoice))
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank')
  }

  if (items.length === 0 && !invoice) {
    return (
      <div style={{paddingTop:160,paddingBottom:80,textAlign:'center',minHeight:'60vh'}}>
        <div style={{width:80,height:80,borderRadius:'50%',background:'rgba(14,59,46,.08)',
          display:'grid',placeItems:'center',margin:'0 auto 1.4rem'}}>
          <ShoppingBag size={32} color="#0E3B2E"/>
        </div>
        <h1 style={{fontSize:'1.8rem',color:'#0a2a20',marginBottom:'.5rem'}}>Your cart is empty</h1>
        <p style={{color:'#5C6B63',marginBottom:'1.6rem'}}>Add products before checking out.</p>
        <Link to="/shop" className="btn btn-primary">Back to Shop</Link>
      </div>
    )
  }

  return (
    <div style={{paddingTop:120,paddingBottom:80,background:'#FBF7EC',minHeight:'100vh'}}>
      <div className="container">
        <div className="no-print" style={{display:'flex',alignItems:'center',justifyContent:'space-between',
          flexWrap:'wrap',gap:'1rem',marginBottom:'2rem'}}>
          <div>
            <Link to="/shop" style={{display:'inline-flex',alignItems:'center',gap:'.4rem',
              fontSize:'.85rem',color:'#0E3B2E',fontWeight:600,marginBottom:'.6rem'}}>
              <ArrowLeft size={15}/> Continue Shopping
            </Link>
            <h1 style={{fontSize:'clamp(1.9rem,3.4vw,2.6rem)',color:'#0a2a20'}}>Checkout & Invoice</h1>
            <p style={{color:'#5C6B63',fontSize:'.95rem'}}>Demo checkout — no payment will be processed.</p>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2rem'}} className="checkout-grid">
          <style>{`@media (max-width:960px){.checkout-grid{grid-template-columns:1fr!important}}`}</style>

          {/* Customer form */}
          <div className="no-print" style={{background:'#fff',padding:'1.8rem',borderRadius:20,
            border:'1px solid rgba(20,32,27,.06)',alignSelf:'start'}}>
            <h2 style={{fontSize:'1.2rem',color:'#0a2a20',marginBottom:'1.2rem'}}>Customer Details</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'.9rem'}}>
              <Field label="Full Name *" value={customer.fullName}
                onChange={v=>setCustomer(c=>({...c,fullName:v}))} error={errors.fullName}/>
              <Field label="Phone Number *" value={customer.phone}
                onChange={v=>setCustomer(c=>({...c,phone:v}))} error={errors.phone}/>
              <Field label="Email (optional)" value={customer.email}
                onChange={v=>setCustomer(c=>({...c,email:v}))} type="email"/>
              <Field label="Delivery Address *" value={customer.address}
                onChange={v=>setCustomer(c=>({...c,address:v}))} error={errors.address} textarea/>
              <Field label="Order Notes (optional)" value={customer.notes}
                onChange={v=>setCustomer(c=>({...c,notes:v}))} textarea/>
              <Field label="Delivery Fee (₦)" value={deliveryFee}
                onChange={v=>setDeliveryFee(Number(v) || 0)} type="number"/>
            </div>

            <div style={{marginTop:'1.4rem',display:'flex',gap:'.6rem',flexWrap:'wrap'}}>
              <button onClick={generate} className="btn btn-gold" style={{flex:'1 1 auto',justifyContent:'center'}}>
                Generate Invoice
              </button>
              <button onClick={()=>{ if(confirm('Clear your cart?')) { clearCart(); setInvoice(null) } }}
                className="btn btn-outline" style={{color:'#c0392b',borderColor:'#c0392b'}}>
                <Trash2 size={15}/> Clear Cart
              </button>
            </div>

            {/* Cart summary */}
            <div style={{marginTop:'1.6rem',borderTop:'1px dashed rgba(20,32,27,.15)',paddingTop:'1.2rem'}}>
              <h3 style={{fontSize:'.95rem',color:'#0a2a20',marginBottom:'.8rem'}}>Cart Summary</h3>
              {items.map(i=>(
                <div key={i.id} style={{display:'flex',justifyContent:'space-between',
                  fontSize:'.85rem',padding:'.3rem 0'}}>
                  <span>{i.name} × {i.qty}</span>
                  <span>{formatNaira(i.price*i.qty)}</span>
                </div>
              ))}
              <div style={{display:'flex',justifyContent:'space-between',fontWeight:700,
                marginTop:'.6rem',paddingTop:'.6rem',borderTop:'1px solid rgba(20,32,27,.08)'}}>
                <span>Subtotal</span><span>{formatNaira(totals.subtotal)}</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',fontWeight:700,
                color:'#0E3B2E',fontSize:'1.05rem',marginTop:'.4rem'}}>
                <span>Grand Total</span><span>{formatNaira(totals.subtotal + deliveryFee)}</span>
              </div>
            </div>
          </div>

          {/* Invoice preview */}
          <div style={{position:'relative'}}>
            {invoice ? (
              <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
                <div ref={invoiceRef}>
                  <InvoicePreview invoice={invoice}/>
                </div>
                <div className="no-print" style={{display:'flex',flexWrap:'wrap',gap:'.6rem',
                  marginTop:'1.4rem',justifyContent:'center'}}>
                  <button onClick={downloadPDF} className="btn btn-primary"><Download size={15}/> Download PDF</button>
                  <button onClick={printInvoice} className="btn btn-outline"><Printer size={15}/> Print</button>
                  <button onClick={shareInvoice} className="btn btn-outline"><Share2 size={15}/> Share</button>
                  <button onClick={whatsapp} className="btn btn-gold"><MessageCircle size={15}/> Send via WhatsApp</button>
                </div>
                <p className="no-print" style={{fontSize:'.78rem',color:'#8a948f',
                  marginTop:'1rem',textAlign:'center'}}>
                  WhatsApp messaging opens with a pre-filled invoice message — payment is not automatic.
                </p>
              </motion.div>
            ) : (
              <div style={{background:'#fff',borderRadius:20,padding:'3rem 1.5rem',textAlign:'center',
                border:'1px dashed rgba(20,32,27,.15)',height:'100%',display:'grid',placeItems:'center'}}>
                <div>
                  <h3 style={{color:'#0a2a20',marginBottom:'.5rem'}}>Invoice Preview</h3>
                  <p style={{color:'#5C6B63',fontSize:'.9rem',maxWidth:300,margin:'0 auto'}}>
                    Fill in your details and click “Generate Invoice” to preview your professional invoice here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, error, type='text', textarea }) {
  return (
    <div>
      <label style={{display:'block',fontSize:'.78rem',fontWeight:700,color:'#5C6B63',
        marginBottom:'.3rem',textTransform:'uppercase',letterSpacing:'.06em'}}>{label}</label>
      {textarea ? (
        <textarea value={value} onChange={e=>onChange(e.target.value)} rows={2}
          style={{width:'100%',padding:'.7rem .9rem',borderRadius:10,
            border:`1px solid ${error ? '#c0392b' : 'rgba(20,32,27,.12)'}`,outline:'none',resize:'vertical'}}/>
      ) : (
        <input type={type} value={value} onChange={e=>onChange(e.target.value)}
          style={{width:'100%',padding:'.7rem .9rem',borderRadius:10,
            border:`1px solid ${error ? '#c0392b' : 'rgba(20,32,27,.12)'}`,outline:'none'}}/>
      )}
      {error && <div style={{color:'#c0392b',fontSize:'.75rem',marginTop:'.2rem'}}>{error}</div>}
    </div>
  )
}

function buildWhatsAppText(inv) {
  const lines = [
    `*KOGBAAGIDI INVOICE*`,
    `Ref: ${inv.ref}`,
    `Date: ${formatDate(inv.date)}`,
    ``,
    `*Customer*`,
    `Name: ${inv.customer.fullName}`,
    `Phone: ${inv.customer.phone}`,
    inv.customer.email ? `Email: ${inv.customer.email}` : null,
    `Address: ${inv.customer.address}`,
    inv.customer.notes ? `Notes: ${inv.customer.notes}` : null,
    ``,
    `*Items*`,
    ...inv.items.map(i => `• ${i.name} × ${i.qty} — ${formatNaira(i.price*i.qty)}`),
    ``,
    `Subtotal: ${formatNaira(inv.subtotal)}`,
    `Delivery: ${formatNaira(inv.delivery)}`,
    `*Grand Total: ${formatNaira(inv.grandTotal)}*`,
    ``,
    `(Demo invoice — no payment processed)`
  ].filter(Boolean)
  return lines.join('\n')
}