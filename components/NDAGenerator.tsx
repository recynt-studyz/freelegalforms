'use client'

import { useState, useEffect, useCallback } from 'react'
import jsPDF from 'jspdf'

const STORAGE_KEY = 'flf-nda'

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

export default function NDAGenerator() {
  const [ndaType, setNdaType] = useState<'mutual' | 'one-way'>('mutual')
  const [party1Name, setParty1Name] = useState('')
  const [party1Type, setParty1Type] = useState<'Individual' | 'Company'>('Individual')
  const [party1State, setParty1State] = useState('California')
  const [party2Name, setParty2Name] = useState('')
  const [party2Type, setParty2Type] = useState<'Individual' | 'Company'>('Individual')
  const [party2State, setParty2State] = useState('California')
  const [purpose, setPurpose] = useState('Evaluating a potential business relationship')
  const [confidentialDef, setConfidentialDef] = useState('Any proprietary business information, trade secrets, technical data, financial information, customer lists, business plans, and other non-public information disclosed by one party to the other.')
  const [duration, setDuration] = useState('2')
  const [governingLaw, setGoverningLaw] = useState('California')
  const [effectiveDate, setEffectiveDate] = useState(new Date().toISOString().slice(0, 10))

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.ndaType) setNdaType(p.ndaType)
        if (p.party1Name) setParty1Name(p.party1Name)
        if (p.party1Type) setParty1Type(p.party1Type)
        if (p.party1State) setParty1State(p.party1State)
        if (p.party2Name) setParty2Name(p.party2Name)
        if (p.party2Type) setParty2Type(p.party2Type)
        if (p.party2State) setParty2State(p.party2State)
        if (p.purpose) setPurpose(p.purpose)
        if (p.confidentialDef) setConfidentialDef(p.confidentialDef)
        if (p.duration) setDuration(p.duration)
        if (p.governingLaw) setGoverningLaw(p.governingLaw)
        if (p.effectiveDate) setEffectiveDate(p.effectiveDate)
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

  const generatePDF = () => {
    const doc = new jsPDF()
    doc.setFont('helvetica')
    const margin = 20
    const rightEdge = 190
    const usableW = rightEdge - margin
    let y = 20

    function addLine() {
      doc.setDrawColor(200, 200, 200)
      doc.line(margin, y, rightEdge, y)
      y += 6
    }

    function addText(text: string, opts: { bold?: boolean; size?: number; color?: [number,number,number]; indent?: number; center?: boolean } = {}) {
      const { bold = false, size = 9, color = [30, 30, 30], indent = 0, center = false } = opts
      doc.setFontSize(size)
      doc.setFont('helvetica', bold ? 'bold' : 'normal')
      doc.setTextColor(color[0], color[1], color[2])
      const x = center ? 105 : margin + indent
      const maxW = usableW - indent
      const lines = doc.splitTextToSize(text, center ? 170 : maxW)
      if (y + lines.length * (size * 0.4) > 280) {
        doc.addPage()
        y = 20
      }
      doc.text(lines, x, y, center ? { align: 'center' } : {})
      y += lines.length * (size * 0.45) + 2
    }

    function addSection(num: string, title: string, body: string) {
      if (y > 260) { doc.addPage(); y = 20 }
      addText(`${num}. ${title}`, { bold: true, size: 9, color: [22, 101, 52] })
      addText(body, { size: 8.5, indent: 4 })
      y += 3
    }

    // Header bar
    doc.setFillColor(22, 101, 52)
    doc.rect(0, 0, 210, 12, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(7)
    doc.setFont('helvetica', 'normal')
    doc.text('freelegalforms.app — Free Legal Document Generator', 105, 8, { align: 'center' })

    y = 22

    // Title
    const titleText = ndaType === 'mutual'
      ? 'MUTUAL NON-DISCLOSURE AGREEMENT'
      : 'NON-DISCLOSURE AGREEMENT'
    addText(titleText, { bold: true, size: 16, color: [22, 101, 52], center: true })
    y += 3
    addLine()

    // Preamble
    const p1Label = ndaType === 'mutual' ? '"Party A"' : '"Disclosing Party"'
    const p2Label = ndaType === 'mutual' ? '"Party B"' : '"Receiving Party"'
    addText(`This ${ndaType === 'mutual' ? 'Mutual ' : ''}Non-Disclosure Agreement ("Agreement") is entered into as of ${fmtDate(effectiveDate)} by and between:`, { size: 9 })
    y += 2
    addText(`${party1Name || '[Party A Name]'}, a${party1Type === 'Individual' ? 'n' : ''} ${party1Type} (${p1Label})`, { bold: true, size: 9, indent: 5 })
    addText('and', { size: 9, center: true })
    addText(`${party2Name || '[Party B Name]'}, a${party2Type === 'Individual' ? 'n' : ''} ${party2Type} (${p2Label})`, { bold: true, size: 9, indent: 5 })
    y += 2

    if (ndaType === 'mutual') {
      addText('(collectively referred to as "the Parties")', { size: 8.5 })
    }
    y += 2

    // Recitals
    addText('RECITALS', { bold: true, size: 9, color: [22, 101, 52] })
    addText(`The Parties wish to engage in ${purpose}. In connection therewith, the Parties may disclose certain Confidential Information to each other and wish to protect such information from unauthorized use and disclosure.`, { size: 8.5, indent: 4 })
    y += 3

    addText('AGREEMENT', { bold: true, size: 10, color: [22, 101, 52] })
    addText('NOW, THEREFORE, in consideration of the mutual promises and covenants contained herein, and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the Parties agree as follows:', { size: 8.5 })
    y += 3

    // Section 1
    addSection('1', 'DEFINITION OF CONFIDENTIAL INFORMATION',
      `"Confidential Information" means ${confidentialDef} Confidential Information includes all information whether disclosed orally, in writing, electronically, or in any other form, and whether or not labeled as "confidential." The obligations of this Agreement apply to all Confidential Information disclosed on or after the Effective Date.`)

    // Section 2
    const receiving = ndaType === 'mutual' ? 'each Party, in its capacity as Receiving Party,' : 'the Receiving Party'
    addSection('2', 'OBLIGATIONS OF RECEIVING PARTY',
      `${ndaType === 'mutual' ? 'Each Party, as Receiving Party, agrees' : 'The Receiving Party agrees'} to: (a) hold all Confidential Information in strict confidence and not disclose it to any third party without the prior written consent of the Disclosing Party; (b) use the Confidential Information solely for the purpose of ${purpose}; (c) protect the Confidential Information with at least the same degree of care it uses to protect its own confidential information, but in no event less than reasonable care; (d) limit access to Confidential Information to those employees, contractors, or agents who have a need to know and are bound by confidentiality obligations at least as protective as those in this Agreement.`)

    // Section 3
    addSection('3', 'EXCLUSIONS FROM CONFIDENTIAL INFORMATION',
      'The confidentiality obligations of this Agreement shall not apply to information that: (a) is or becomes publicly available through no breach of this Agreement by the Receiving Party; (b) was rightfully known by the Receiving Party before disclosure without restriction; (c) is independently developed by the Receiving Party without reference to or use of the Confidential Information; (d) is rightfully received from a third party without restriction; or (e) is required to be disclosed by law, regulation, or valid court order, provided that the Receiving Party provides prompt written notice to the Disclosing Party to allow it to seek a protective order.')

    // Section 4
    addSection('4', 'TERM',
      `This Agreement shall commence on the Effective Date and shall remain in effect for a period of ${duration} year${parseInt(duration) !== 1 ? 's' : ''} unless earlier terminated by mutual written agreement. The confidentiality obligations set forth herein shall survive the expiration or termination of this Agreement with respect to Confidential Information disclosed during the term.`)

    // Section 5
    addSection('5', 'RETURN OF INFORMATION',
      'Upon written request by the Disclosing Party, or upon expiration or termination of this Agreement, the Receiving Party shall promptly return or destroy all tangible materials containing Confidential Information and, upon request, provide written certification of such return or destruction.')

    // Section 6
    addSection('6', 'REMEDIES',
      'The Parties acknowledge that any breach or threatened breach of this Agreement would cause irreparable harm to the Disclosing Party for which monetary damages would be an inadequate remedy. Accordingly, in addition to all other remedies available at law or in equity, the Disclosing Party shall be entitled to seek injunctive or other equitable relief to prevent or remedy any actual or threatened breach, without the requirement of posting bond or other security.')

    // Section 7
    addSection('7', 'GOVERNING LAW AND JURISDICTION',
      `This Agreement shall be governed by and construed in accordance with the laws of the State of ${governingLaw}, without regard to its conflict of laws provisions. Any disputes arising out of or relating to this Agreement shall be subject to the exclusive jurisdiction of the state and federal courts located in ${governingLaw}.`)

    // Section 8
    addSection('8', 'ENTIRE AGREEMENT; AMENDMENTS',
      'This Agreement constitutes the entire agreement between the Parties concerning the subject matter hereof and supersedes all prior negotiations, representations, warranties, and understandings. This Agreement may be amended only by a written instrument signed by authorized representatives of both Parties.')

    // Section 9
    addSection('9', 'SEVERABILITY',
      'If any provision of this Agreement is held to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid or unenforceable provision shall be modified to the minimum extent necessary to make it valid and enforceable.')

    // Section 10
    addSection('10', 'NO LICENSE',
      'Nothing in this Agreement grants either Party any right, title, or interest in or to the other Party\'s Confidential Information, except the limited right to use such information solely for the purpose described herein. No license under any patent, copyright, trade secret, or other intellectual property right is granted herein.')

    // Signature blocks
    if (y > 240) { doc.addPage(); y = 20 }
    y += 5
    addLine()
    addText('IN WITNESS WHEREOF, the Parties have executed this Non-Disclosure Agreement as of the date first written above.', { size: 8.5 })
    y += 6

    // Two-column signatures
    const col1X = margin
    const col2X = 115
    const sigLineLen = 70

    doc.setFontSize(8.5)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(22, 101, 52)
    doc.text(ndaType === 'mutual' ? 'PARTY A' : 'DISCLOSING PARTY', col1X, y)
    doc.text(ndaType === 'mutual' ? 'PARTY B' : 'RECEIVING PARTY', col2X, y)
    y += 6

    doc.setTextColor(30, 30, 30)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8.5)
    const p1Lines = doc.splitTextToSize(party1Name || '[Party A Name]', 70)
    const p2Lines = doc.splitTextToSize(party2Name || '[Party B Name]', 70)
    doc.text(p1Lines, col1X, y)
    doc.text(p2Lines, col2X, y)
    y += Math.max(p1Lines.length, p2Lines.length) * 5 + 4

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.text('Signature:', col1X, y)
    doc.text('Signature:', col2X, y)
    doc.setDrawColor(100, 100, 100)
    doc.line(col1X + 22, y, col1X + sigLineLen, y)
    doc.line(col2X + 22, y, col2X + sigLineLen, y)
    y += 8

    doc.text('Print Name:', col1X, y)
    doc.text('Print Name:', col2X, y)
    doc.line(col1X + 26, y, col1X + sigLineLen, y)
    doc.line(col2X + 26, y, col2X + sigLineLen, y)
    y += 8

    if (party1Type === 'Company' || party2Type === 'Company') {
      doc.text('Title:', col1X, y)
      doc.text('Title:', col2X, y)
      doc.line(col1X + 14, y, col1X + sigLineLen, y)
      doc.line(col2X + 14, y, col2X + sigLineLen, y)
      y += 8
    }

    doc.text('Date:', col1X, y)
    doc.text('Date:', col2X, y)
    doc.line(col1X + 14, y, col1X + sigLineLen, y)
    doc.line(col2X + 14, y, col2X + sigLineLen, y)

    // Footer
    const totalPages = doc.getNumberOfPages()
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i)
      doc.setDrawColor(200, 200, 200)
      doc.line(margin, 288, rightEdge, 288)
      doc.setTextColor(150, 150, 150)
      doc.setFontSize(6.5)
      doc.setFont('helvetica', 'normal')
      doc.text(`Page ${i} of ${totalPages} — Non-Disclosure Agreement — freelegalforms.app`, 105, 293, { align: 'center' })
    }

    doc.save('nda-agreement.pdf')
  }

  const tabCls = (active: boolean) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-green-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div>
          <p className={sectionCls}>Agreement Type</p>
          <div className="flex gap-2 mb-4">
            <button className={tabCls(ndaType === 'mutual')} onClick={() => { setNdaType('mutual'); save({ ndaType: 'mutual' }) }}>Mutual NDA</button>
            <button className={tabCls(ndaType === 'one-way')} onClick={() => { setNdaType('one-way'); save({ ndaType: 'one-way' }) }}>One-Way NDA</button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            {ndaType === 'mutual'
              ? 'Both parties agree to keep each other\'s information confidential.'
              : 'Only the Receiving Party is obligated to keep the Disclosing Party\'s information confidential.'}
          </p>

          <p className={sectionCls}>{ndaType === 'mutual' ? 'Party A (Disclosing)' : 'Disclosing Party'}</p>
          <div className="space-y-3">
            <div>
              <label className={labelCls}>{ndaType === 'mutual' ? 'Party A' : 'Disclosing Party'} Name</label>
              <input className={inputCls} value={party1Name} onChange={e => { setParty1Name(e.target.value); save({ party1Name: e.target.value }) }} placeholder="Jane Smith or ABC Corp" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Type</label>
                <select className={inputCls} value={party1Type} onChange={e => { setParty1Type(e.target.value as 'Individual' | 'Company'); save({ party1Type: e.target.value }) }}>
                  <option>Individual</option>
                  <option>Company</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>State</label>
                <select className={inputCls} value={party1State} onChange={e => { setParty1State(e.target.value); save({ party1State: e.target.value }) }}>
                  {US_STATES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>

          <p className={sectionCls}>{ndaType === 'mutual' ? 'Party B (Receiving)' : 'Receiving Party'}</p>
          <div className="space-y-3">
            <div>
              <label className={labelCls}>{ndaType === 'mutual' ? 'Party B' : 'Receiving Party'} Name</label>
              <input className={inputCls} value={party2Name} onChange={e => { setParty2Name(e.target.value); save({ party2Name: e.target.value }) }} placeholder="John Doe or XYZ Inc" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Type</label>
                <select className={inputCls} value={party2Type} onChange={e => { setParty2Type(e.target.value as 'Individual' | 'Company'); save({ party2Type: e.target.value }) }}>
                  <option>Individual</option>
                  <option>Company</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>State</label>
                <select className={inputCls} value={party2State} onChange={e => { setParty2State(e.target.value); save({ party2State: e.target.value }) }}>
                  {US_STATES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>

          <p className={sectionCls}>Agreement Terms</p>
          <div className="space-y-3">
            <div>
              <label className={labelCls}>Effective Date</label>
              <input className={inputCls} type="date" value={effectiveDate} onChange={e => { setEffectiveDate(e.target.value); save({ effectiveDate: e.target.value }) }} />
            </div>
            <div>
              <label className={labelCls}>Purpose of Disclosure</label>
              <textarea className={`${inputCls} resize-none`} rows={2} value={purpose} onChange={e => { setPurpose(e.target.value); save({ purpose: e.target.value }) }} />
            </div>
            <div>
              <label className={labelCls}>Definition of Confidential Information</label>
              <textarea className={`${inputCls} resize-none`} rows={3} value={confidentialDef} onChange={e => { setConfidentialDef(e.target.value); save({ confidentialDef: e.target.value }) }} />
            </div>
            <div>
              <label className={labelCls}>Duration</label>
              <select className={inputCls} value={duration} onChange={e => { setDuration(e.target.value); save({ duration: e.target.value }) }}>
                <option value="1">1 year</option>
                <option value="2">2 years</option>
                <option value="3">3 years</option>
                <option value="5">5 years</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Governing Law (State)</label>
              <select className={inputCls} value={governingLaw} onChange={e => { setGoverningLaw(e.target.value); save({ governingLaw: e.target.value }) }}>
                {US_STATES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Preview + Generate */}
        <div className="lg:sticky lg:top-6 space-y-4 self-start">
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
            <div className="bg-green-800 px-5 py-4">
              <p className="text-white font-bold text-center text-sm tracking-wider">
                {ndaType === 'mutual' ? 'MUTUAL NON-DISCLOSURE AGREEMENT' : 'NON-DISCLOSURE AGREEMENT'}
              </p>
              <p className="text-green-200 text-xs text-center mt-1">Effective: {effectiveDate}</p>
            </div>
            <div className="bg-gray-50 dark:bg-[#0f172a] p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400 mb-1">
                    {ndaType === 'mutual' ? 'Party A' : 'Disclosing Party'}
                  </p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">{party1Name || '—'}</p>
                  <p className="text-xs text-gray-500">{party1Type} · {party1State}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400 mb-1">
                    {ndaType === 'mutual' ? 'Party B' : 'Receiving Party'}
                  </p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">{party2Name || '—'}</p>
                  <p className="text-xs text-gray-500">{party2Type} · {party2State}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs border-t border-gray-200 dark:border-gray-700 pt-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Type</span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{ndaType === 'mutual' ? 'Mutual' : 'One-Way'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration</span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{duration} year{parseInt(duration) !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Governing Law</span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{governingLaw}</span>
                </div>
              </div>

              {purpose && (
                <div className="text-xs border-t border-gray-200 dark:border-gray-700 pt-3">
                  <p className="text-gray-400 mb-1">Purpose</p>
                  <p className="text-gray-700 dark:text-gray-300 line-clamp-2">{purpose}</p>
                </div>
              )}

              <div className="text-xs border-t border-gray-200 dark:border-gray-700 pt-3">
                <p className="text-gray-500 font-medium">Includes clauses:</p>
                <ul className="mt-1 space-y-0.5 text-gray-400">
                  {['Confidentiality obligations','Exclusions','Term & survival','Return of information','Remedies','Governing law','Entire agreement'].map(c => (
                    <li key={c} className="flex items-center gap-1.5">
                      <span className="text-green-500">✓</span> {c}
                    </li>
                  ))}
                </ul>
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
            Creates a legally formatted NDA PDF. Both parties should review and sign.
          </p>

          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 px-4 py-3">
            <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
              <strong>Legal disclaimer:</strong> This NDA template is for informational purposes only and does not constitute legal advice. Laws vary by state and jurisdiction. For complex business arrangements, consult a licensed attorney.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
