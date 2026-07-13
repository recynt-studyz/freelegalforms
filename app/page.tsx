import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import InvoiceGeneratorWrapper from '@/components/InvoiceGeneratorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Free Invoice Generator — Professional PDF Invoice Maker',
  description:
    'Create professional invoices and download as PDF instantly. Free invoice generator with line items, tax, discounts and custom branding. No signup, no watermarks.',
  alternates: { canonical: 'https://freelegalforms.app' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'How do I create a professional invoice for free?',
    a: 'Use this free invoice generator — fill in your business information, client details, and line items. The tool automatically calculates subtotals, taxes, and discounts, then generates a professional PDF invoice you can download instantly. No signup required, no account creation, and no software to install. The entire process takes about two minutes and produces a PDF indistinguishable from invoices created with expensive accounting software.',
  },
  {
    q: 'Is this invoice generator really free with no watermarks?',
    a: "Yes, completely free. Your PDF invoice downloads with no watermarks, no branding from us, and no hidden fees. The invoice looks exactly like a professional invoice you'd create with paid software, because all generation happens in your browser using JavaScript. We don't charge for downloads, don't limit the number of invoices you can create, and don't require a subscription. The tool is supported by advertising, not by charging users.",
  },
  {
    q: 'What information should an invoice include?',
    a: 'A professional invoice should include your business name and contact information, the client\'s name and contact details, a unique invoice number, invoice date and payment due date, itemized line items with clear descriptions, quantities, and unit rates, any applicable discounts, the tax rate and calculated tax amount, payment terms (e.g., Net 30), the total amount due, and your preferred payment method or instructions. Missing any of these elements can delay payment or create disputes. The invoice number is especially important — it lets you and your client uniquely identify the document for accounting and follow-up purposes.',
  },
  {
    q: 'How do I add tax to my invoice?',
    a: "Enter your tax rate percentage in the Tax Rate field. The invoice generator automatically calculates the tax amount based on your subtotal after any discount is applied, and adds it to your total. The tax line appears separately on the invoice so it's clearly itemized for your client. Note that sales tax applicability varies significantly by state and by the type of service or product — in many states, professional services are not subject to sales tax while physical goods are. Verify your specific tax obligations with your state revenue department or a tax professional before adding tax to client invoices.",
  },
  {
    q: 'Can I save and reuse my invoice template?',
    a: "Yes. Your invoice details are automatically saved to your browser's local storage as you type, so your business information, client details, and preferences are remembered when you return. You can also explicitly save named templates using the Saved Templates feature — save your standard billing rates, your business information, or a complete template for a recurring client and load it with one click. Your data never leaves your device — everything is stored locally on your computer and is never transmitted to any server.",
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Free Invoice Generator',
  url: 'https://freelegalforms.app',
  description: 'Free invoice generator — create professional PDF invoices with line items, tax, and discounts. No signup.',
  applicationCategory: 'LegalApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Create a Free Professional Invoice',
  step: [
    { '@type': 'HowToStep', name: 'Fill in your business and client details', text: "Enter your business name, address, and contact information in the Bill From section. Then add your client's name and contact details in the Bill To section." },
    { '@type': 'HowToStep', name: 'Add line items and set invoice terms', text: 'Click Add Line Item to add your services or products with descriptions, quantities, and rates. The total calculates automatically. Set your invoice number, date, due date, tax rate, and payment terms.' },
    { '@type': 'HowToStep', name: 'Generate and download your PDF invoice', text: 'Click the Generate & Download PDF button to instantly create and download your professional invoice as a PDF file. No signup required and no watermarks.' },
  ],
}

