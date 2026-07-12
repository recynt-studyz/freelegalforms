'use client'

import { useState, useEffect, useCallback, ChangeEvent } from 'react'
import jsPDF from 'jspdf'

const STORAGE_KEY = 'flf-lease'
const COLOR_KEY = 'flf-lease-color'
const LOGO_KEY = 'flf-lease-logo'
const TEMPLATES_KEY = 'flf-lease-templates'

interface Template {
  name: string
  date: string
  data: Record<string, unknown>
}

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware',
  'Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky',
  'Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi',
  'Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico',
  'New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania',
  'Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont',
  'Virginia','Washington','West Virginia','Wisconsin','Wyoming',
]

const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-green-500'
const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
const sectionCls = 'text-xs font-bold uppercase tracking-wider text-green-700 dark:text-green-400 mb-2 mt-5 first:mt-0'

type UtilityPayer = 'Landlord' | 'Tenant'

export default function LeaseAgreementGenerator() {
  const [propAddress, setPropAddress] = useState('')
  const [propType, setPropType] = useState('Apartment')
  const [propState, setPropState] = useState('California')
  const [landlordName, setLandlordName] = useState('')
  const [landlordAddress, setLandlordAddress] = useState('')
  const [landlordPhone, setLandlordPhone] = useState('')
  const [landlordEmail, setLandlordEmail] = useState('')
  const [tenant1, setTenant1] = useState('')
  const [tenant2, setTenant2] = useState('')
  const [tenant3, setTenant3] = useState('')
  const [leaseType, setLeaseType] = useState<'Fixed term' | 'Month-to-month'>('Fixed term')
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10))
  const [endDate, setEndDate] = useState('')
  const [monthlyRent, setMonthlyRent] = useState('')
  const [securityDeposit, setSecurityDeposit] = useState('')
  const [lateFee, setLateFee] = useState('50')
  const [gracePeriod, setGracePeriod] = useState('5')
  const [rentDueDay, setRentDueDay] = useState('1')
  const [utilities, setUtilities] = useState<Record<string, UtilityPayer>>({
    Water: 'Landlord', Electric: 'Tenant', Gas: 'Tenant', Internet: 'Tenant', Trash: 'Landlord',
  })
  const [petsAllowed, setPetsAllowed] = useState(false)
  const [petDeposit, setPetDeposit] = useState('')
  const [parkingIncluded, setParkingIncluded] = useState(false)
  const [parkingDesc, setParkingDesc] = useState('')
  const [smoking, setSmoking] = useState('Not allowed')
  const [additionalTerms, setAdditionalTerms] = useState('')
  const [brandColor, setBrandColor] = useState('#16a34a')
  const [hexInput, setHexInput] = useState('16A34A')
  const [logoDataUrl, setLogoDataUrl] = useState('')
  const [logoError, setLogoError] = useState('')
  const [templates, setTemplates] = useState<Template[]>([])
  const [templateName, setTemplateName] = useState('')
  const [showSaveInput, setShowSaveInput] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.propAddress) setPropAddress(p.propAddress)
        if (p.propType) setPropType(p.propType)
        if (p.propState) setPropState(p.propState)
        if (p.landlordName) setLandlordName(p.landlordName)
        if (p.landlordAddress) setLandlordAddress(p.landlordAddress)
        if (p.landlordPhone) setLandlordPhone(p.landlordPhone)
        if (p.landlordEmail) setLandlordEmail(p.landlordEmail)
        if (p.tenant1) setTenant1(p.tenant1)
        if (p.tenant2) setTenant2(p.tenant2)
        if (p.tenant3) setTenant3(p.tenant3)
        if (p.leaseType) setLeaseType(p.leaseType)
        if (p.startDate) setStartDate(p.startDate)
        if (p.endDate) setEndDate(p.endDate)
        if (p.monthlyRent) setMonthlyRent(p.monthlyRent)
        if (p.securityDeposit) setSecurityDeposit(p.securityDeposit)
        if (p.lateFee) setLateFee(p.lateFee)
        if (p.gracePeriod) setGracePeriod(p.gracePeriod)
        if (p.rentDueDay) setRentDueDay(p.rentDueDay)
        if (p.utilities) setUtilities(p.utilities)
        if (p.petsAllowed !== undefined) setPetsAllowed(p.petsAllowed)
        if (p.petDeposit) setPetDeposit(p.petDeposit)
        if (p.parkingIncluded !== undefined) setParkingIncluded(p.parkingIncluded)
        if (p.parkingDesc) setParkingDesc(p.parkingDesc)
        if (p.smoking) setSmoking(p.smoking)
        if (p.additionalTerms) setAdditionalTerms(p.additionalTerms)
      }
    } catch { /* ignore */ }
    try {
      const c = localStorage.getItem(COLOR_KEY)
      if (c) { setBrandColor(c); setHexInput(c.slice(1).toUpperCase()) }
    } catch { /* ignore */ }
    try {
      const logo = localStorage.getItem(LOGO_KEY)
      if (logo) setLogoDataUrl(logo)
    } catch { /* ignore */ }
    try {
      const tmpl = localStorage.getItem(TEMPLATES_KEY)
      if (tmpl) setTemplates(JSON.parse(tmpl))
    } catch { /* ignore */ }
  }, [])

  const setColor = (hex: string) => {
    setBrandColor(hex)
    setHexInput(hex.slice(1).toUpperCase())
    try { localStorage.setItem(COLOR_KEY, hex) } catch { /* ignore */ }
  }

  const handleHexInput = (value: string) => {
    const upper = value.toUpperCase().replace(/[^0-9A-F]/g, '')
    setHexInput(upper)
    if (upper.length === 6) setColor('#' + upper)
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
    propAddress, propType, propState, landlordName, landlordAddress, landlordPhone, landlordEmail,
    tenant1, tenant2, tenant3, leaseType, startDate, endDate, monthlyRent, securityDeposit,
    lateFee, gracePeriod, rentDueDay, utilities, petsAllowed, petDeposit, parkingIncluded,
    parkingDesc, smoking, additionalTerms, brandColor,
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
    if (p.propAddress !== undefined) setPropAddress(p.propAddress)
    if (p.propType) setPropType(p.propType)
    if (p.propState) setPropState(p.propState)
    if (p.landlordName !== undefined) setLandlordName(p.landlordName)
    if (p.landlordAddress !== undefined) setLandlordAddress(p.landlordAddress)
    if (p.landlordPhone !== undefined) setLandlordPhone(p.landlordPhone)
    if (p.landlordEmail !== undefined) setLandlordEmail(p.landlordEmail)
    if (p.tenant1 !== undefined) setTenant1(p.tenant1)
    if (p.tenant2 !== undefined) setTenant2(p.tenant2)
    if (p.tenant3 !== undefined) setTenant3(p.tenant3)
    if (p.leaseType) setLeaseType(p.leaseType)
    if (p.startDate) setStartDate(p.startDate)
    if (p.endDate !== undefined) setEndDate(p.endDate)
    if (p.monthlyRent !== undefined) setMonthlyRent(p.monthlyRent)
    if (p.securityDeposit !== undefined) setSecurityDeposit(p.securityDeposit)
    if (p.lateFee !== undefined) setLateFee(p.lateFee)
    if (p.gracePeriod !== undefined) setGracePeriod(p.gracePeriod)
    if (p.rentDueDay !== undefined) setRentDueDay(p.rentDueDay)
    if (p.utilities) setUtilities(p.utilities)
    if (p.petsAllowed !== undefined) setPetsAllowed(p.petsAllowed)
    if (p.petDeposit !== undefined) setPetDeposit(p.petDeposit)
    if (p.parkingIncluded !== undefined) setParkingIncluded(p.parkingIncluded)
    if (p.parkingDesc !== undefined) setParkingDesc(p.parkingDesc)
    if (p.smoking) setSmoking(p.smoking)
    if (p.additionalTerms !== undefined) setAdditionalTerms(p.additionalTerms)
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

  function fmtDate(s: string): string {
    if (!s) return ''
    const [y, m, d] = s.split('-')
    return new Date(+y, +m - 1, +d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  function fmtMoney(s: string): string {
    const n = parseFloat(s) || 0
    return `$${n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
  }

  function tenantsList(): string {
    return [tenant1, tenant2, tenant3].filter(Boolean).join(', ') || '—'
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

    function addSection(num: string, title: string, body: string) {
      if (y > 258) { doc.addPage(); y = 20 }
      addText(`${num}. ${title}`, { bold: true, size: 9, color: [cr, cg, cb] })
      addText(body, { size: 8.5, indent: 4 })
      y += 3
    }

    // Header
    doc.setFillColor(cr, cg, cb)
    doc.rect(0, 0, 210, 12, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(7)
    doc.setFont('helvetica', 'normal')
    doc.text('freelegalforms.app — Free Legal Document Generator', 105, 8, { align: 'center' })

    y = 22

    // Logo (below header bar, left-aligned)
    if (logoDataUrl) {
      try {
        const imgFmt = logoDataUrl.split(';')[0].split('/')[1]?.toUpperCase() || 'PNG'
        doc.addImage(logoDataUrl, imgFmt === 'SVG+XML' ? 'PNG' : imgFmt, margin, y, 40, 18)
        y += 24
      } catch { /* skip logo if format unsupported */ }
    }

    // Title
    addText('RESIDENTIAL LEASE AGREEMENT', { bold: true, size: 16, color: [cr, cg, cb], center: true })
    addText(`State of ${propState}`, { size: 9, color: [80, 80, 80], center: true })
    y += 4

    doc.setDrawColor(cr, cg, cb)
    doc.line(margin, y, rightEdge, y)
    y += 6

    addText(`This Residential Lease Agreement ("Lease") is entered into as of ${fmtDate(startDate)} by and between:`, { size: 9 })
    y += 2

    addText(`LANDLORD: ${landlordName || '[Landlord Name]'}${landlordAddress ? `, ${landlordAddress}` : ''}`, { bold: true, size: 9 })
    addText(`TENANT(S): ${tenantsList()}`, { bold: true, size: 9 })
    y += 3

    addText('(Landlord and Tenant(s) are collectively referred to as "the Parties")', { size: 8.5 })
    y += 4

    // Section 1 - Property
    addSection('1', 'PROPERTY',
      `Landlord leases to Tenant(s) the ${propType.toLowerCase()} located at: ${propAddress || '[Property Address]'}, in the State of ${propState} ("Premises"). The Premises shall be used solely as a private residential dwelling and for no other purpose without Landlord's prior written consent.`)

    // Section 2 - Term
    if (leaseType === 'Fixed term') {
      addSection('2', 'LEASE TERM',
        `This Lease is for a fixed term commencing on ${fmtDate(startDate)} and ending on ${endDate ? fmtDate(endDate) : '[End Date]'} ("Lease Term"). This Lease shall automatically terminate at the end of the Lease Term unless both Parties agree in writing to renew. If Tenant(s) continue to occupy the Premises after the end of the Lease Term without a written renewal, the tenancy shall convert to a month-to-month tenancy.`)
    } else {
      addSection('2', 'LEASE TERM',
        `This is a month-to-month tenancy commencing on ${fmtDate(startDate)}. Either Party may terminate this tenancy by providing at least thirty (30) days written notice to the other Party. The Landlord may increase rent or modify other terms with thirty (30) days written notice.`)
    }

    // Section 3 - Rent
    addSection('3', 'RENT',
      `Tenant(s) agree to pay Landlord a monthly rent of ${fmtMoney(monthlyRent)} ("Rent"), due on the ${rentDueDay}${parseInt(rentDueDay) === 1 ? 'st' : parseInt(rentDueDay) === 2 ? 'nd' : parseInt(rentDueDay) === 3 ? 'rd' : 'th'} day of each calendar month. Rent shall be paid to Landlord at the address specified above or as otherwise directed by Landlord in writing. Rent paid after the ${gracePeriod}-day grace period shall incur a late fee of ${fmtMoney(lateFee)} per month or the maximum permitted by ${propState} law, whichever is less.`)

    // Section 4 - Security Deposit
    addSection('4', 'SECURITY DEPOSIT',
      `Tenant(s) shall deposit with Landlord the sum of ${fmtMoney(securityDeposit)} as a security deposit ("Security Deposit") upon execution of this Lease. The Security Deposit shall be held by Landlord as security for Tenant(s)' faithful performance of the terms of this Lease. Landlord shall return the Security Deposit, less any lawful deductions, within the time period required by ${propState} law. Deductions may include unpaid rent, damages beyond normal wear and tear, and cleaning costs. The Security Deposit shall not be applied to the last month's rent without Landlord's written consent.`)

    // Section 5 - Utilities
    const utilPayers = Object.entries(utilities)
    const landlordUtils = utilPayers.filter(([, p]) => p === 'Landlord').map(([u]) => u)
    const tenantUtils = utilPayers.filter(([, p]) => p === 'Tenant').map(([u]) => u)
    addSection('5', 'UTILITIES',
      `The following utilities shall be paid by the respective parties: Landlord shall pay for: ${landlordUtils.length > 0 ? landlordUtils.join(', ') : 'none'}. Tenant(s) shall pay for: ${tenantUtils.length > 0 ? tenantUtils.join(', ') : 'none'}. All utilities are to be maintained in satisfactory working order throughout the Lease Term.`)

    // Section 6 - Pets
    addSection('6', 'PETS',
      petsAllowed
        ? `Pets are permitted on the Premises with Landlord's prior written approval for each pet. A non-refundable pet deposit of ${fmtMoney(petDeposit)} is required per pet. Tenant(s) are responsible for any damage caused by pets and must comply with all local ordinances regarding pet ownership. Service animals and emotional support animals are permitted as required by applicable law.`
        : 'No pets or animals of any kind shall be kept on or about the Premises without the prior written consent of Landlord. Violation of this provision may result in termination of this Lease. Service animals and emotional support animals are permitted as required by applicable law.')

    // Section 7 - Parking
    addSection('7', 'PARKING',
      parkingIncluded
        ? `Parking is included with this Lease. ${parkingDesc ? parkingDesc : 'Parking details as agreed between the Parties in writing.'}  Tenant(s) shall use parking areas only for the parking of properly licensed and insured motor vehicles.`
        : 'Parking is not included in this Lease. Tenant(s) are responsible for securing their own parking arrangements.')

    // Section 8 - Maintenance
    addSection('8', 'MAINTENANCE AND REPAIRS',
      `Landlord shall maintain the Premises in a habitable condition and shall be responsible for major repairs to the structure, roof, plumbing, heating, and electrical systems. Tenant(s) shall keep the Premises clean and sanitary, dispose of trash properly, and promptly notify Landlord in writing of any needed repairs or unsafe conditions. Tenant(s) shall be responsible for minor maintenance such as replacing light bulbs and keeping the Premises in good condition. Tenant(s) shall not make alterations to the Premises without Landlord's prior written consent.`)

    // Section 9 - Entry
    addSection('9', 'LANDLORD\'S RIGHT OF ENTRY',
      `Landlord or Landlord's agents may enter the Premises with at least twenty-four (24) hours advance written notice to Tenant(s) for the purposes of making inspections, repairs, alterations, or improvements. Landlord may enter without notice in case of emergency. Landlord shall not abuse this right of entry or harass Tenant(s).`)

    // Section 10 - Smoking
    addSection('10', 'SMOKING',
      smoking === 'Allowed'
        ? 'Smoking is permitted on the Premises in designated outdoor areas only, unless otherwise agreed in writing. Tenant(s) are responsible for any damage caused by smoking.'
        : 'Smoking of any substance, including tobacco, marijuana, electronic cigarettes, and vaping devices, is strictly prohibited inside the Premises or in any common areas. Violation of this provision may result in termination of this Lease.')

    // Section 11 - Termination
    addSection('11', 'TERMINATION',
      `At the end of the Lease Term, Tenant(s) shall vacate the Premises and return all keys to Landlord. Either party may terminate this Lease upon material breach of its terms by providing written notice of the breach. If the breach is not cured within the time period required by ${propState} law, the non-breaching party may pursue appropriate legal remedies including eviction proceedings. Tenant(s) shall give at least thirty (30) days written notice of intent to vacate at the end of any lease term.`)

    // Section 12 - Governing law
    addSection('12', 'GOVERNING LAW',
      `This Lease shall be governed by and construed in accordance with the landlord-tenant laws of the State of ${propState}. Any provisions of this Lease that conflict with applicable ${propState} law shall be deemed modified to conform to the minimum requirements of such law.`)

    // Section 13 - Additional terms
    if (additionalTerms) {
      addSection('13', 'ADDITIONAL TERMS AND CONDITIONS', additionalTerms)
    }

    // Signature blocks
    if (y > 240) { doc.addPage(); y = 20 }
    y += 5
    doc.setDrawColor(200, 200, 200)
    doc.line(margin, y, rightEdge, y)
    y += 6

    addText('IN WITNESS WHEREOF, the Parties have executed this Residential Lease Agreement as of the date first written above.', { size: 8.5 })
    y += 6

    // Landlord signature
    doc.setFontSize(8.5)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(cr, cg, cb)
    doc.text('LANDLORD', margin, y)
    y += 5
    doc.setTextColor(30, 30, 30)
    doc.text(landlordName || '[Landlord Name]', margin, y)
    y += 6

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    ;[['Signature:', 22], ['Print Name:', 26], ['Date:', 14]].forEach(([lbl, off]) => {
      doc.text(lbl as string, margin, y)
      doc.setDrawColor(100, 100, 100)
      doc.line(margin + (off as number), y, margin + 80, y)
      y += 7
    })

    y += 4

    // Tenant signatures
    const tenants = [tenant1, tenant2, tenant3].filter(Boolean)
    if (tenants.length === 0) tenants.push('[Tenant Name]')

    tenants.forEach((name, i) => {
      if (y > 260) { doc.addPage(); y = 20 }
      doc.setFontSize(8.5)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(cr, cg, cb)
      doc.text(`TENANT${tenants.length > 1 ? ` ${i + 1}` : ''}`, margin, y)
      y += 5
      doc.setTextColor(30, 30, 30)
      doc.text(name, margin, y)
      y += 6
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      ;[['Signature:', 22], ['Print Name:', 26], ['Date:', 14]].forEach(([lbl, off]) => {
        doc.text(lbl as string, margin, y)
        doc.setDrawColor(100, 100, 100)
        doc.line(margin + (off as number), y, margin + 80, y)
        y += 7
      })
      y += 4
    })

    // Disclaimer
    if (y > 268) { doc.addPage(); y = 20 }
    y += 4
    doc.setFillColor(250, 250, 250)
    doc.setDrawColor(200, 200, 200)
    const disclaimerText = 'LEGAL DISCLAIMER: This lease agreement template is provided for informational purposes only and does not constitute legal advice. Landlord-tenant laws vary significantly by state and locality. This document may not comply with all applicable laws in your jurisdiction. Consult a licensed attorney before executing this agreement.'
    const dLines = doc.splitTextToSize(disclaimerText, usableW - 8)
    doc.rect(margin, y, usableW, dLines.length * 4 + 8, 'FD')
    doc.setTextColor(100, 100, 100)
    doc.setFontSize(7)
    doc.setFont('helvetica', 'italic')
    doc.text(dLines, margin + 4, y + 5)

    // Footer
    const totalPages = doc.getNumberOfPages()
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i)
      doc.setDrawColor(200, 200, 200)
      doc.line(margin, 288, rightEdge, 288)
      doc.setTextColor(150, 150, 150)
      doc.setFontSize(6.5)
      doc.setFont('helvetica', 'normal')
      doc.text(`Page ${i} of ${totalPages} — Residential Lease Agreement — freelegalforms.app`, 105, 293, { align: 'center' })
    }

    doc.save('lease-agreement.pdf')
  }

  const toggleUtility = (util: string) => {
    const updated = { ...utilities, [util]: utilities[util] === 'Landlord' ? 'Tenant' : 'Landlord' } as Record<string, UtilityPayer>
    setUtilities(updated)
    save({ utilities: updated })
  }

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
              className="w-8 h-8 rounded cursor-pointer border border-gray-200 dark:border-gray-600 p-0.5 bg-white dark:bg-[#1e293b] shrink-0"
            />
            <div className="flex items-center">
              <span className="text-sm font-mono text-gray-400 select-none">#</span>
              <input
                type="text"
                value={hexInput}
                onChange={e => handleHexInput(e.target.value)}
                maxLength={6}
                placeholder="16A34A"
                className={`w-[72px] text-sm font-mono px-1.5 py-1 rounded border bg-white dark:bg-[#0f172a] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 uppercase ${hexInput.length === 6 ? 'border-green-500 focus:ring-green-500' : hexInput.length > 0 ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 dark:border-gray-600 focus:ring-green-500'}`}
              />
            </div>
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

          <p className={sectionCls}>Property</p>
          <div className="space-y-3">
            <div>
              <label className={labelCls}>Property Address (full)</label>
              <input className={inputCls} value={propAddress} onChange={e => { setPropAddress(e.target.value); save({ propAddress: e.target.value }) }} placeholder="123 Oak Street, Apt 4B, Los Angeles, CA 90001" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Property Type</label>
                <select className={inputCls} value={propType} onChange={e => { setPropType(e.target.value); save({ propType: e.target.value }) }}>
                  {['Apartment', 'House', 'Room', 'Commercial'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>State</label>
                <select className={inputCls} value={propState} onChange={e => { setPropState(e.target.value); save({ propState: e.target.value }) }}>
                  {US_STATES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>

          <p className={sectionCls}>Landlord</p>
          <div className="space-y-3">
            <div>
              <label className={labelCls}>Landlord Name</label>
              <input className={inputCls} value={landlordName} onChange={e => { setLandlordName(e.target.value); save({ landlordName: e.target.value }) }} placeholder="Full name or company name" />
            </div>
            <div>
              <label className={labelCls}>Landlord Address</label>
              <input className={inputCls} value={landlordAddress} onChange={e => { setLandlordAddress(e.target.value); save({ landlordAddress: e.target.value }) }} placeholder="Mailing address" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Phone</label>
                <input className={inputCls} value={landlordPhone} onChange={e => { setLandlordPhone(e.target.value); save({ landlordPhone: e.target.value }) }} placeholder="(555) 000-0000" />
              </div>
              <div>
                <label className={labelCls}>Email</label>
                <input className={inputCls} type="email" value={landlordEmail} onChange={e => { setLandlordEmail(e.target.value); save({ landlordEmail: e.target.value }) }} placeholder="landlord@example.com" />
              </div>
            </div>
          </div>

          <p className={sectionCls}>Tenant(s)</p>
          <div className="space-y-3">
            {[
              [tenant1, setTenant1, 'Tenant 1 Full Name (required)', 'tenant1'],
              [tenant2, setTenant2, 'Tenant 2 Full Name (optional)', 'tenant2'],
              [tenant3, setTenant3, 'Tenant 3 Full Name (optional)', 'tenant3'],
            ].map(([val, setter, label, key], i) => (
              <div key={i}>
                <label className={labelCls}>{label as string}</label>
                <input
                  className={inputCls}
                  value={val as string}
                  onChange={e => {
                    (setter as (v: string) => void)(e.target.value)
                    save({ [key as string]: e.target.value })
                  }}
                  placeholder={i === 0 ? 'Jane Doe' : 'Optional'}
                />
              </div>
            ))}
          </div>

          <p className={sectionCls}>Lease Terms</p>
          <div className="space-y-3">
            <div className="flex gap-2">
              {['Fixed term', 'Month-to-month'].map(t => (
                <button key={t}
                  onClick={() => { setLeaseType(t as typeof leaseType); save({ leaseType: t }) }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${leaseType === t ? 'bg-green-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Start Date</label>
                <input className={inputCls} type="date" value={startDate} onChange={e => { setStartDate(e.target.value); save({ startDate: e.target.value }) }} />
              </div>
              {leaseType === 'Fixed term' && (
                <div>
                  <label className={labelCls}>End Date</label>
                  <input className={inputCls} type="date" value={endDate} onChange={e => { setEndDate(e.target.value); save({ endDate: e.target.value }) }} />
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Monthly Rent ($)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input className={`${inputCls} pl-7`} type="number" value={monthlyRent} onChange={e => { setMonthlyRent(e.target.value); save({ monthlyRent: e.target.value }) }} placeholder="1500" />
                </div>
              </div>
              <div>
                <label className={labelCls}>Security Deposit ($)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input className={`${inputCls} pl-7`} type="number" value={securityDeposit} onChange={e => { setSecurityDeposit(e.target.value); save({ securityDeposit: e.target.value }) }} placeholder="1500" />
                </div>
              </div>
              <div>
                <label className={labelCls}>Late Fee ($)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input className={`${inputCls} pl-7`} type="number" value={lateFee} onChange={e => { setLateFee(e.target.value); save({ lateFee: e.target.value }) }} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Grace Period (days)</label>
                <input className={inputCls} type="number" value={gracePeriod} onChange={e => { setGracePeriod(e.target.value); save({ gracePeriod: e.target.value }) }} min="0" max="30" />
              </div>
            </div>
            <div>
              <label className={labelCls}>Rent Due Day of Month</label>
              <select className={inputCls} value={rentDueDay} onChange={e => { setRentDueDay(e.target.value); save({ rentDueDay: e.target.value }) }}>
                {[1,5,10,15].map(d => <option key={d} value={d}>{d}{d === 1 ? 'st' : d === 5 ? 'th' : 'th'} of the month</option>)}
              </select>
            </div>
          </div>

          <p className={sectionCls}>Utilities (click to toggle payer)</p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {Object.entries(utilities).map(([util, payer]) => (
              <button
                key={util}
                onClick={() => toggleUtility(util)}
                className="flex items-center justify-between px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-sm hover:border-green-400 transition-colors"
              >
                <span className="text-gray-700 dark:text-gray-300">{util}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${payer === 'Landlord' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'}`}>
                  {payer}
                </span>
              </button>
            ))}
          </div>

          <p className={sectionCls}>Pets, Parking & Smoking</p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input type="checkbox" id="pets" checked={petsAllowed} onChange={e => { setPetsAllowed(e.target.checked); save({ petsAllowed: e.target.checked }) }} className="w-4 h-4 accent-green-600" />
              <label htmlFor="pets" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">Pets allowed</label>
            </div>
            {petsAllowed && (
              <div>
                <label className={labelCls}>Pet Deposit ($)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input className={`${inputCls} pl-7`} type="number" value={petDeposit} onChange={e => { setPetDeposit(e.target.value); save({ petDeposit: e.target.value }) }} placeholder="500" />
                </div>
              </div>
            )}
            <div className="flex items-center gap-3">
              <input type="checkbox" id="parking" checked={parkingIncluded} onChange={e => { setParkingIncluded(e.target.checked); save({ parkingIncluded: e.target.checked }) }} className="w-4 h-4 accent-green-600" />
              <label htmlFor="parking" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">Parking included</label>
            </div>
            {parkingIncluded && (
              <div>
                <label className={labelCls}>Parking Description</label>
                <input className={inputCls} value={parkingDesc} onChange={e => { setParkingDesc(e.target.value); save({ parkingDesc: e.target.value }) }} placeholder="e.g., One assigned parking space #12 in the garage" />
              </div>
            )}
            <div>
              <label className={labelCls}>Smoking Policy</label>
              <select className={inputCls} value={smoking} onChange={e => { setSmoking(e.target.value); save({ smoking: e.target.value }) }}>
                <option>Not allowed</option>
                <option>Allowed</option>
              </select>
            </div>
          </div>

          <p className={sectionCls}>Additional Terms</p>
          <div>
            <textarea className={`${inputCls} resize-none`} rows={4} value={additionalTerms} onChange={e => { setAdditionalTerms(e.target.value); save({ additionalTerms: e.target.value }) }} placeholder="Any additional terms, rules, or conditions..." />
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
            <div className="px-5 py-4" style={{ backgroundColor: brandColor }}>
              <p className="text-white font-bold text-center text-sm tracking-wider">RESIDENTIAL LEASE AGREEMENT</p>
              <p className="text-white/70 text-xs text-center mt-1">{propType} · {propState}</p>
            </div>
            <div className="bg-gray-50 dark:bg-[#0f172a] p-5 space-y-4">
              <div>
                <p className="text-xs font-bold uppercase text-gray-400 mb-1">Property</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-white">{propAddress || '—'}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400 mb-1">Landlord</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{landlordName || '—'}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400 mb-1">Tenant(s)</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{tenantsList()}</p>
                </div>
              </div>
              <div className="space-y-1.5 text-xs border-t border-gray-200 dark:border-gray-700 pt-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Lease Type</span>
                  <span className="text-gray-700 dark:text-gray-300">{leaseType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Start Date</span>
                  <span className="text-gray-700 dark:text-gray-300">{startDate}</span>
                </div>
                {leaseType === 'Fixed term' && endDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">End Date</span>
                    <span className="text-gray-700 dark:text-gray-300">{endDate}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold">
                  <span className="text-gray-700 dark:text-gray-300">Monthly Rent</span>
                  <span className="text-sm font-bold" style={{ color: brandColor }}>{monthlyRent ? `$${parseFloat(monthlyRent).toLocaleString()}` : '$0'}/mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Security Deposit</span>
                  <span className="text-gray-700 dark:text-gray-300">{securityDeposit ? `$${parseFloat(securityDeposit).toLocaleString()}` : '$0'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Late Fee</span>
                  <span className="text-gray-700 dark:text-gray-300">${lateFee} after {gracePeriod} days</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 border-t border-gray-200 dark:border-gray-700 pt-3">
                {petsAllowed && <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">Pets allowed</span>}
                {parkingIncluded && <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">Parking included</span>}
                <span className={`text-xs px-2 py-0.5 rounded-full ${smoking === 'Allowed' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                  Smoking: {smoking}
                </span>
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
            Creates a full residential lease agreement PDF. All parties should review and sign.
          </p>

          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 px-4 py-3">
            <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
              <strong>Legal disclaimer:</strong> Landlord-tenant laws vary significantly by state and municipality. This template may not satisfy all requirements in your area. For complex situations, consult a licensed real estate attorney.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
