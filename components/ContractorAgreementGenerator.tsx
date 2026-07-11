'use client'

import { useState, useEffect, useCallback } from 'react'
import jsPDF from 'jspdf'

const STORAGE_KEY = 'flf-contractor'

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

export default function ContractorAgreementGenerator() {
  const [clientName, setClientName] = useState('')
  const [clientAddress, setClientAddress] = useState('')
  const [clientContact, setClientContact] = useState('')
  const [contractorName, setContractorName] = useState('')
  const [contractorBusiness, setContractorBusiness] = useState('')
  const [contractorAddress, setContractorAddress] = useState('')
  const [servicesDesc, setServicesDesc] = useState('')
  const [deliverables, setDeliverables] = useState('')
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10))
  const [ongoing, setOngoing] = useState(false)
  const [endDate, setEndDate] = useState('')
  const [paymentType, setPaymentType] = useState<'Fixed price' | 'Hourly rate'>('Fixed price')
  const [paymentAmount, setPaymentAmount] = useState('')
  const [paymentSchedule, setPaymentSchedule] = useState('Upon completion')
  const [lateFeeRate, setLateFeeRate] = useState('1.5')
  const [ipOwnership, setIpOwnership] = useState<'client' | 'contractor'>('client')
  const [nonCompete, setNonCompete] = useState(false)
  const [nonCompeteDuration, setNonCompeteDuration] = useState('1')
  const [nonSolicitation, setNonSolicitation] = useState(false)
  const [governingLaw, setGoverningLaw] = useState('California')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.clientName) setClientName(p.clientName)
        if (p.clientAddress) setClientAddress(p.clientAddress)
        if (p.clientContact) setClientContact(p.clientContact)
        if (p.contractorName) setContractorName(p.contractorName)
        if (p.contractorBusiness) setContractorBusiness(p.contractorBusiness)
        if (p.contractorAddress) setContractorAddress(p.contractorAddress)
        if (p.servicesDesc) setServicesDesc(p.servicesDesc)
        if (p.deliverables) setDeliverables(p.deliverables)
        if (p.startDate) setStartDate(p.startDate)
        if (p.ongoing !== undefined) setOngoing(p.ongoing)
        if (p.endDate) setEndDate(p.endDate)
        if (p.paymentType) setPaymentType(p.paymentType)
        if (p.paymentAmount) setPaymentAmount(p.paymentAmount)
        if (p.paymentSchedule) setPaymentSchedule(p.paymentSchedule)
        if (p.lateFeeRate) setLateFeeRate(p.lateFeeRate)
        if (p.ipOwnership) setIpOwnership(p.ipOwnership)
        if (p.nonCompete !== undefined) setNonCompete(p.nonCompete)
        if (p.nonCompeteDuration) setNonCompeteDuration(p.nonCompeteDuration)
        if (p.nonSolicitation !== undefined) setNonSolicitation(p.nonSolicitation)
        if (p.governingLaw) setGoverningLaw(p.governingLaw)
      }
    } catch { /* ignore */ }
  }, [])

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

  const generatePDF = () => {
    const doc = new jsPDF()
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
      addText(`${num}. ${title}`, { bold: true, size: 9, color: [22, 101, 52] })
      addText(body, { size: 8.5, indent: 4 })
      y += 3
    }

    // Header
    doc.setFillColor(22, 101, 52)
    doc.rect(0, 0, 210, 12, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(7)
    doc.setFont('helvetica', 'normal')
    doc.text('freelegalforms.app — Free Legal Document Generator', 105, 8, { align: 'center' })

    y = 22

    // Title
    addText('INDEPENDENT CONTRACTOR AGREEMENT', { bold: true, size: 16, color: [22, 101, 52], center: true })
    y += 4

    doc.setDrawColor(22, 101, 52)
    doc.line(margin, y, rightEdge, y)
    y += 6

    addText(`This Independent Contractor Agreement ("Agreement") is entered into as of ${fmtDate(startDate)} by and between:`, { size: 9 })
    y += 2

    addText(`CLIENT: ${clientName || '[Client Name]'}${clientAddress ? `, ${clientAddress}` : ''}${clientContact ? ` (Attn: ${clientContact})` : ''} ("Client")`, { bold: true, size: 9 })
    addText(`CONTRACTOR: ${contractorName || '[Contractor Name]'}${contractorBusiness ? ` d/b/a ${contractorBusiness}` : ''}${contractorAddress ? `, ${contractorAddress}` : ''} ("Contractor")`, { bold: true, size: 9 })
    y += 4

    addText('NOW, THEREFORE, in consideration of the mutual promises and covenants contained herein, the Parties agree as follows:', { size: 8.5 })
    y += 4

    // Section 1 - Services
    addSection('1', 'SERVICES',
      `Contractor agrees to perform the following services for Client ("Services"): ${servicesDesc || '[Description of services to be performed]'}${deliverables ? ` Deliverables shall include: ${deliverables}` : ''} Contractor shall perform the Services in a professional and workmanlike manner, consistent with industry standards.`)

    // Section 2 - Term
    const termText = ongoing
      ? `This Agreement shall commence on ${fmtDate(startDate)} and shall continue on an ongoing basis until terminated by either Party in accordance with Section 9 of this Agreement.`
      : `This Agreement shall commence on ${fmtDate(startDate)} and shall terminate on ${endDate ? fmtDate(endDate) : '[End Date]'}, unless earlier terminated in accordance with Section 9 of this Agreement.`
    addSection('2', 'TERM', termText)

    // Section 3 - Compensation
    const payDesc = paymentType === 'Fixed price'
      ? `a fixed price of ${fmtMoney(paymentAmount)}`
      : `an hourly rate of ${fmtMoney(paymentAmount)} per hour`
    addSection('3', 'COMPENSATION',
      `As full compensation for the Services, Client shall pay Contractor ${payDesc}. Payment shall be made ${paymentSchedule.toLowerCase()}. Invoices shall be paid within thirty (30) days of receipt. Unpaid invoices shall accrue interest at the rate of ${lateFeeRate}% per month (or the maximum rate permitted by applicable law, whichever is less) from the due date until paid in full. Client shall reimburse Contractor for pre-approved expenses within thirty (30) days of receipt of receipts.`)

    // Section 4 - Independent Contractor Status
    addSection('4', 'INDEPENDENT CONTRACTOR STATUS',
      'Contractor is an independent contractor and not an employee, partner, agent, or joint venture of Client. Contractor shall have no authority to bind Client to any contract, obligation, or liability. Contractor shall be solely responsible for the payment of all federal, state, and local taxes on compensation received hereunder, including self-employment taxes. Contractor shall not be entitled to receive any employee benefits, workers\' compensation, unemployment insurance, or other employment-related benefits from Client. Contractor shall provide all tools, equipment, and materials necessary to perform the Services unless otherwise agreed in writing. Client shall issue IRS Form 1099 to Contractor as required by law.')

    // Section 5 - Intellectual Property
    if (ipOwnership === 'client') {
      addSection('5', 'INTELLECTUAL PROPERTY',
        'Contractor agrees that all work product, deliverables, inventions, developments, and creative works conceived, developed, or created by Contractor in connection with the Services under this Agreement (collectively, "Work Product") shall be considered works made for hire to the maximum extent permitted by applicable law. To the extent any Work Product does not qualify as a work made for hire, Contractor hereby irrevocably assigns to Client all right, title, and interest in and to the Work Product, including all intellectual property rights therein. Contractor shall execute any documents reasonably requested by Client to perfect Client\'s ownership of the Work Product.')
    } else {
      addSection('5', 'INTELLECTUAL PROPERTY',
        'Contractor retains all right, title, and interest in and to all work product, tools, methodologies, and pre-existing intellectual property used in performing the Services. Subject to full payment of all fees due hereunder, Contractor hereby grants Client a non-exclusive, perpetual, royalty-free, worldwide license to use the deliverables produced under this Agreement for Client\'s internal business purposes. Contractor may include the deliverables in its portfolio and reference Client as a client.')
    }

    // Section 6 - Confidentiality
    addSection('6', 'CONFIDENTIALITY',
      'Contractor acknowledges that in the course of performing Services, Contractor may have access to confidential and proprietary information of Client, including but not limited to business plans, financial information, customer data, trade secrets, and technical information ("Confidential Information"). Contractor agrees to hold all Confidential Information in strict confidence, not to disclose it to any third party without Client\'s prior written consent, and to use it solely for the purpose of performing the Services. These confidentiality obligations shall survive termination of this Agreement for a period of three (3) years.')

    // Section 7 - Non-Compete / Non-Solicitation
    const restrictiveCovText: string[] = []
    if (nonCompete) {
      restrictiveCovText.push(`NON-COMPETE: For a period of ${nonCompeteDuration} year${parseInt(nonCompeteDuration) !== 1 ? 's' : ''} following termination of this Agreement, Contractor shall not engage in, own, manage, or be employed by any business that directly competes with Client's principal business activities.`)
    }
    if (nonSolicitation) {
      restrictiveCovText.push('NON-SOLICITATION: For a period of one (1) year following termination of this Agreement, Contractor shall not directly or indirectly solicit, recruit, or hire any of Client\'s employees, contractors, or clients.')
    }
    if (restrictiveCovText.length > 0) {
      addSection('7', 'RESTRICTIVE COVENANTS', restrictiveCovText.join(' '))
    } else {
      addSection('7', 'RESTRICTIVE COVENANTS',
        'No restrictive covenants apply to this Agreement. Contractor is free to perform services for other clients during and after the term of this Agreement.')
    }

    // Section 8 - Limitation of Liability
    addSection('8', 'LIMITATION OF LIABILITY',
      'TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO THIS AGREEMENT, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. EACH PARTY\'S TOTAL LIABILITY UNDER THIS AGREEMENT SHALL NOT EXCEED THE TOTAL FEES PAID OR PAYABLE TO CONTRACTOR UNDER THIS AGREEMENT IN THE THREE (3) MONTHS PRECEDING THE CLAIM.')

    // Section 9 - Termination
    addSection('9', 'TERMINATION',
      'Either Party may terminate this Agreement with thirty (30) days written notice to the other Party. Client may terminate this Agreement immediately for cause upon written notice if Contractor materially breaches this Agreement and fails to cure such breach within ten (10) days of receiving written notice. Upon termination, Client shall pay Contractor for all Services satisfactorily performed through the termination date. The provisions of Sections 5, 6, 7, 8, and 10 shall survive termination of this Agreement.')

    // Section 10 - Governing Law
    addSection('10', 'GOVERNING LAW; DISPUTE RESOLUTION',
      `This Agreement shall be governed by and construed in accordance with the laws of the State of ${governingLaw}, without regard to its conflict of laws provisions. The Parties agree to attempt to resolve any disputes arising under this Agreement through good-faith negotiation. If negotiation fails, disputes shall be resolved in the courts of competent jurisdiction in ${governingLaw}.`)

    // Section 11 - General
    addSection('11', 'GENERAL PROVISIONS',
      'This Agreement constitutes the entire agreement between the Parties with respect to the subject matter hereof and supersedes all prior agreements and understandings. This Agreement may not be amended except by a written instrument signed by both Parties. If any provision of this Agreement is found to be unenforceable, the remaining provisions shall remain in full force and effect. Neither Party may assign this Agreement without the prior written consent of the other Party. This Agreement may be executed in counterparts, each of which shall be deemed an original.')

    // Signatures
    if (y > 240) { doc.addPage(); y = 20 }
    y += 5
    doc.setDrawColor(200, 200, 200)
    doc.line(margin, y, rightEdge, y)
    y += 6

    addText('IN WITNESS WHEREOF, the Parties have executed this Independent Contractor Agreement as of the date first written above.', { size: 8.5 })
    y += 6

    const col1X = margin
    const col2X = 115
    const sigLen = 70

    doc.setFontSize(8.5)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(22, 101, 52)
    doc.text('CLIENT', col1X, y)
    doc.text('CONTRACTOR', col2X, y)
    y += 5

    doc.setTextColor(30, 30, 30)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8.5)
    const cLines = doc.splitTextToSize(clientName || '[Client Name]', 70)
    const ctLines = doc.splitTextToSize(
      contractorBusiness ? `${contractorName} d/b/a ${contractorBusiness}` : contractorName || '[Contractor Name]',
      70
    )
    doc.text(cLines, col1X, y)
    doc.text(ctLines, col2X, y)
    y += Math.max(cLines.length, ctLines.length) * 5 + 4

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    ;[
      ['Signature:', 22],
      ['Print Name:', 26],
      ['Title:', 14],
      ['Date:', 14],
    ].forEach(([lbl, off]) => {
      if (y > 275) { doc.addPage(); y = 20 }
      doc.text(lbl as string, col1X, y)
      doc.text(lbl as string, col2X, y)
      doc.setDrawColor(100, 100, 100)
      doc.line(col1X + (off as number), y, col1X + sigLen, y)
      doc.line(col2X + (off as number), y, col2X + sigLen, y)
      y += 8
    })

    // Disclaimer box
    if (y > 268) { doc.addPage(); y = 20 }
    y += 4
    doc.setFillColor(250, 250, 250)
    doc.setDrawColor(200, 200, 200)
    const disclaimerText = 'LEGAL DISCLAIMER: This contractor agreement template is provided for informational purposes only and does not constitute legal advice. Independent contractor classification requirements vary by state and jurisdiction. Misclassification of employees as contractors may result in legal and tax penalties. Consult a licensed attorney before executing this agreement.'
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
      doc.text(`Page ${i} of ${totalPages} — Independent Contractor Agreement — freelegalforms.app`, 105, 293, { align: 'center' })
    }

    doc.save('independent-contractor-agreement.pdf')
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div>
          <p className={sectionCls}>Client Information</p>
          <div className="space-y-3">
            <div>
              <label className={labelCls}>Client / Company Name</label>
              <input className={inputCls} value={clientName} onChange={e => { setClientName(e.target.value); save({ clientName: e.target.value }) }} placeholder="Acme Corporation" />
            </div>
            <div>
              <label className={labelCls}>Client Address</label>
              <input className={inputCls} value={clientAddress} onChange={e => { setClientAddress(e.target.value); save({ clientAddress: e.target.value }) }} placeholder="123 Business Ave, Suite 100, New York, NY 10001" />
            </div>
            <div>
              <label className={labelCls}>Client Contact Name</label>
              <input className={inputCls} value={clientContact} onChange={e => { setClientContact(e.target.value); save({ clientContact: e.target.value }) }} placeholder="Jane Smith (CEO)" />
            </div>
          </div>

          <p className={sectionCls}>Contractor Information</p>
          <div className="space-y-3">
            <div>
              <label className={labelCls}>Contractor Name</label>
              <input className={inputCls} value={contractorName} onChange={e => { setContractorName(e.target.value); save({ contractorName: e.target.value }) }} placeholder="John Developer" />
            </div>
            <div>
              <label className={labelCls}>Contractor Business Name (if applicable)</label>
              <input className={inputCls} value={contractorBusiness} onChange={e => { setContractorBusiness(e.target.value); save({ contractorBusiness: e.target.value }) }} placeholder="JD Solutions LLC" />
            </div>
            <div>
              <label className={labelCls}>Contractor Address</label>
              <input className={inputCls} value={contractorAddress} onChange={e => { setContractorAddress(e.target.value); save({ contractorAddress: e.target.value }) }} placeholder="456 Freelance Rd, Austin, TX 78701" />
            </div>
          </div>

          <p className={sectionCls}>Project Details</p>
          <div className="space-y-3">
            <div>
              <label className={labelCls}>Services Description</label>
              <textarea className={`${inputCls} resize-none`} rows={4} value={servicesDesc} onChange={e => { setServicesDesc(e.target.value); save({ servicesDesc: e.target.value }) }} placeholder="Web design and development services including UX design, front-end development, and CMS integration..." />
            </div>
            <div>
              <label className={labelCls}>Deliverables</label>
              <textarea className={`${inputCls} resize-none`} rows={3} value={deliverables} onChange={e => { setDeliverables(e.target.value); save({ deliverables: e.target.value }) }} placeholder="Responsive website with up to 10 pages, source code, and 30-day post-launch support..." />
            </div>
            <div>
              <label className={labelCls}>Start Date</label>
              <input className={inputCls} type="date" value={startDate} onChange={e => { setStartDate(e.target.value); save({ startDate: e.target.value }) }} />
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="ongoing" checked={ongoing} onChange={e => { setOngoing(e.target.checked); save({ ongoing: e.target.checked }) }} className="w-4 h-4 accent-green-600" />
              <label htmlFor="ongoing" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">Ongoing / No fixed end date</label>
            </div>
            {!ongoing && (
              <div>
                <label className={labelCls}>End Date</label>
                <input className={inputCls} type="date" value={endDate} onChange={e => { setEndDate(e.target.value); save({ endDate: e.target.value }) }} />
              </div>
            )}
          </div>

          <p className={sectionCls}>Payment</p>
          <div className="space-y-3">
            <div className="flex gap-2">
              {(['Fixed price', 'Hourly rate'] as const).map(t => (
                <button key={t}
                  onClick={() => { setPaymentType(t); save({ paymentType: t }) }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${paymentType === t ? 'bg-green-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>{paymentType === 'Fixed price' ? 'Total Amount ($)' : 'Hourly Rate ($/hr)'}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input className={`${inputCls} pl-7`} type="number" value={paymentAmount} onChange={e => { setPaymentAmount(e.target.value); save({ paymentAmount: e.target.value }) }} placeholder="0.00" min="0" step="0.01" />
                </div>
              </div>
              <div>
                <label className={labelCls}>Late Payment Fee (%/month)</label>
                <div className="relative">
                  <input className={`${inputCls} pr-7`} type="number" value={lateFeeRate} onChange={e => { setLateFeeRate(e.target.value); save({ lateFeeRate: e.target.value }) }} step="0.1" min="0" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">%</span>
                </div>
              </div>
            </div>
            <div>
              <label className={labelCls}>Payment Schedule</label>
              <select className={inputCls} value={paymentSchedule} onChange={e => { setPaymentSchedule(e.target.value); save({ paymentSchedule: e.target.value }) }}>
                {['Upon completion', 'Milestone-based', 'Weekly', 'Bi-weekly', 'Monthly'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <p className={sectionCls}>IP & Ownership</p>
          <div className="space-y-3">
            <div>
              <label className={labelCls}>Work Product Ownership</label>
              <div className="flex flex-col gap-2 mt-1">
                {[
                  { val: 'client', label: 'Client owns all work product (work-for-hire)' },
                  { val: 'contractor', label: 'Contractor retains rights, licenses to client' },
                ].map(({ val, label }) => (
                  <label key={val} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300">
                    <input type="radio" name="ip" value={val} checked={ipOwnership === val}
                      onChange={() => { setIpOwnership(val as typeof ipOwnership); save({ ipOwnership: val }) }}
                      className="accent-green-600" />
                    {label}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="noncompete" checked={nonCompete} onChange={e => { setNonCompete(e.target.checked); save({ nonCompete: e.target.checked }) }} className="w-4 h-4 accent-green-600" />
              <label htmlFor="noncompete" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">Include non-compete clause</label>
            </div>
            {nonCompete && (
              <div>
                <label className={labelCls}>Non-Compete Duration</label>
                <select className={inputCls} value={nonCompeteDuration} onChange={e => { setNonCompeteDuration(e.target.value); save({ nonCompeteDuration: e.target.value }) }}>
                  <option value="1">1 year</option>
                  <option value="2">2 years</option>
                </select>
              </div>
            )}
            <div className="flex items-center gap-3">
              <input type="checkbox" id="nonsolicitation" checked={nonSolicitation} onChange={e => { setNonSolicitation(e.target.checked); save({ nonSolicitation: e.target.checked }) }} className="w-4 h-4 accent-green-600" />
              <label htmlFor="nonsolicitation" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">Include non-solicitation clause</label>
            </div>
          </div>

          <p className={sectionCls}>Governing Law</p>
          <div>
            <label className={labelCls}>State</label>
            <select className={inputCls} value={governingLaw} onChange={e => { setGoverningLaw(e.target.value); save({ governingLaw: e.target.value }) }}>
              {US_STATES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Preview + Generate */}
        <div className="lg:sticky lg:top-6 space-y-4 self-start">
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
            <div className="bg-green-800 px-5 py-4">
              <p className="text-white font-bold text-center text-sm tracking-wider">INDEPENDENT CONTRACTOR AGREEMENT</p>
              <p className="text-green-200 text-xs text-center mt-1">Effective: {startDate}</p>
            </div>
            <div className="bg-gray-50 dark:bg-[#0f172a] p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400 mb-1">Client</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">{clientName || '—'}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400 mb-1">Contractor</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">{contractorName || '—'}</p>
                  {contractorBusiness && <p className="text-xs text-gray-500">{contractorBusiness}</p>}
                </div>
              </div>
              {servicesDesc && (
                <div className="text-xs border-t border-gray-200 dark:border-gray-700 pt-3">
                  <p className="text-gray-400 mb-1">Services</p>
                  <p className="text-gray-700 dark:text-gray-300 line-clamp-2">{servicesDesc}</p>
                </div>
              )}
              <div className="space-y-1.5 text-xs border-t border-gray-200 dark:border-gray-700 pt-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Payment</span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {paymentAmount ? `${fmtMoney(paymentAmount)}${paymentType === 'Hourly rate' ? '/hr' : ''}` : '—'} ({paymentType})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Schedule</span>
                  <span className="text-gray-700 dark:text-gray-300">{paymentSchedule}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Term</span>
                  <span className="text-gray-700 dark:text-gray-300">{ongoing ? 'Ongoing' : endDate ? `Until ${endDate}` : 'TBD'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">IP Ownership</span>
                  <span className="text-gray-700 dark:text-gray-300">{ipOwnership === 'client' ? 'Client owns all work' : 'Contractor retains'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Governing Law</span>
                  <span className="text-gray-700 dark:text-gray-300">{governingLaw}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 border-t border-gray-200 dark:border-gray-700 pt-3">
                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">Confidentiality</span>
                {nonCompete && <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full">Non-compete</span>}
                {nonSolicitation && <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full">Non-solicitation</span>}
                <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">IRS-compliant status</span>
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
            Creates a professional contractor agreement PDF. Both parties should review and sign.
          </p>

          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 px-4 py-3">
            <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
              <strong>Legal disclaimer:</strong> Independent contractor classification is complex. Misclassification can result in IRS penalties. State laws (California AB5, etc.) vary significantly. Consult an attorney to ensure proper classification.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
