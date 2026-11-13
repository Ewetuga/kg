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

// jsPDF's built-in Helvetica has NO ₦ glyph — using ₦ in PDF corrupts the amount.
// Format for PDF with "NGN" prefix instead.
const pdfNaira = (value) =>
  'NGN ' + new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 }).format(Number(value) || 0)

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
    const PAGE_W = 210
    const MARGIN = 14
    const RIGHT = PAGE_W - MARGIN   // 196

    // ── Header banner ──────────────────────────────────────
    doc.setFillColor(14,59,46)
    doc.rect(0, 0, PAGE_W, 32, 'F')
    doc.setTextColor(227,178,60)
    doc.setFont('helvetica','bold'); doc.setFontSize(22)
    doc.text('KOGBAAGIDI', MARGIN, 18)
    doc.setTextColor(247,241,227); doc.setFontSize(10)
    doc.text('Premium Nigerian Foodstuffs', MARGIN, 25)

    // ── Invoice meta (right side) ──────────────────────────
    doc.setTextColor(20,32,27)
    doc.setFontSize(18); doc.setFont('helvetica','bold')
    doc.text('INVOICE', RIGHT, 46, { align:'right' })
    doc.setFontSize(10); doc.setFont('helvetica','normal')
    doc.text(`Ref: ${invoice.ref}`, RIGHT, 52, { align:'right' })
    doc.text(`Date: ${formatDate(invoice.date)}`, RIGHT, 57, { align:'right' })

    // ── Customer block (left) ──────────────────────────────
    doc.setFont('helvetica','bold'); doc.setFontSize(11)
    doc.text('Billed To:', MARGIN, 46)
    doc.setFont('helvetica','normal'); doc.setFontSize(10)
    let y = 52
    doc.text(invoice.customer.fullName, MARGIN, y); y += 5
    doc.text(invoice.customer.address, MARGIN, y, { maxWidth: 90 }); y += 5
    doc.text(invoice.customer.phone, MARGIN, y); y += 5
    if (invoice.customer.email) { doc.text(invoice.customer.email, MARGIN, y); y += 5 }

    // ── Items table ────────────────────────────────────────
    autoTable(doc, {
      startY: 78,
      margin: { left: MARGIN, right: MARGIN },
      head: [['Product','Qty','Unit Price','Subtotal']],
      body: invoice.items.map(i => [
        i.name,
        i.qty,
        pdfNaira(i.price),
        pdfNaira(i.price * i.qty),
      ]),
      theme: 'grid',
      headStyles: { fillColor:[14,59,46], textColor:[247,241,227], fontStyle:'bold' },
      styles: { fontSize: 9, cellPadding: 3 },
      columnStyles: {
        0: { cellWidth: 92 },
        1: { halign:'center', cellWidth: 20 },
        2: { halign:'right', cellWidth: 34 },
        3: { halign:'right', cellWidth: 36 },
      },
    })

    // ── Totals block ───────────────────────────────────────
    let afterY = doc.lastAutoTable.finalY + 8
    const labelX = 140
    const valueX = RIGHT

    doc.setFontSize(10); doc.setFont('helvetica','normal')
    doc.setTextColor(92,107,99)
    doc.text('Subtotal:', labelX, afterY)
    doc.setTextColor(20,32,27)
    doc.text(pdfNaira(invoice.subtotal), valueX, afterY, { align:'right' })
    afterY += 6

    doc.setTextColor(92,107,99)
    doc.text('Delivery:', labelX, afterY)
    doc.setTextColor(20,32,27)
    doc.text(pdfNaira(invoice.delivery), valueX, afterY, { align:'right' })
    afterY += 8

    // Divider
    doc.setDrawColor(14,59,46); doc.setLineWidth(0.6)
    doc.line(labelX, afterY - 3, valueX, afterY - 3)

    // Grand total — bold and larger
    doc.setFont('helvetica','bold'); doc.setFontSize(12)
    doc.setTextColor(14,59,46)
    doc.text('Grand Total:', labelX, afterY)
    doc.text(pdfNaira(invoice.grandTotal), valueX, afterY, { align:'right' })
    afterY += 10

    // ── Notes / thank-you ──────────────────────────────────
    if (invoice.customer.notes) {
      doc.setFontSize(9); doc.setFont('helvetica','normal')
      doc.setTextColor(92,107,99)
      doc.text('Notes:', MARGIN, afterY)
      doc.text(invoice.customer.notes, MARGIN + 14, afterY, { maxWidth: 160 })
      afterY += 8
    }

    // Footer — pin to bottom of the page
    const pageH = doc.internal.pageSize.getHeight()   // 297 for A4
    doc.setDrawColor(230,230,230); doc.setLineWidth(0.2)
    doc.line(MARGIN, pageH - 18, RIGHT, pageH - 18)
    doc.setFontSize(9); doc.setFont('helvetica','normal'); doc.setTextColor(92,107,99)
    doc.text('Thank you for shopping with KOGBAAGIDI.', MARGIN, pageH - 12)
    doc.setFontSize(8); doc.setFont('helvetica','italic'); doc.setTextColor(140,148,143)
    doc.text('Demo invoice — no payment has been processed.', MARGIN, pageH - 7)

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