const trustSignals = ['📄 No Watermarks', '🔒 Private', '⚡ Instant', '✓ Free']

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema).replace(/</g, '\\u003c') }} />

      {/* Hero */}
      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgflf.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              Free Invoice Generator
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Create professional invoices and download as PDF instantly. Free invoice maker with line items, tax calculation, and custom payment terms. No signup, no watermarks.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-4 mb-4">
            <AdBanner slot="1111111111" />
          </div>

          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <InvoiceGeneratorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      {/* Below hero */}
      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="2222222222" />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-10">
            {[
              { icon: '📄', label: 'No Watermarks', sub: 'Clean PDF, your brand only' },
              { icon: '🔒', label: 'Private', sub: 'Data never leaves your device' },
              { icon: '⚡', label: 'Instant', sub: 'PDF downloads immediately' },
              { icon: '✓', label: 'Free', sub: 'No signup, no limits' },
            ].map(t => (
              <div key={t.label} className="flex flex-col items-center rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1e293b] p-4 text-center shadow-sm">
                <span className="text-2xl mb-1">{t.icon}</span>
                <span className="text-sm font-semibold text-gray-800 dark:text-[#e2e8f0]">{t.label}</span>
                <span className="text-xs text-gray-400 mt-0.5">{t.sub}</span>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-green-900 dark:text-green-300 mb-2">
              Why use a professional invoice template?
            </h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              A professional invoice is a legally binding document and serves as formal written notice of payment owed between parties. Proper invoices include unique invoice numbers for your records, clearly itemized services or goods with quantities and rates, applicable taxes, and payment terms that establish the due date, governing payment obligations, and any late payment penalties. A well-drafted invoice — like any enforceable commercial agreement — includes complete contact information, a clear description of services rendered, and the total amount due. This free invoice generator creates PDF invoices that meet professional standards — the same format used by established businesses and independent contractors. All invoice data is processed entirely in your browser and is never transmitted to any server.
            </p>
          </div>

          {/* Supporting Content */}
          <div className="mb-10 space-y-10">

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">How Invoice Calculation Works</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>An invoice is a formal payment request that documents goods or services rendered and creates a legal obligation for payment. Modern invoice calculation follows a precise sequence: each line item multiplies a quantity by a unit rate to produce a line total. All line totals are summed to produce the <strong className="text-gray-900 dark:text-white">subtotal</strong>. If a discount applies, it is deducted from the subtotal as a percentage reduction. The tax rate is then applied to the discounted subtotal — not the original subtotal — ensuring tax is only charged on the net amount. Finally, the tax amount is added back to produce the <strong className="text-gray-900 dark:text-white">Total Due</strong>.</p>
                <p>The formula is: <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-xs font-mono">Total = (Subtotal × (1 − Discount%)) × (1 + Tax%)</code></p>
                <p>Invoice numbering is critical for your accounting records. Each invoice should carry a unique sequential identifier — such as INV-001, INV-002, or 2025-047 — that lets you track which invoices are paid, outstanding, or overdue. Payment terms like <strong className="text-gray-900 dark:text-white">Net 30</strong> mean the client must pay within 30 calendar days of the invoice date. <strong className="text-gray-900 dark:text-white">Due on Receipt</strong> means immediate payment is expected. Setting clear terms on the invoice itself — rather than in a separate email — reduces misunderstandings and gives you written documentation of agreed payment expectations.</p>
                <p>This generator handles all calculations automatically. As you add line items the subtotal updates in real time. Adjust the tax or discount rate and the total recalculates immediately. The invoice counter increments each time you generate a PDF, so sequential numbering is maintained without manual tracking.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Freelance Web Design Invoice</h2>
              <div className="bg-gray-50 dark:bg-[#1e293b] rounded-xl p-5 space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>Sarah Chen is a freelance web designer billing her client, <strong className="text-gray-900 dark:text-white">Momentum Marketing LLC</strong>, for a completed website project. She has three line items:</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs font-mono border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-1.5 pr-4 text-gray-500 font-semibold">Description</th>
                        <th className="text-right py-1.5 pr-4 text-gray-500 font-semibold">Qty</th>
                        <th className="text-right py-1.5 pr-4 text-gray-500 font-semibold">Rate</th>
                        <th className="text-right py-1.5 text-gray-500 font-semibold">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                      <tr><td className="py-1.5 pr-4 text-gray-700 dark:text-gray-300">Website design &amp; development</td><td className="text-right pr-4">40 hrs</td><td className="text-right pr-4">$80.00</td><td className="text-right">$3,200.00</td></tr>
                      <tr><td className="py-1.5 pr-4 text-gray-700 dark:text-gray-300">Content migration &amp; setup</td><td className="text-right pr-4">8 hrs</td><td className="text-right pr-4">$80.00</td><td className="text-right">$640.00</td></tr>
                      <tr><td className="py-1.5 pr-4 text-gray-700 dark:text-gray-300">Monthly maintenance retainer</td><td className="text-right pr-4">1</td><td className="text-right pr-4">$350.00</td><td className="text-right">$350.00</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-xs font-mono bg-white dark:bg-[#0f172a] rounded-lg p-3 border border-gray-200 dark:border-gray-700 space-y-1">
                  <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>$4,190.00</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Discount (5% early-completion)</span><span>−$209.50</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Discounted subtotal</span><span>$3,980.50</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Tax (8.5%)</span><span>+$338.34</span></div>
                  <div className="flex justify-between font-bold border-t border-gray-200 dark:border-gray-700 pt-1 mt-1"><span>Total Due</span><span>$4,318.84</span></div>
                </div>
                <p>Sarah sets payment terms to Net 30, dates the invoice May 1st (due May 31st), and assigns invoice number <strong className="text-gray-900 dark:text-white">INV-2025-047</strong>. The clearly itemized format lets Momentum Marketing verify each charge independently. The unique invoice number makes follow-up simple if the payment doesn&apos;t arrive by the due date — Sarah can reference INV-2025-047 specifically in any payment reminder email.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Factors for Professional Invoicing</h2>
              <ul className="space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <li><strong className="text-gray-900 dark:text-white">Unique invoice numbers.</strong> Sequential numbering (INV-001, INV-002...) is essential for matching payments to invoices, tracking outstanding balances, and maintaining audit-ready records. Gaps in numbering can raise questions during a tax audit. Use a consistent format and never reuse an invoice number, even if the original invoice was voided.</li>
                <li><strong className="text-gray-900 dark:text-white">Explicit payment terms.</strong> Net 30 is standard for B2B transactions but Net 15 or Due on Receipt is appropriate for smaller projects or new clients with no payment history. State your terms on the invoice itself — not just in the accompanying email — so the obligation is documented in the invoice record.</li>
                <li><strong className="text-gray-900 dark:text-white">Accurate tax rates.</strong> Sales tax applicability varies by state and by service type. In many states, professional services (design, consulting, legal) are not subject to sales tax while physical goods are. Never add tax without verifying your specific obligations — incorrectly charging sales tax creates liability, and failing to collect required sales tax creates its own liability.</li>
                <li><strong className="text-gray-900 dark:text-white">Specific line item descriptions.</strong> Vague line items like "Services — $5,000" delay payment and invite disputes. Specific descriptions like "Website redesign (40 hours × $80/hr)" give clients confidence that charges are legitimate and make it easy to approve payment quickly.</li>
                <li><strong className="text-gray-900 dark:text-white">Late payment policy.</strong> Including a late fee clause in your Notes/Terms field (e.g., "A 1.5% monthly late fee applies to balances outstanding beyond the due date") creates a contractual basis for charging late fees and incentivizes timely payment without requiring a separate agreement.</li>
              </ul>
            </div>

          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="pb-6">
            <AdBanner slot="3333333333" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
