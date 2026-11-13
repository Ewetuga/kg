export const formatNaira = (value) =>
  new Intl.NumberFormat('en-NG', { style:'currency', currency:'NGN', maximumFractionDigits:0 }).format(Number(value) || 0)

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-NG', { day:'2-digit', month:'short', year:'numeric' })