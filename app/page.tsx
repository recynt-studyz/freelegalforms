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
    a: 'Use this free invoice generator — fill in your business information, client details, and line items. The tool automatically calculates subtotals, taxes, and discounts, then generates a professional PDF invoice you can download instantly. No signup required.',
  },
  {
    q: 'Is this invoice generator really free with no watermarks?',
    a: "Yes, completely free. Your PDF invoice downloads with no watermarks, no branding from us, and no hidden fees. The invoice looks exactly like a professional invoice you'd create with paid software, because all generation happens in your browser.",
  },
  {
    q: 'What information should an invoice include?',
    a: 'A professional invoice should include your business name and contact information, client details, a unique invoice number, invoice date and due date, itemized line items with descriptions and amounts, applicable taxes or discounts, payment terms (e.g., Net 30), and total amount due.',
  },
  {
    q: 'How do I add tax to my invoice?',
    a: "Enter your tax rate percentage in the Tax Rate field. The invoice generator automatically calculates the tax amount based on your subtotal after any discount is applied, and adds it to your total. The tax line appears separately on the invoice so it's clearly itemized for your client.",
  },
  {
    q: 'Can I save and reuse my invoice template?',
    a: "Yes. Your invoice details are automatically saved to your browser's local storage, so your business information, client details, and preferences are remembered when you return. Your data never leaves your device — everything is stored locally on your computer.",
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
              A professional invoice is a legally significant document that serves as formal notification of payment owed. Proper invoices include unique invoice numbers for your records, clearly itemized services or goods with quantities and rates, applicable taxes, payment terms that establish the due date and any late payment penalties, and complete contact information for both parties. This free invoice generator creates PDF invoices that meet professional standards — the same format used by established businesses and independent contractors. All invoice data stays private in your browser and is never stored on any server.
            </p>
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
