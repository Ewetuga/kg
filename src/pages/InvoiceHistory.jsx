import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, Download } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatNaira, formatDate } from '../utils/format'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export default function InvoiceHistory() {
  const { invoices } = useCart()

  const downloadPDF = (inv) => {
    const doc = new jsPDF({ unit:'mm', format:'a4' })
    doc.setFillColor(14,59,46)
    doc.rect(0,0,210,32,'F')
    doc.setTextColor(227,178,60); doc.setFont('helvetica','bold'); doc.setFontSize(22)
    doc.text('KOGBAAGIDI', 14, 18)
    doc.setTextColor(247,241,227); doc.setFontSize(10)
    doc.text('Premium Nigerian Foodstuffs', 14, 25)
    doc.setTextColor(20,32,27); doc.setFontSize(18); doc.setFont('helvetica','bold')
    doc.text('INVOICE', 196, 46, { align:'right' })
    doc.setFontSize(10); doc.setFont('helvetica','normal')
    doc.text(`Ref: ${inv.ref}`, 196, 52, { align:'right' })
    doc.text(`Date: ${formatDate(inv.date)}`, 196, 57, { align:'right' })
    doc.setFont('helvetica','bold'); doc.text('Billed To:', 14, 46)
    doc.setFont('helvetica','normal')
    doc.text(inv.customer.fullName, 14, 52)
    doc.text(inv.customer.address, 14, 57, { maxWidth:90 })
    doc.text(inv.customer.phone, 14, 62)
    autoTable(doc, {
      startY: 78,
      head: [['Product','Qty','Unit Price','Subtotal']],
      body: inv.items.map(i => [i.name, i.qty, formatNaira(i.price), formatNaira(i.price*i.qty)]),
      theme:'grid',
      headStyles:{ fillColor:[14,59,46], textColor:[247,241,227] }
    })
    const y = doc.lastAutoTable.finalY + 10
    doc.text(`Subtotal: ${formatNaira(inv.subtotal)}`, 196, y, { align:'right' })
    doc.text(`Delivery: ${formatNaira(inv.delivery)}`, 196, y+6, { align:'right' })
    doc.setFont('helvetica','bold'); doc.setFontSize(12)
    doc.text(`Grand Total: ${formatNaira(inv.grandTotal)}`, 196, y+14, { align:'right' })
    doc.save(`${inv.ref}.pdf`)
  }

  return (
    <div style={{paddingTop:120,paddingBottom:80,background:'#FBF7EC',minHeight:'100vh'}}>
      <div className="container">
        <div style={{marginBottom:'2rem'}}>
          <span className="eyebrow">Your Invoices</span>
          <h1 style={{fontSize:'clamp(1.9rem,3.6vw,2.6rem)',color:'#0a2a20'}}>Invoice History</h1>
          <p style={{color:'#5C6B63',marginTop:'.4rem'}}>Reopen or re-download any previously generated demo invoice.</p>
        </div>

        {invoices.length === 0 ? (
          <div style={{background:'#fff',borderRadius:20,padding:'3rem',textAlign:'center',
            border:'1px dashed rgba(20,32,27,.15)'}}>
            <FileText size={36} color="#8a948f" style={{margin:'0 auto 1rem'}}/>
            <h3 style={{color:'#0a2a20',marginBottom:'.5rem'}}>No invoices yet</h3>
            <p style={{color:'#5C6B63',marginBottom:'1.4rem'}}>Generate an invoice from the checkout page to see it here.</p>
            <Link to="/checkout" className="btn btn-primary">Go to Checkout</Link>
          </div>
        ) : (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'1.2rem'}}>
            {invoices.map((inv,i)=>(
              <motion.div key={inv.ref} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
                transition={{delay:i*0.05}}
                style={{background:'#fff',borderRadius:16,padding:'1.4rem',
                  border:'1px solid rgba(20,32,27,.06)'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                  <div>
                    <div style={{fontSize:'.72rem',fontWeight:700,color:'#8a948f',
                      letterSpacing:'.1em',textTransform:'uppercase'}}>Invoice</div>
                    <div style={{fontFamily:'Plus Jakarta Sans, sans-serif',fontWeight:800,
                      color:'#0a2a20',marginTop:'.2rem'}}>{inv.ref}</div>
                  </div>
                  <span style={{padding:'.3rem .7rem',borderRadius:999,background:'rgba(227,178,60,.18)',
                    color:'#0a2a20',fontSize:'.7rem',fontWeight:700}}>Demo</span>
                </div>
                <div style={{fontSize:'.82rem',color:'#5C6B63',marginTop:'.8rem'}}>
                  {inv.customer.fullName} · {formatDate(inv.date)}
                </div>
                <div style={{fontSize:'.82rem',color:'#5C6B63'}}>
                  {inv.items.length} items · {formatNaira(inv.grandTotal)}
                </div>
                <div style={{display:'flex',gap:'.5rem',marginTop:'1.1rem'}}>
                  <button onClick={()=>downloadPDF(inv)} className="btn btn-primary"
                    style={{flex:1,justifyContent:'center',padding:'.6rem'}}>
                    <Download size={14}/> PDF
                  </button>
                  <Link to="/checkout" className="btn btn-outline"
                    style={{flex:1,justifyContent:'center',padding:'.6rem'}}>Reopen</Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}