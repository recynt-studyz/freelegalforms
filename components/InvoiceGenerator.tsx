'use client'

import { useState, useEffect, useCallback, ChangeEvent } from 'react'
import jsPDF from 'jspdf'

const STORAGE_KEY = 'flf-invoice'
const COLOR_KEY = 'flf-invoice-color'
const LOGO_KEY = 'flf-invoice-logo'
const TEMPLATES_KEY = 'flf-invoice-templates'
const COUNTER_KEY = 'flf-invoice-counter'

interface Template {
  name: string
  date: string
  data: Record<string, unknown>
}

const CURRENCIES = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'] as const
type Currency = typeof CURRENCIES[number]
const CURRENCY_SYMBOLS: Record<Currency, string> = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$' }

interface LineItem {
  description: string
  quantity: string
  rate: string
}

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

function fmtDate(dateStr: string): string {
  if (!dateStr) return ''
  const [y, m, d] = dateStr.split('-')
  return new Date(+y, +m - 1, +d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function fmtMoney(v: number, sym: string): string {
  return `${sym}${v.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}

function lineTotal(item: LineItem): number {
  return (parseFloat(item.quantity) || 0) * (parseFloat(item.rate) || 0)
}

const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-green-500'
const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
const sectionCls = 'text-xs font-bold uppercase tracking-wider text-green-700 dark:text-green-400 mb-2 mt-5 first:mt-0'

export default function InvoiceGenerator() {
  const [fromName, setFromName] = useState('Your Business Name')
  const [fromStreet, setFromStreet] = useState('')
  const [fromCity, setFromCity] = useState('')
  const [fromState, setFromState] = useState('')
  const [fromZip, setFromZip] = useState('')
  const [fromEmail, setFromEmail] = useState('')
  const [fromPhone, setFromPhone] = useState('')
  const [fromWebsite, setFromWebsite] = useState('')
  const [toName, setToName] = useState('')
  const [toCompany, setToCompany] = useState('')
  const [toStreet, setToStreet] = useState('')
  const [toCity, setToCity] = useState('')
  const [toState, setToState] = useState('')
  const [toZip, setToZip] = useState('')
  const [toEmail, setToEmail] = useState('')
  const [invoiceNumber, setInvoiceNumber] = useState('INV-001')
  const [invoiceDate, setInvoiceDate] = useState(today())
  const [dueDate, setDueDate] = useState(addDays(today(), 30))
  const [currency, setCurrency] = useState<Currency>('USD')
  const [discount, setDiscount] = useState('0')
  const [taxRate, setTaxRate] = useState('0')
  const [paymentTerms, setPaymentTerms] = useState('Net 30')
  const [brandColor, setBrandColor] = useState('#16a34a')
  const [logoDataUrl, setLogoDataUrl] = useState('')
  const [logoError, setLogoError] = useState('')
  const [templates, setTemplates] = useState<Template[]>([])
  const [templateName, setTemplateName] = useState('')
  const [showSaveInput, setShowSaveInput] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [notes, setNotes] = useState('Thank you for your business!')
  const [items, setItems] = useState<LineItem[]>([
    { description: 'Services', quantity: '1', rate: '0' },
  ])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.fromName) setFromName(p.fromName)
        if (p.fromStreet) setFromStreet(p.fromStreet)
        if (p.fromCity) setFromCity(p.fromCity)
        if (p.fromState) setFromState(p.fromState)
        if (p.fromZip) setFromZip(p.fromZip)
        if (p.fromEmail) setFromEmail(p.fromEmail)
        if (p.fromPhone) setFromPhone(p.fromPhone)
        if (p.fromWebsite) setFromWebsite(p.fromWebsite)
        if (p.toName) setToName(p.toName)
        if (p.toCompany) setToCompany(p.toCompany)
        if (p.toStreet) setToStreet(p.toStreet)
        if (p.toCity) setToCity(p.toCity)
        if (p.toState) setToState(p.toState)
        if (p.toZip) setToZip(p.toZip)
        if (p.toEmail) setToEmail(p.toEmail)
        if (p.invoiceNumber) setInvoiceNumber(p.invoiceNumber)
        if (p.invoiceDate) setInvoiceDate(p.invoiceDate)
        if (p.dueDate) setDueDate(p.dueDate)
        if (p.currency) setCurrency(p.currency)
        if (p.discount) setDiscount(p.discount)
        if (p.taxRate) setTaxRate(p.taxRate)
        if (p.paymentTerms) setPaymentTerms(p.paymentTerms)
        if (p.notes) setNotes(p.notes)
        if (p.items) setItems(p.items)
      }
    } catch { /* ignore */ }
    try {
      const c = localStorage.getItem(COLOR_KEY)
      if (c) setBrandColor(c)
    } catch { /* ignore */ }
    try {
      const logo = localStorage.getItem(LOGO_KEY)
      if (logo) setLogoDataUrl(logo)
    } catch { /* ignore */ }
    try {
      const tmpl = localStorage.getItem(TEMPLATES_KEY)
      if (tmpl) setTemplates(JSON.parse(tmpl))
    } catch { /* ignore */ }
    try {
      const counter = localStorage.getItem(COUNTER_KEY)
      if (counter) {
        const m = counter.match(/^(.*?)(\d+)$/)
        if (m) setInvoiceNumber(m[1] + (parseInt(m[2]) + 1).toString().padStart(m[2].length, '0'))
      }
    } catch { /* ignore */ }
  }, [])

  const setColor = (hex: string) => {
    setBrandColor(hex)
    try { localStorage.setItem(COLOR_KEY, hex) } catch { /* ignore */ }
  }

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setLogoError('')
    if (file.size > 2 * 1024 * 1024) { setLogoError('Logo must be under 2MB'); return }
    const reader = new FileReader()
    reader.onload = (ev) => {
      const url = ev.target?.result as string
      setLogoDataUrl(url)
      try { if (url.length < 500 * 1024) localStorage.setItem(LOGO_KEY, url) } catch { /* ignore */ }
    }
    reader.readAsDataURL(file)
  }

  const removeLogo = () => {
    setLogoDataUrl(''); setLogoError('')
    try { localStorage.removeItem(LOGO_KEY) } catch { /* ignore */ }
  }

  const getFormData = () => ({
    fromName, fromStreet, fromCity, fromState, fromZip, fromEmail, fromPhone, fromWebsite,
    toName, toCompany, toStreet, toCity, toState, toZip, toEmail,
    invoiceNumber, invoiceDate, dueDate, currency, discount, taxRate, paymentTerms, notes, items, brandColor,
  })

  const saveTemplate = () => {
    if (!templateName.trim()) return
    const t: Template = { name: templateName.trim(), date: new Date().toLocaleDateString(), data: getFormData() }
    const updated = [...templates, t].slice(-10)
    setTemplates(updated)
    try { localStorage.setItem(TEMPLATES_KEY, JSON.stringify(updated)) } catch { /* ignore */ }
    setTemplateName(''); setShowSaveInput(false)
  }

  const loadTemplate = (t: Template) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const p = t.data as any
    if (p.fromName) setFromName(p.fromName)
    if (p.fromStreet !== undefined) setFromStreet(p.fromStreet)
    if (p.fromCity !== undefined) setFromCity(p.fromCity)
    if (p.fromState !== undefined) setFromState(p.fromState)
    if (p.fromZip !== undefined) setFromZip(p.fromZip)
    if (p.fromEmail !== undefined) setFromEmail(p.fromEmail)
    if (p.fromPhone !== undefined) setFromPhone(p.fromPhone)
    if (p.fromWebsite !== undefined) setFromWebsite(p.fromWebsite)
    if (p.toName !== undefined) setToName(p.toName)
    if (p.toCompany !== undefined) setToCompany(p.toCompany)
    if (p.toStreet !== undefined) setToStreet(p.toStreet)
    if (p.toCity !== undefined) setToCity(p.toCity)
    if (p.toState !== undefined) setToState(p.toState)
    if (p.toZip !== undefined) setToZip(p.toZip)
    if (p.toEmail !== undefined) setToEmail(p.toEmail)
    if (p.invoiceNumber) setInvoiceNumber(p.invoiceNumber)
    if (p.invoiceDate) setInvoiceDate(p.invoiceDate)
    if (p.dueDate) setDueDate(p.dueDate)
    if (p.currency) setCurrency(p.currency)
    if (p.discount !== undefined) setDiscount(p.discount)
    if (p.taxRate !== undefined) setTaxRate(p.taxRate)
    if (p.paymentTerms) setPaymentTerms(p.paymentTerms)
    if (p.notes !== undefined) setNotes(p.notes)
    if (p.items) setItems(p.items)
    if (p.brandColor) setColor(p.brandColor)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)) } catch { /* ignore */ }
    setShowTemplates(false)
  }

  const deleteTemplate = (i: number) => {
    const updated = templates.filter((_, idx) => idx !== i)
    setTemplates(updated)
    try { localStorage.setItem(TEMPLATES_KEY, JSON.stringify(updated)) } catch { /* ignore */ }
  }

  const save = useCallback((updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }, [])

  const sym = CURRENCY_SYMBOLS[currency]
  const subtotal = items.reduce((s, it) => s + lineTotal(it), 0)
  const discountAmt = subtotal * (parseFloat(discount) || 0) / 100
  const taxable = subtotal - discountAmt
  const taxAmt = taxable * (parseFloat(taxRate) || 0) / 100
  const total = taxable + taxAmt

  const addItem = () => {
    const updated = [...items, { description: '', quantity: '1', rate: '0' }]
    setItems(updated)
    save({ items: updated })
  }

  const removeItem = (i: number) => {
    const updated = items.filter((_, idx) => idx !== i)
    setItems(updated)
    save({ items: updated })
  }

  const updateItem = (i: number, field: keyof LineItem, val: string) => {
    const updated = items.map((it, idx) => idx === i ? { ...it, [field]: val } : it)
    setItems(updated)
    save({ items: updated })
  }

  const generatePDF = () => {
    const doc = new jsPDF()
    const cr = parseInt(brandColor.slice(1, 3), 16)
    const cg = parseInt(brandColor.slice(3, 5), 16)
    const cb = parseInt(brandColor.slice(5, 7), 16)
    doc.setFont('helvetica')

    const margin = 20
    const pageW = 210
    const rightEdge = pageW - margin

    // Header background
    doc.setFillColor(cr, cg, cb)
    doc.rect(0, 0, pageW, 38, 'F')

    // Logo (top left of header)
    const fromX = logoDataUrl ? 68 : margin
    if (logoDataUrl) {
      try {
        const imgFmt = logoDataUrl.split(';')[0].split('/')[1]?.toUpperCase() || 'PNG'
        doc.setFillColor(255, 255, 255)
        doc.rect(19, 8, 44, 22, 'F')
        doc.addImage(logoDataUrl, imgFmt === 'SVG+XML' ? 'PNG' : imgFmt, 20, 9, 42, 20)
      } catch { /* skip logo if format unsupported */ }
    }

    // FROM info (top left)
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(13)
    doc.setFont('helvetica', 'bold')
    doc.text(fromName || 'Your Business', fromX, 14)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    let fromY = 20
    if (fromStreet) { doc.text(fromStreet, fromX, fromY); fromY += 5 }
    if (fromCity || fromState || fromZip) {
      doc.text(`${fromCity}${fromCity && fromState ? ', ' : ''}${fromState} ${fromZip}`.trim(), fromX, fromY)
      fromY += 5
    }
    if (fromEmail) { doc.text(fromEmail, fromX, fromY); fromY += 5 }
    if (fromPhone) { doc.text(fromPhone, fromX, fromY) }

    // INVOICE title (top right)
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(22)
    doc.setFont('helvetica', 'bold')
    doc.text('INVOICE', rightEdge, 14, { align: 'right' })
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.text(`# ${invoiceNumber}`, rightEdge, 22, { align: 'right' })
    doc.text(`Date: ${fmtDate(invoiceDate)}`, rightEdge, 28, { align: 'right' })
    doc.text(`Due: ${fmtDate(dueDate)}`, rightEdge, 33, { align: 'right' })

    // BILL TO section
    doc.setTextColor(cr, cg, cb)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.text('BILL TO', margin, 50)
    doc.setTextColor(30, 30, 30)
    doc.setFontSize(10)
    let toY = 57
    if (toName) { doc.text(toName, margin, toY); toY += 6 }
    if (toCompany) { doc.setFontSize(8); doc.text(toCompany, margin, toY); toY += 5; doc.setFontSize(9) }
    doc.setFontSize(8)
    if (toStreet) { doc.text(toStreet, margin, toY); toY += 5 }
    if (toCity || toState || toZip) {
      doc.text(`${toCity}${toCity && toState ? ', ' : ''}${toState} ${toZip}`.trim(), margin, toY)
      toY += 5
    }
    if (toEmail) { doc.text(toEmail, margin, toY) }

    // Payment terms (top right of BILL TO area)
    doc.setTextColor(cr, cg, cb)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.text('PAYMENT TERMS', rightEdge - 60, 50)
    doc.setTextColor(30, 30, 30)
    doc.setFont('helvetica', 'normal')
    doc.text(paymentTerms || 'Net 30', rightEdge - 60, 57)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(cr, cg, cb)
    doc.text('CURRENCY', rightEdge - 60, 64)
    doc.setTextColor(30, 30, 30)
    doc.setFont('helvetica', 'normal')
    doc.text(currency, rightEdge - 60, 71)

    // Line separator
    doc.setDrawColor(200, 200, 200)
    doc.line(margin, 82, rightEdge, 82)

    // Table header
    const tableTop = 86
    doc.setFillColor(cr, cg, cb)
    doc.rect(margin, tableTop, rightEdge - margin, 8, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    const descX = margin + 2
    const qtyX = 128
    const rateX = 155
    const amtX = rightEdge - 2
    doc.text('DESCRIPTION', descX, tableTop + 5.5)
    doc.text('QTY', qtyX, tableTop + 5.5, { align: 'center' })
    doc.text('RATE', rateX, tableTop + 5.5, { align: 'right' })
    doc.text('AMOUNT', amtX, tableTop + 5.5, { align: 'right' })

    // Table rows
    let rowY = tableTop + 8
    const rowH = 8
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)

    items.forEach((item, idx) => {
      if (rowY > 250) {
        doc.addPage()
        rowY = 20
      }
      if (idx % 2 === 1) {
        doc.setFillColor(245, 250, 245)
        doc.rect(margin, rowY, rightEdge - margin, rowH, 'F')
      }
      doc.setTextColor(30, 30, 30)
      const descLines = doc.splitTextToSize(item.description || '—', 95)
      const lineH = descLines.length > 1 ? rowH * descLines.length / 2 : rowH
      doc.text(descLines[0], descX, rowY + 5.5)
      doc.text(item.quantity || '0', qtyX, rowY + 5.5, { align: 'center' })
      doc.text(fmtMoney(parseFloat(item.rate) || 0, sym), rateX, rowY + 5.5, { align: 'right' })
      doc.text(fmtMoney(lineTotal(item), sym), amtX, rowY + 5.5, { align: 'right' })
      rowY += Math.max(rowH, lineH)
    })

    // Border around table
    doc.setDrawColor(200, 200, 200)
    doc.rect(margin, tableTop, rightEdge - margin, rowY - tableTop)

    rowY += 4

    // Totals section (right-aligned)
    const totalsX = 130
    const totalsValX = rightEdge

    doc.setFontSize(8)
    doc.setTextColor(80, 80, 80)
    doc.setFont('helvetica', 'normal')

    const totalsRows: [string, string][] = [
      ['Subtotal', fmtMoney(subtotal, sym)],
    ]
    if (parseFloat(discount) > 0) {
      totalsRows.push([`Discount (${discount}%)`, `-${fmtMoney(discountAmt, sym)}`])
    }
    if (parseFloat(taxRate) > 0) {
      totalsRows.push([`Tax (${taxRate}%)`, fmtMoney(taxAmt, sym)])
    }

    totalsRows.forEach(([label, val]) => {
      if (rowY > 270) { doc.addPage(); rowY = 20 }
      doc.text(label, totalsX, rowY)
      doc.text(val, totalsValX, rowY, { align: 'right' })
      rowY += 6
    })

    // Total line
    doc.setDrawColor(cr, cg, cb)
    doc.line(totalsX, rowY, totalsValX, rowY)
    rowY += 6
    doc.setFillColor(cr, cg, cb)
    doc.rect(totalsX - 2, rowY - 4, totalsValX - totalsX + 4, 10, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.text('TOTAL DUE', totalsX, rowY + 3)
    doc.text(fmtMoney(total, sym), totalsValX, rowY + 3, { align: 'right' })
    rowY += 16

    // Notes
    if (notes) {
      if (rowY > 260) { doc.addPage(); rowY = 20 }
      doc.setTextColor(cr, cg, cb)
      doc.setFontSize(8)
      doc.setFont('helvetica', 'bold')
      doc.text('NOTES & TERMS', margin, rowY)
      rowY += 6
      doc.setTextColor(80, 80, 80)
      doc.setFont('helvetica', 'normal')
      const noteLines = doc.splitTextToSize(notes, rightEdge - margin)
      doc.text(noteLines, margin, rowY)
      rowY += noteLines.length * 5 + 6
    }

    // Footer line
    if (rowY < 270) {
      doc.setDrawColor(220, 220, 220)
      doc.line(margin, 280, rightEdge, 280)
      doc.setTextColor(150, 150, 150)
      doc.setFontSize(7)
      doc.setFont('helvetica', 'normal')
      doc.text('Generated by freelegalforms.app — Free professional invoice generator', 105, 285, { align: 'center' })
    }

    try { localStorage.setItem(COUNTER_KEY, invoiceNumber) } catch { /* ignore */ }
    doc.save(`invoice-${invoiceNumber}.pdf`)
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div>
          <div className="flex items-center gap-3 mb-5 p-3 rounded-lg bg-gray-50 dark:bg-[#1e293b] border border-gray-200 dark:border-gray-600">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 shrink-0">Brand Color</span>
            <input
              type="color"
              value={brandColor}
              onChange={e => setColor(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer border border-gray-200 dark:border-gray-600 p-0.5 bg-white dark:bg-[#1e293b]"
            />
            <span className="text-sm font-mono text-gray-600 dark:text-gray-400">{brandColor.toUpperCase()}</span>
          </div>

          {/* Logo Upload */}
          <div className="mb-5 p-3 rounded-lg bg-gray-50 dark:bg-[#1e293b] border border-gray-200 dark:border-gray-600">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-2">Logo</span>
            {logoDataUrl ? (
              <div className="flex items-center gap-3">
                <img src={logoDataUrl} alt="Logo preview" className="h-12 object-contain rounded border border-gray-200 dark:border-gray-600" />
                <button onClick={removeLogo} className="text-xs text-red-500 hover:text-red-700 font-medium">Remove</button>
              </div>
            ) : (
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 hover:border-green-500 transition-colors">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <span>Upload logo (PNG, JPG, WebP — max 2MB)</span>
                <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" className="hidden" onChange={handleLogoUpload} />
              </label>
            )}
            {logoError && <p className="text-xs text-red-500 mt-1">{logoError}</p>}
          </div>

          <p className={sectionCls}>Bill From</p>
          <div className="space-y-3">
            <div>
              <label className={labelCls}>Business / Your Name</label>
              <input className={inputCls} value={fromName} onChange={e => { setFromName(e.target.value); save({ fromName: e.target.value }) }} placeholder="Acme Corp" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Street Address</label>
                <input className={inputCls} value={fromStreet} onChange={e => { setFromStreet(e.target.value); save({ fromStreet: e.target.value }) }} placeholder="123 Main St" />
              </div>
              <div>
                <label className={labelCls}>City</label>
                <input className={inputCls} value={fromCity} onChange={e => { setFromCity(e.target.value); save({ fromCity: e.target.value }) }} placeholder="New York" />
              </div>
              <div>
                <label className={labelCls}>State</label>
                <input className={inputCls} value={fromState} onChange={e => { setFromState(e.target.value); save({ fromState: e.target.value }) }} placeholder="NY" maxLength={2} />
              </div>
              <div>
                <label className={labelCls}>ZIP</label>
                <input className={inputCls} value={fromZip} onChange={e => { setFromZip(e.target.value); save({ fromZip: e.target.value }) }} placeholder="10001" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Email</label>
                <input className={inputCls} type="email" value={fromEmail} onChange={e => { setFromEmail(e.target.value); save({ fromEmail: e.target.value }) }} placeholder="you@business.com" />
              </div>
              <div>
                <label className={labelCls}>Phone</label>
                <input className={inputCls} value={fromPhone} onChange={e => { setFromPhone(e.target.value); save({ fromPhone: e.target.value }) }} placeholder="(555) 000-0000" />
              </div>
            </div>
            <div>
              <label className={labelCls}>Website (optional)</label>
              <input className={inputCls} value={fromWebsite} onChange={e => { setFromWebsite(e.target.value); save({ fromWebsite: e.target.value }) }} placeholder="www.yourbusiness.com" />
            </div>
          </div>

          <p className={sectionCls}>Bill To</p>
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Client Name</label>
                <input className={inputCls} value={toName} onChange={e => { setToName(e.target.value); save({ toName: e.target.value }) }} placeholder="Jane Smith" />
              </div>
              <div>
                <label className={labelCls}>Company (optional)</label>
                <input className={inputCls} value={toCompany} onChange={e => { setToCompany(e.target.value); save({ toCompany: e.target.value }) }} placeholder="Client Corp" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Street Address</label>
                <input className={inputCls} value={toStreet} onChange={e => { setToStreet(e.target.value); save({ toStreet: e.target.value }) }} placeholder="456 Oak Ave" />
              </div>
              <div>
                <label className={labelCls}>City</label>
                <input className={inputCls} value={toCity} onChange={e => { setToCity(e.target.value); save({ toCity: e.target.value }) }} placeholder="Chicago" />
              </div>
              <div>
                <label className={labelCls}>State</label>
                <input className={inputCls} value={toState} onChange={e => { setToState(e.target.value); save({ toState: e.target.value }) }} placeholder="IL" maxLength={2} />
              </div>
              <div>
                <label className={labelCls}>ZIP</label>
                <input className={inputCls} value={toZip} onChange={e => { setToZip(e.target.value); save({ toZip: e.target.value }) }} placeholder="60601" />
              </div>
            </div>
            <div>
              <label className={labelCls}>Client Email</label>
              <input className={inputCls} type="email" value={toEmail} onChange={e => { setToEmail(e.target.value); save({ toEmail: e.target.value }) }} placeholder="client@example.com" />
            </div>
          </div>

          <p className={sectionCls}>Invoice Details</p>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Invoice Number</label>
                <input className={inputCls} value={invoiceNumber} onChange={e => { setInvoiceNumber(e.target.value); save({ invoiceNumber: e.target.value }) }} placeholder="INV-001" />
              </div>
              <div>
                <label className={labelCls}>Currency</label>
                <select className={inputCls} value={currency} onChange={e => { setCurrency(e.target.value as Currency); save({ currency: e.target.value }) }}>
                  {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Invoice Date</label>
                <input className={inputCls} type="date" value={invoiceDate} onChange={e => { setInvoiceDate(e.target.value); save({ invoiceDate: e.target.value }) }} />
              </div>
              <div>
                <label className={labelCls}>Due Date</label>
                <input className={inputCls} type="date" value={dueDate} onChange={e => { setDueDate(e.target.value); save({ dueDate: e.target.value }) }} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Payment Terms</label>
              <input className={inputCls} value={paymentTerms} onChange={e => { setPaymentTerms(e.target.value); save({ paymentTerms: e.target.value }) }} placeholder="Net 30" />
            </div>
          </div>

          <p className={sectionCls}>Line Items</p>
          <div className="space-y-2 mb-3">
            <div className="grid grid-cols-12 gap-1 px-1">
              <span className="col-span-6 text-xs text-gray-500 dark:text-gray-400 font-medium">Description</span>
              <span className="col-span-2 text-xs text-gray-500 dark:text-gray-400 font-medium text-center">Qty</span>
              <span className="col-span-2 text-xs text-gray-500 dark:text-gray-400 font-medium text-right">Rate</span>
              <span className="col-span-2 text-xs text-gray-500 dark:text-gray-400 font-medium text-right">Amount</span>
            </div>
            {items.map((item, i) => (
              <div key={i} className="grid grid-cols-12 gap-1 items-center">
                <input
                  className={`col-span-6 ${inputCls}`}
                  value={item.description}
                  onChange={e => updateItem(i, 'description', e.target.value)}
                  placeholder="Description"
                />
                <input
                  className={`col-span-2 ${inputCls} text-center`}
                  type="number"
                  value={item.quantity}
                  onChange={e => updateItem(i, 'quantity', e.target.value)}
                  min="0"
                />
                <div className="col-span-2 relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">{sym}</span>
                  <input
                    className={`${inputCls} pl-5`}
                    type="number"
                    value={item.rate}
                    onChange={e => updateItem(i, 'rate', e.target.value)}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="col-span-2 flex items-center gap-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex-1 text-right">
                    {fmtMoney(lineTotal(item), sym)}
                  </span>
                  {items.length > 1 && (
                    <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-600 text-xs ml-1 shrink-0">✕</button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={addItem}
            className="text-sm text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-medium flex items-center gap-1 mb-4"
          >
            <span className="text-lg leading-none">+</span> Add Line Item
          </button>

          <p className={sectionCls}>Totals & Notes</p>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Discount (%)</label>
                <div className="relative">
                  <input className={`${inputCls} pr-7`} type="number" min="0" max="100" step="0.1" value={discount} onChange={e => { setDiscount(e.target.value); save({ discount: e.target.value }) }} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">%</span>
                </div>
              </div>
              <div>
                <label className={labelCls}>Tax Rate (%)</label>
                <div className="relative">
                  <input className={`${inputCls} pr-7`} type="number" min="0" max="100" step="0.01" value={taxRate} onChange={e => { setTaxRate(e.target.value); save({ taxRate: e.target.value }) }} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">%</span>
                </div>
              </div>
            </div>
            <div>
              <label className={labelCls}>Notes / Terms</label>
              <textarea className={`${inputCls} resize-none`} rows={3} value={notes} onChange={e => { setNotes(e.target.value); save({ notes: e.target.value }) }} />
            </div>
          </div>

          {/* Templates Accordion */}
          <div className="mt-6 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-[#1e293b] text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#273548] transition-colors"
            >
              <span>Saved Templates ({templates.length}/10)</span>
              <span className="text-gray-400">{showTemplates ? '▼' : '▶'}</span>
            </button>
            {showTemplates && (
              <div className="p-4 space-y-3 bg-white dark:bg-[#0f1923]">
                {showSaveInput ? (
                  <div className="flex gap-2">
                    <input
                      className="flex-1 text-sm px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Template name..."
                      value={templateName}
                      onChange={e => setTemplateName(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && saveTemplate()}
                      autoFocus
                    />
                    <button onClick={saveTemplate} className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg">Save</button>
                    <button onClick={() => { setShowSaveInput(false); setTemplateName('') }} className="px-3 py-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm rounded-lg border border-gray-300 dark:border-gray-600">Cancel</button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowSaveInput(true)}
                    disabled={templates.length >= 10}
                    className="w-full text-sm px-3 py-2 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-green-500 hover:text-green-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    + Save current form as template
                  </button>
                )}
                {templates.length === 0 && (
                  <p className="text-xs text-gray-400 text-center py-2">No saved templates yet</p>
                )}
                {templates.map((t, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-[#1e293b] text-sm">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 dark:text-gray-200 truncate">{t.name}</p>
                      <p className="text-xs text-gray-400">{t.date}</p>
                    </div>
                    <button onClick={() => loadTemplate(t)} className="text-xs text-green-600 hover:text-green-700 dark:text-green-400 font-medium shrink-0">Load</button>
                    <button onClick={() => deleteTemplate(i)} className="text-xs text-red-400 hover:text-red-600 shrink-0">Delete</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Preview + Generate */}
        <div className="lg:sticky lg:top-6 space-y-4 self-start">
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
            {/* Preview header */}
            <div className="px-5 py-4" style={{ backgroundColor: brandColor }}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-white text-sm">{fromName || 'Your Business'}</p>
                  {fromEmail && <p className="text-white/70 text-xs mt-0.5">{fromEmail}</p>}
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-lg tracking-wide">INVOICE</p>
                  <p className="text-white/70 text-xs">{invoiceNumber}</p>
                </div>
              </div>
            </div>
            {/* Preview body */}
            <div className="bg-gray-50 dark:bg-[#0f172a] p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400 mb-1">Bill To</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">{toName || '—'}</p>
                  {toCompany && <p className="text-xs text-gray-500">{toCompany}</p>}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400 mb-1">Terms</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{paymentTerms || 'Net 30'}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Invoice Date</span>
                  <span className="text-gray-700 dark:text-gray-300">{invoiceDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Due Date</span>
                  <span className="text-gray-700 dark:text-gray-300">{dueDate}</span>
                </div>
              </div>

              {/* Mini line items */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="text-white text-xs px-3 py-1.5 grid grid-cols-3" style={{ backgroundColor: brandColor }}>
                  <span>Description</span>
                  <span className="text-center">Qty</span>
                  <span className="text-right">Amount</span>
                </div>
                {items.slice(0, 4).map((it, i) => (
                  <div key={i} className={`text-xs px-3 py-1.5 grid grid-cols-3 ${i % 2 ? 'bg-green-50 dark:bg-green-950/20' : 'bg-white dark:bg-[#1e293b]'}`}>
                    <span className="text-gray-700 dark:text-gray-300 truncate">{it.description || '—'}</span>
                    <span className="text-center text-gray-500">{it.quantity}</span>
                    <span className="text-right text-gray-700 dark:text-gray-300">{fmtMoney(lineTotal(it), sym)}</span>
                  </div>
                ))}
                {items.length > 4 && (
                  <div className="text-xs px-3 py-1 text-gray-400 text-center bg-white dark:bg-[#1e293b]">+{items.length - 4} more items</div>
                )}
              </div>

              {/* Totals summary */}
              <div className="space-y-1.5 border-t border-gray-200 dark:border-gray-700 pt-3">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Subtotal</span><span>{fmtMoney(subtotal, sym)}</span>
                </div>
                {parseFloat(discount) > 0 && (
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Discount ({discount}%)</span><span className="text-red-500">-{fmtMoney(discountAmt, sym)}</span>
                  </div>
                )}
                {parseFloat(taxRate) > 0 && (
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Tax ({taxRate}%)</span><span>{fmtMoney(taxAmt, sym)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-sm text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-700 pt-2 mt-1">
                  <span>Total Due</span>
                  <span className="text-base font-bold" style={{ color: brandColor }}>{fmtMoney(total, sym)}</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={generatePDF}
            className="w-full py-3.5 px-6 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold rounded-xl text-base shadow-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Generate &amp; Download PDF
          </button>

          <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
            PDF downloads instantly to your device. No signup, no watermarks.
          </p>

          <div className="rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 px-4 py-3">
            <p className="text-xs text-green-800 dark:text-green-400 leading-relaxed">
              <strong>Privacy:</strong> Your invoice data is never sent to any server. All PDF generation happens in your browser using JavaScript. Your financial information stays private on your device.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">
        These invoice templates are provided for informational purposes. Consult a licensed accountant or attorney regarding tax obligations and legally compliant invoicing requirements for your jurisdiction.
      </p>
    </div>
  )
}
