import { forwardRef } from 'react'
import { formatNaira, formatDate } from '../utils/format'

const InvoicePreview = forwardRef(function InvoicePreview({ invoice }, ref) {
  if (!invoice) return null
  const { ref: invRef, date, customer, items, subtotal, delivery, grandTotal } = invoice

  return (
    <div ref={ref} id="invoice-print-area"
      style={{background:'#fff',padding:'2.5rem',borderRadius:16,
        boxShadow:'0 12px 40px rgba(14,59,46,.1)',maxWidth:820,margin:'0 auto',color:'#14201B'}}>
      {/* Header */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',
        paddingBottom:'1.5rem',borderBottom:'3px solid #0E3B2E'}}>
        <div>
          <div style={{display:'flex',alignItems:'center',gap:'.6rem',marginBottom:'.4rem'}}>
            <span style={{width:40,height:40,borderRadius:10,display:'grid',placeItems:'center',
              background:'linear-gradient(135deg, #0E3B2E, #14513D)',color:'#E3B23C',
              fontWeight:800,fontFamily:'Plus Jakarta Sans, sans-serif',fontSize:'1.2rem'}}>K</span>
            <span style={{fontFamily:'Plus Jakarta Sans, sans-serif',fontWeight:800,fontSize:'1.3rem',color:'#0a2a20'}}>
              KOGBAAGIDI
            </span>
          </div>
          <div style={{fontSize:'.8rem',color:'#5C6B63'}}>Premium Nigerian Foodstuffs</div>
          <div style={{fontSize:'.8rem',color:'#5C6B63'}}>Lagos, Nigeria · +234 800 000 0000</div>
        </div>
        <div style={{textAlign:'right'}}>
          <div style={{fontFamily:'Plus Jakarta Sans, sans-serif',fontWeight:800,fontSize:'1.6rem',color:'#0E3B2E'}}>
            INVOICE
          </div>
          <div style={{fontSize:'.82rem',color:'#5C6B63'}}>Ref: <strong style={{color:'#0a2a20'}}>{invRef}</strong></div>
          <div style={{fontSize:'.82rem',color:'#5C6B63'}}>Date: <strong style={{color:'#0a2a20'}}>{formatDate(date)}</strong></div>
        </div>
      </div>

      {/* Customer */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.5rem',padding:'1.5rem 0'}}>
        <div>
          <div style={{fontSize:'.72rem',fontWeight:700,letterSpacing:'.12em',
            textTransform:'uppercase',color:'#8a948f',marginBottom:'.4rem'}}>Billed To</div>
          <div style={{fontWeight:700,color:'#0a2a20'}}>{customer.fullName}</div>
          <div style={{fontSize:'.85rem',color:'#5C6B63'}}>{customer.address}</div>
          <div style={{fontSize:'.85rem',color:'#5C6B63'}}>{customer.phone}</div>
          {customer.email && <div style={{fontSize:'.85rem',color:'#5C6B63'}}>{customer.email}</div>}
        </div>
        <div style={{textAlign:'right'}}>
          <div style={{fontSize:'.72rem',fontWeight:700,letterSpacing:'.12em',
            textTransform:'uppercase',color:'#8a948f',marginBottom:'.4rem'}}>Payment</div>
          <div style={{display:'inline-block',padding:'.3rem .8rem',borderRadius:999,
            background:'rgba(227,178,60,.18)',color:'#0a2a20',fontSize:'.78rem',fontWeight:700}}>
            Demo Invoice
          </div>
        </div>
      </div>

      {/* Items table */}
      <table style={{width:'100%',borderCollapse:'collapse',marginTop:'.5rem'}}>
        <thead>
          <tr style={{background:'#0E3B2E',color:'#F7F1E3'}}>
            <th style={{textAlign:'left',padding:'.7rem .8rem',fontSize:'.78rem',fontWeight:700}}>Product</th>
            <th style={{textAlign:'center',padding:'.7rem .8rem',fontSize:'.78rem',fontWeight:700,width:70}}>Qty</th>
            <th style={{textAlign:'right',padding:'.7rem .8rem',fontSize:'.78rem',fontWeight:700,width:110}}>Unit Price</th>
            <th style={{textAlign:'right',padding:'.7rem .8rem',fontSize:'.78rem',fontWeight:700,width:120}}>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it,i)=>(
            <tr key={it.id} style={{borderBottom:'1px solid rgba(20,32,27,.08)',
              background: i%2 ? '#FBF7EC' : '#fff'}}>
              <td style={{padding:'.7rem .8rem',fontSize:'.88rem'}}>{it.name}</td>
              <td style={{padding:'.7rem .8rem',textAlign:'center',fontSize:'.88rem'}}>{it.qty}</td>
              <td style={{padding:'.7rem .8rem',textAlign:'right',fontSize:'.88rem'}}>{formatNaira(it.price)}</td>
              <td style={{padding:'.7rem .8rem',textAlign:'right',fontSize:'.88rem',fontWeight:700}}>
                {formatNaira(it.price * it.qty)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div style={{display:'flex',justifyContent:'flex-end',marginTop:'1.2rem'}}>
        <div style={{width:'100%',maxWidth:300}}>
          <TotalRow label="Subtotal" value={formatNaira(subtotal)}/>
          <TotalRow label="Delivery Fee" value={formatNaira(delivery)}/>
          <div style={{display:'flex',justifyContent:'space-between',marginTop:'.6rem',
            paddingTop:'.7rem',borderTop:'2px solid #0E3B2E'}}>
            <span style={{fontWeight:800,color:'#0a2a20'}}>Grand Total</span>
            <span style={{fontFamily:'Plus Jakarta Sans, sans-serif',fontWeight:800,
              fontSize:'1.1rem',color:'#0E3B2E'}}>{formatNaira(grandTotal)}</span>
          </div>
        </div>
      </div>

      {customer.notes && (
        <div style={{marginTop:'1.5rem',padding:'1rem',background:'#FBF7EC',
          borderRadius:10,fontSize:'.82rem',color:'#5C6B63'}}>
          <strong style={{color:'#0a2a20'}}>Notes:</strong> {customer.notes}
        </div>
      )}

      <div style={{marginTop:'2rem',paddingTop:'1rem',borderTop:'1px solid rgba(20,32,27,.08)',
        fontSize:'.72rem',color:'#8a948f',textAlign:'center'}}>
        This is a demo invoice generated by KOGBAAGIDI. No payment has been processed.
      </div>
    </div>
  )
})

function TotalRow({ label, value }) {
  return (
    <div style={{display:'flex',justifyContent:'space-between',fontSize:'.88rem',
      color:'#5C6B63',padding:'.25rem 0'}}>
      <span>{label}</span><span>{value}</span>
    </div>
  )
}

export default InvoicePreview