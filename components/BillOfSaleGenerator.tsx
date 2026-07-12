'use client'

import { useState, useEffect, useCallback } from 'react'
import jsPDF from 'jspdf'

const STORAGE_KEY = 'flf-billofSale'
const COLOR_KEY = 'flf-billofSale-color'

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware',
  'Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky',
  'Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi',
  'Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico',
  'New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania',
  'Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont',
  'Virginia','Washington','West Virginia','Wisconsin','Wyoming',
]

type DocType = 'vehicle' | 'property' | 'boat' | 'firearm'

const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-green-500'
const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
const sectionCls = 'text-xs font-bold uppercase tracking-wider text-green-700 dark:text-green-400 mb-2 mt-5 first:mt-0'

export default function BillOfSaleGenerator() {
  const [docType, setDocType] = useState<DocType>('vehicle')
  const [sellerName, setSellerName] = useState('')
  const [sellerAddress, setSellerAddress] = useState('')
  const [sellerPhone, setSellerPhone] = useState('')
  const [buyerName, setBuyerName] = useState('')
  const [buyerAddress, setBuyerAddress] = useState('')
  const [buyerPhone, setBuyerPhone] = useState('')
  const [saleDate, setSaleDate] = useState(new Date().toISOString().slice(0, 10))
  const [salePrice, setSalePrice] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Cashier\'s Check' | 'Other'>('Cash')
  const [asIs, setAsIs] = useState(true)
  const [state, setState] = useState('California')
  // Vehicle-specific
  const [vYear, setVYear] = useState('')
  const [vMake, setVMake] = useState('')
  const [vModel, setVModel] = useState('')
  const [vColor, setVColor] = useState('')
  const [vVin, setVVin] = useState('')
  const [vMileage, setVMileage] = useState('')
  // Property/boat/firearm
  const [propDesc, setPropDesc] = useState('')
  // Boat-specific
  const [boatMake, setBoatMake] = useState('')
  const [boatModel, setBoatModel] = useState('')
  const [boatYear, setBoatYear] = useState('')
  const [boatHin, setBoatHin] = useState('')
  // Firearm-specific
  const [faMake, setFaMake] = useState('')
  const [faModel, setFaModel] = useState('')
  const [faSerial, setFaSerial] = useState('')
  const [faCalibер, setFaCalibер] = useState('')
  const [brandColor, setBrandColor] = useState('#16a34a')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.docType) setDocType(p.docType)
        if (p.sellerName) setSellerName(p.sellerName)
        if (p.sellerAddress) setSellerAddress(p.sellerAddress)
        if (p.sellerPhone) setSellerPhone(p.sellerPhone)
        if (p.buyerName) setBuyerName(p.buyerName)
        if (p.buyerAddress) setBuyerAddress(p.buyerAddress)
        if (p.buyerPhone) setBuyerPhone(p.buyerPhone)
        if (p.saleDate) setSaleDate(p.saleDate)
        if (p.salePrice) setSalePrice(p.salePrice)
        if (p.paymentMethod) setPaymentMethod(p.paymentMethod)
        if (p.asIs !== undefined) setAsIs(p.asIs)
        if (p.state) setState(p.state)
        if (p.vYear) setVYear(p.vYear)
        if (p.vMake) setVMake(p.vMake)
        if (p.vModel) setVModel(p.vModel)
        if (p.vColor) setVColor(p.vColor)
        if (p.vVin) setVVin(p.vVin)
        if (p.vMileage) setVMileage(p.vMileage)
        if (p.propDesc) setPropDesc(p.propDesc)
        if (p.boatMake) setBoatMake(p.boatMake)
        if (p.boatModel) setBoatModel(p.boatModel)
        if (p.boatYear) setBoatYear(p.boatYear)
        if (p.boatHin) setBoatHin(p.boatHin)
        if (p.faMake) setFaMake(p.faMake)
        if (p.faModel) setFaModel(p.faModel)
        if (p.faSerial) setFaSerial(p.faSerial)
        if (p.faCalibер) setFaCalibер(p.faCalibер)
      }
    } catch { /* ignore */ }
    try {
      const c = localStorage.getItem(COLOR_KEY)
      if (c) setBrandColor(c)
    } catch { /* ignore */ }
  }, [])

  const setColor = (hex: string) => {
    setBrandColor(hex)
    try { localStorage.setItem(COLOR_KEY, hex) } catch { /* ignore */ }
  }

  const save = useCallback((updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }, [])

  function fmtDate(s: string): string {
    if (!s) return ''
    const [y, m, d] = s.split('-')
    return new Date(+y, +m - 1, +d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  function fmtMoney(s: string): string {
    const n = parseFloat(s) || 0
    return `$${n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
  }

  function getItemDescription(): string {
    if (docType === 'vehicle') {
      return `${vYear} ${vMake} ${vModel}${vColor ? ` (${vColor})` : ''}`.trim() || 'Motor Vehicle'
    }
    if (docType === 'boat') {
      return `${boatYear} ${boatMake} ${boatModel}`.trim() || 'Watercraft/Boat'
    }
    if (docType === 'firearm') {
      return `${faMake} ${faModel}${faCalibер ? ` ${faCalibер}` : ''}`.trim() || 'Firearm'
    }
    return propDesc || 'Personal Property'
  }

  const generatePDF = () => {
    const doc = new jsPDF()
    const cr = parseInt(brandColor.slice(1, 3), 16)
    const cg = parseInt(brandColor.slice(3, 5), 16)
    const cb = parseInt(brandColor.slice(5, 7), 16)
    doc.setFont('helvetica')
    const margin = 20
    const rightEdge = 190
    const usableW = rightEdge - margin
    let y = 20

    function addText(text: string, opts: { bold?: boolean; size?: number; color?: [number,number,number]; indent?: number; center?: boolean } = {}) {
      const { bold = false, size = 9, color = [30, 30, 30], indent = 0, center = false } = opts
      doc.setFontSize(size)
      doc.setFont('helvetica', bold ? 'bold' : 'normal')
      doc.setTextColor(color[0], color[1], color[2])
      const x = center ? 105 : margin + indent
      const lines = doc.splitTextToSize(text, center ? 170 : usableW - indent)
      if (y + lines.length * (size * 0.45) > 280) { doc.addPage(); y = 20 }
      doc.text(lines, x, y, center ? { align: 'center' } : {})
      y += lines.length * (size * 0.45) + 2
    }

    function addLabelValue(label: string, value: string, x1: number, x2: number, yPos: number) {
      doc.setFontSize(8)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(80, 80, 80)
      doc.text(label, x1, yPos)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(30, 30, 30)
      doc.text(value || '—', x2, yPos)
    }

    // Header
    doc.setFillColor(cr, cg, cb)
    doc.rect(0, 0, 210, 12, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(7)
    doc.setFont('helvetica', 'normal')
    doc.text('freelegalforms.app — Free Legal Document Generator', 105, 8, { align: 'center' })

    y = 22

    // Title
    const titles: Record<DocType, string> = {
      vehicle: 'BILL OF SALE — MOTOR VEHICLE',
      property: 'BILL OF SALE — PERSONAL PROPERTY',
      boat: 'BILL OF SALE — WATERCRAFT / BOAT',
      firearm: 'BILL OF SALE — FIREARM',
    }
    addText(titles[docType], { bold: true, size: 16, color: [cr, cg, cb], center: true })
    addText(`State of ${state}`, { size: 9, color: [80, 80, 80], center: true })
    y += 4

    doc.setDrawColor(cr, cg, cb)
    doc.line(margin, y, rightEdge, y)
    y += 6

    addText(`This Bill of Sale is made and entered into on ${fmtDate(saleDate)}, by and between:`, { size: 9 })
    y += 3

    // Seller/Buyer boxes
    doc.setFillColor(240, 247, 240)
    doc.rect(margin, y, usableW / 2 - 3, 30, 'F')
    doc.setFillColor(235, 245, 235)
    doc.rect(margin + usableW / 2 + 3, y, usableW / 2 - 3, 30, 'F')

    const col1 = margin + 3
    const col2 = margin + usableW / 2 + 6
    let boxY = y + 6

    doc.setFontSize(7)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(cr, cg, cb)
    doc.text('SELLER', col1, boxY)
    doc.text('BUYER', col2, boxY)
    boxY += 5

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8.5)
    doc.setTextColor(30, 30, 30)
    const sLines = doc.splitTextToSize(sellerName || '[Seller Name]', 75)
    const bLines = doc.splitTextToSize(buyerName || '[Buyer Name]', 75)
    doc.text(sLines, col1, boxY)
    doc.text(bLines, col2, boxY)
    boxY += Math.max(sLines.length, bLines.length) * 4 + 2

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(60, 60, 60)
    if (sellerAddress) {
      const saLines = doc.splitTextToSize(sellerAddress, 75)
      doc.text(saLines, col1, boxY)
    }
    if (buyerAddress) {
      const baLines = doc.splitTextToSize(buyerAddress, 75)
      doc.text(baLines, col2, boxY)
    }
    boxY += 5
    if (sellerPhone) doc.text(sellerPhone, col1, boxY)
    if (buyerPhone) doc.text(buyerPhone, col2, boxY)

    y += 35
    y += 4

    doc.setDrawColor(200, 200, 200)
    doc.line(margin, y, rightEdge, y)
    y += 6

    // Item description
    addText('ITEM DESCRIPTION', { bold: true, size: 9, color: [cr, cg, cb] })

    if (docType === 'vehicle') {
      const fields: [string, string][] = [
        ['Year:', vYear || '—'],
        ['Make:', vMake || '—'],
        ['Model:', vModel || '—'],
        ['Color:', vColor || '—'],
        ['VIN:', vVin || '—'],
        ['Mileage:', vMileage ? `${vMileage} miles` : '—'],
      ]
      const col = margin
      fields.forEach(([l, v], i) => {
        const xLabel = col + (i % 2 === 0 ? 0 : 85)
        const xVal = xLabel + 20
        if (i % 2 === 0 && i > 0) y += 6
        else if (i % 2 === 0) {}
        doc.setFontSize(8)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(80, 80, 80)
        doc.text(l, xLabel, y)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(30, 30, 30)
        doc.text(v, xVal, y)
        if (i % 2 === 1 || i === fields.length - 1) y += 6
      })
    } else if (docType === 'boat') {
      const fields: [string, string, string, string][] = [
        ['Year:', boatYear || '—', 'Make:', boatMake || '—'],
        ['Model:', boatModel || '—', 'HIN:', boatHin || '—'],
      ]
      fields.forEach(([l1, v1, l2, v2]) => {
        doc.setFontSize(8); doc.setFont('helvetica', 'bold'); doc.setTextColor(80, 80, 80)
        doc.text(l1, margin, y); doc.text(l2, margin + 85, y)
        doc.setFont('helvetica', 'normal'); doc.setTextColor(30, 30, 30)
        doc.text(v1, margin + 18, y); doc.text(v2, margin + 100, y)
        y += 6
      })
    } else if (docType === 'firearm') {
      const fields: [string, string, string, string][] = [
        ['Make:', faMake || '—', 'Model:', faModel || '—'],
        ['Serial #:', faSerial || '—', 'Caliber:', faCalibер || '—'],
      ]
      fields.forEach(([l1, v1, l2, v2]) => {
        doc.setFontSize(8); doc.setFont('helvetica', 'bold'); doc.setTextColor(80, 80, 80)
        doc.text(l1, margin, y); doc.text(l2, margin + 85, y)
        doc.setFont('helvetica', 'normal'); doc.setTextColor(30, 30, 30)
        doc.text(v1, margin + 18, y); doc.text(v2, margin + 100, y)
        y += 6
      })
    } else {
      addText(propDesc || '[Property description]', { size: 8.5, indent: 4 })
    }

    y += 3
    doc.setDrawColor(200, 200, 200)
    doc.line(margin, y, rightEdge, y)
    y += 6

    // Sale terms
    addText('SALE TERMS', { bold: true, size: 9, color: [cr, cg, cb] })

    doc.setFontSize(8.5)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(30, 30, 30)
    addText(`The Seller agrees to sell and the Buyer agrees to purchase the above-described item for the total consideration of ${fmtMoney(salePrice)} (${salePrice ? 'USD' : 'AMOUNT'}), payable by ${paymentMethod}.`, { size: 8.5 })

    if (asIs) {
      y += 3
      doc.setFillColor(255, 248, 235)
      doc.setDrawColor(251, 191, 36)
      const warningText = '"AS IS" DISCLAIMER: The above-described item is sold "AS IS, WHERE IS" without any warranty, express or implied, including without limitation any warranty of merchantability or fitness for a particular purpose. The Buyer accepts the item in its current condition and acknowledges that the Seller makes no representations about its condition, functionality, or suitability for any purpose.'
      const wLines = doc.splitTextToSize(warningText, usableW - 8)
      doc.rect(margin, y, usableW, wLines.length * 4.5 + 8, 'FD')
      doc.setTextColor(120, 80, 0)
      doc.setFontSize(7.5)
      doc.setFont('helvetica', 'normal')
      doc.text(wLines, margin + 4, y + 5)
      y += wLines.length * 4.5 + 12
    }

    y += 2
    addText('TITLE WARRANTY: The Seller warrants that they hold clear and lawful title to the above-described item, that the item is free and clear of all liens, encumbrances, and claims of third parties, and that the Seller has full right and authority to sell and transfer title to the Buyer.', { size: 8.5 })

    y += 3
    addText(`This Bill of Sale is executed in accordance with the laws of the State of ${state}. The Buyer assumes all responsibility for registering, titling, and insuring the item as required by applicable law.`, { size: 8.5 })

    // Signatures
    if (y > 240) { doc.addPage(); y = 20 }
    y += 6
    doc.setDrawColor(200, 200, 200)
    doc.line(margin, y, rightEdge, y)
    y += 8

    addText('SIGNATURES', { bold: true, size: 10, color: [cr, cg, cb] })
    addText('By signing below, the Seller and Buyer acknowledge that they have read and agree to the terms of this Bill of Sale.', { size: 8.5 })
    y += 6

    const col1X = margin
    const col2X = 115

    doc.setFontSize(8.5)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(cr, cg, cb)
    doc.text('SELLER', col1X, y)
    doc.text('BUYER', col2X, y)
    y += 6

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8.5)
    doc.setTextColor(30, 30, 30)
    doc.text(sellerName || '[Seller Name]', col1X, y)
    doc.text(buyerName || '[Buyer Name]', col2X, y)
    y += 8

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    const sigLen = 70

    ;[
      ['Signature:', 22],
      ['Print Name:', 26],
      ['Date:', 14],
    ].forEach(([lbl, offset]) => {
      doc.text(lbl as string, col1X, y)
      doc.text(lbl as string, col2X, y)
      doc.setDrawColor(100, 100, 100)
      doc.line(col1X + (offset as number), y, col1X + sigLen, y)
      doc.line(col2X + (offset as number), y, col2X + sigLen, y)
      y += 8
    })

    y += 4
    doc.setFontSize(7.5)
    doc.setFont('helvetica', 'italic')
    doc.setTextColor(120, 120, 120)
    const notaryText = 'NOTARY (optional): State of _____________ County of _____________ Subscribed and sworn before me this ___ day of _____________, 20___. My commission expires: _____________ Notary Signature: _________________________'
    const nLines = doc.splitTextToSize(notaryText, usableW)
    doc.text(nLines, margin, y)

    // Footer
    const totalPages = doc.getNumberOfPages()
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i)
      doc.setDrawColor(200, 200, 200)
      doc.line(margin, 288, rightEdge, 288)
      doc.setTextColor(150, 150, 150)
      doc.setFontSize(6.5)
      doc.setFont('helvetica', 'normal')
      doc.text(`Page ${i} of ${totalPages} — Bill of Sale — freelegalforms.app`, 105, 293, { align: 'center' })
    }

    doc.save('bill-of-sale.pdf')
  }

  const tabCls = (t: DocType) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${docType === t ? 'bg-green-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div>
          <div className="flex items-center gap-3 mb-5 p-3 rounded-lg bg-gray-50 dark:bg-[#1e293b] border border-gray-200 dark:border-gray-600">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 shrink-0">Document Color</span>
            <input
              type="color"
              value={brandColor}
              onChange={e => setColor(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer border border-gray-200 dark:border-gray-600 p-0.5 bg-white dark:bg-[#1e293b]"
            />
            <span className="text-sm font-mono text-gray-600 dark:text-gray-400">{brandColor.toUpperCase()}</span>
          </div>

          <p className={sectionCls}>Document Type</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {(['vehicle', 'property', 'boat', 'firearm'] as DocType[]).map(t => (
              <button key={t} className={tabCls(t)} onClick={() => { setDocType(t); save({ docType: t }) }}>
                {t === 'vehicle' ? 'Vehicle / Car' : t === 'property' ? 'General Property' : t === 'boat' ? 'Boat' : 'Firearm'}
              </button>
            ))}
          </div>

          <p className={sectionCls}>Seller Information</p>
          <div className="space-y-3">
            <div>
              <label className={labelCls}>Seller Full Name</label>
              <input className={inputCls} value={sellerName} onChange={e => { setSellerName(e.target.value); save({ sellerName: e.target.value }) }} placeholder="John Seller" />
            </div>
            <div>
              <label className={labelCls}>Seller Address</label>
              <input className={inputCls} value={sellerAddress} onChange={e => { setSellerAddress(e.target.value); save({ sellerAddress: e.target.value }) }} placeholder="123 Main St, City, State 12345" />
            </div>
            <div>
              <label className={labelCls}>Seller Phone</label>
              <input className={inputCls} value={sellerPhone} onChange={e => { setSellerPhone(e.target.value); save({ sellerPhone: e.target.value }) }} placeholder="(555) 000-0000" />
            </div>
          </div>

          <p className={sectionCls}>Buyer Information</p>
          <div className="space-y-3">
            <div>
              <label className={labelCls}>Buyer Full Name</label>
              <input className={inputCls} value={buyerName} onChange={e => { setBuyerName(e.target.value); save({ buyerName: e.target.value }) }} placeholder="Jane Buyer" />
            </div>
            <div>
              <label className={labelCls}>Buyer Address</label>
              <input className={inputCls} value={buyerAddress} onChange={e => { setBuyerAddress(e.target.value); save({ buyerAddress: e.target.value }) }} placeholder="456 Oak Ave, City, State 67890" />
            </div>
            <div>
              <label className={labelCls}>Buyer Phone</label>
              <input className={inputCls} value={buyerPhone} onChange={e => { setBuyerPhone(e.target.value); save({ buyerPhone: e.target.value }) }} placeholder="(555) 000-0001" />
            </div>
          </div>

          {docType === 'vehicle' && (
            <>
              <p className={sectionCls}>Vehicle Information</p>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Year</label>
                    <input className={inputCls} value={vYear} onChange={e => { setVYear(e.target.value); save({ vYear: e.target.value }) }} placeholder="2020" maxLength={4} />
                  </div>
                  <div>
                    <label className={labelCls}>Make</label>
                    <input className={inputCls} value={vMake} onChange={e => { setVMake(e.target.value); save({ vMake: e.target.value }) }} placeholder="Toyota" />
                  </div>
                  <div>
                    <label className={labelCls}>Model</label>
                    <input className={inputCls} value={vModel} onChange={e => { setVModel(e.target.value); save({ vModel: e.target.value }) }} placeholder="Camry" />
                  </div>
                  <div>
                    <label className={labelCls}>Color</label>
                    <input className={inputCls} value={vColor} onChange={e => { setVColor(e.target.value); save({ vColor: e.target.value }) }} placeholder="Silver" />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>VIN (Vehicle Identification Number)</label>
                  <input className={`${inputCls} font-mono`} value={vVin} onChange={e => { setVVin(e.target.value.toUpperCase()); save({ vVin: e.target.value.toUpperCase() }) }} placeholder="1HGCM82633A123456" maxLength={17} />
                </div>
                <div>
                  <label className={labelCls}>Mileage</label>
                  <input className={inputCls} type="number" value={vMileage} onChange={e => { setVMileage(e.target.value); save({ vMileage: e.target.value }) }} placeholder="45000" />
                </div>
              </div>
            </>
          )}

          {docType === 'boat' && (
            <>
              <p className={sectionCls}>Boat Information</p>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className={labelCls}>Year</label>
                    <input className={inputCls} value={boatYear} onChange={e => { setBoatYear(e.target.value); save({ boatYear: e.target.value }) }} placeholder="2018" maxLength={4} />
                  </div>
                  <div>
                    <label className={labelCls}>Make</label>
                    <input className={inputCls} value={boatMake} onChange={e => { setBoatMake(e.target.value); save({ boatMake: e.target.value }) }} placeholder="Sea Ray" />
                  </div>
                  <div>
                    <label className={labelCls}>Model</label>
                    <input className={inputCls} value={boatModel} onChange={e => { setBoatModel(e.target.value); save({ boatModel: e.target.value }) }} placeholder="SPX 190" />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>HIN (Hull Identification Number)</label>
                  <input className={`${inputCls} font-mono`} value={boatHin} onChange={e => { setBoatHin(e.target.value.toUpperCase()); save({ boatHin: e.target.value.toUpperCase() }) }} placeholder="ABC12345D678" />
                </div>
              </div>
            </>
          )}

          {docType === 'firearm' && (
            <>
              <p className={sectionCls}>Firearm Information</p>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Make / Manufacturer</label>
                    <input className={inputCls} value={faMake} onChange={e => { setFaMake(e.target.value); save({ faMake: e.target.value }) }} placeholder="Glock" />
                  </div>
                  <div>
                    <label className={labelCls}>Model</label>
                    <input className={inputCls} value={faModel} onChange={e => { setFaModel(e.target.value); save({ faModel: e.target.value }) }} placeholder="G19" />
                  </div>
                  <div>
                    <label className={labelCls}>Caliber</label>
                    <input className={inputCls} value={faCalibер} onChange={e => { setFaCalibер(e.target.value); save({ faCalibер: e.target.value }) }} placeholder="9mm" />
                  </div>
                  <div>
                    <label className={labelCls}>Serial Number</label>
                    <input className={`${inputCls} font-mono`} value={faSerial} onChange={e => { setFaSerial(e.target.value.toUpperCase()); save({ faSerial: e.target.value.toUpperCase() }) }} placeholder="ABCD1234" />
                  </div>
                </div>
              </div>
            </>
          )}

          {docType === 'property' && (
            <>
              <p className={sectionCls}>Property Description</p>
              <div>
                <label className={labelCls}>Describe the property being sold</label>
                <textarea className={`${inputCls} resize-none`} rows={4} value={propDesc} onChange={e => { setPropDesc(e.target.value); save({ propDesc: e.target.value }) }} placeholder="e.g., One (1) used riding lawn mower, Brand: John Deere, Model: E130, Color: Green/Yellow, Serial #: GXE130X..." />
              </div>
            </>
          )}

          <p className={sectionCls}>Sale Terms</p>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Sale Date</label>
                <input className={inputCls} type="date" value={saleDate} onChange={e => { setSaleDate(e.target.value); save({ saleDate: e.target.value }) }} />
              </div>
              <div>
                <label className={labelCls}>Sale Price ($)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input className={`${inputCls} pl-7`} type="number" value={salePrice} onChange={e => { setSalePrice(e.target.value); save({ salePrice: e.target.value }) }} placeholder="0.00" min="0" step="0.01" />
                </div>
              </div>
            </div>
            <div>
              <label className={labelCls}>Payment Method</label>
              <select className={inputCls} value={paymentMethod} onChange={e => { setPaymentMethod(e.target.value as typeof paymentMethod); save({ paymentMethod: e.target.value }) }}>
                <option>Cash</option>
                <option>{"Cashier's Check"}</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>State (governing law)</label>
              <select className={inputCls} value={state} onChange={e => { setState(e.target.value); save({ state: e.target.value }) }}>
                {US_STATES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="asIs"
                checked={asIs}
                onChange={e => { setAsIs(e.target.checked); save({ asIs: e.target.checked }) }}
                className="w-4 h-4 accent-green-600"
              />
              <label htmlFor="asIs" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                Sold &quot;As-Is&quot; — no warranty (recommended)
              </label>
            </div>
          </div>
        </div>

        {/* Preview + Generate */}
        <div className="lg:sticky lg:top-6 space-y-4 self-start">
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
            <div className="px-5 py-4" style={{ backgroundColor: brandColor }}>
              <p className="text-white font-bold text-center text-sm tracking-wider">BILL OF SALE</p>
              <p className="text-white/70 text-xs text-center mt-1">
                {docType === 'vehicle' ? 'Motor Vehicle' : docType === 'property' ? 'Personal Property' : docType === 'boat' ? 'Watercraft / Boat' : 'Firearm'} · {state}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-[#0f172a] p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400 mb-1">Seller</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">{sellerName || '—'}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400 mb-1">Buyer</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">{buyerName || '—'}</p>
                </div>
              </div>
              <div className="text-xs border-t border-gray-200 dark:border-gray-700 pt-3">
                <p className="text-gray-400 mb-1 font-medium">Item</p>
                <p className="text-gray-800 dark:text-white font-medium">{getItemDescription()}</p>
                {docType === 'vehicle' && vVin && <p className="text-gray-400 font-mono text-xs mt-0.5">VIN: {vVin}</p>}
              </div>
              <div className="space-y-1.5 text-xs border-t border-gray-200 dark:border-gray-700 pt-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Sale Date</span>
                  <span className="text-gray-700 dark:text-gray-300">{saleDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Payment</span>
                  <span className="text-gray-700 dark:text-gray-300">{paymentMethod}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-gray-700 dark:text-gray-300">Sale Price</span>
                  <span className="text-sm font-bold" style={{ color: brandColor }}>{salePrice ? `$${parseFloat(salePrice).toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '$0.00'}</span>
                </div>
              </div>
              {asIs && (
                <div className="text-xs border-t border-gray-200 dark:border-gray-700 pt-3">
                  <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded text-xs font-medium">Sold As-Is</span>
                </div>
              )}
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
            Creates a professional bill of sale PDF. Both parties should sign and retain a copy.
          </p>

          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 px-4 py-3">
            <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
              <strong>Legal disclaimer:</strong> Bill of sale requirements vary by state. Some states require notarization for vehicle transfers. Check your state&apos;s DMV requirements. This template is for informational purposes only.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
