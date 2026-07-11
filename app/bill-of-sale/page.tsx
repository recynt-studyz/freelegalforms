import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import BillOfSaleGeneratorWrapper from '@/components/BillOfSaleGeneratorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Free Bill of Sale Generator — Vehicle & Property',
  description:
    'Generate a free bill of sale for vehicles, property, boats or firearms. Download professional PDF bill of sale instantly. No signup, no watermarks.',
  alternates: { canonical: 'https://freelegalforms.app/bill-of-sale' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What is a bill of sale?',
    a: 'A bill of sale is a legal document that transfers ownership of property from a seller to a buyer. It serves as written evidence of a transaction and typically includes a description of the property, the sale price, payment terms, and signatures of both parties. A bill of sale is commonly used for motor vehicles, boats, firearms, equipment, and other personal property.',
  },
  {
    q: 'Is a bill of sale required when selling a car?',
    a: 'Requirements vary by state. Many states require a bill of sale as part of the vehicle title transfer process with the DMV. Even when not legally required, a bill of sale is strongly recommended to protect both the seller and buyer. For the seller, it provides documentation that ownership has transferred. For the buyer, it serves as a receipt and proof of legal purchase.',
  },
  {
    q: 'Does a bill of sale need to be notarized?',
    a: 'Notarization requirements vary by state and the type of property being transferred. Some states require notarized bills of sale for vehicle transfers, while others do not. Even when not required, notarization adds legal weight to the document by providing independent verification of signatures. Check your state\'s DMV or motor vehicle department for specific requirements.',
  },
  {
    q: 'What information should a bill of sale include?',
    a: 'A complete bill of sale should include: the full names and addresses of the seller and buyer, a detailed description of the property (including VIN, year, make, model, and mileage for vehicles), the sale price in full, payment method, sale date, any as-is disclosure or warranty terms, a statement that the seller has legal title free and clear of liens, and signatures from both parties.',
  },
  {
    q: 'Is a bill of sale legally binding?',
    a: 'Yes, a properly executed bill of sale is a legally binding contract that transfers ownership of property from seller to buyer. Both parties should sign the document in the presence of a witness or notary (as required by your state) and retain a copy. For vehicles, the bill of sale is typically used alongside the title transfer at the state DMV.',
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
  name: 'Free Bill of Sale Generator',
  url: 'https://freelegalforms.app/bill-of-sale',
  description: 'Free bill of sale generator for vehicles, property, boats, and firearms. Download PDF instantly. No signup.',
  applicationCategory: 'LegalApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Create a Free Bill of Sale',
  step: [
    { '@type': 'HowToStep', name: 'Select your document type and enter seller and buyer information', text: 'Choose the type of bill of sale (vehicle, general property, boat, or firearm) and enter the complete contact details for both the seller and buyer.' },
    { '@type': 'HowToStep', name: 'Describe the property being sold', text: 'For vehicles, enter the year, make, model, VIN, mileage, and color. For other property, provide a complete description. Enter the sale price, payment method, and sale date.' },
    { '@type': 'HowToStep', name: 'Generate and download your bill of sale', text: 'Click Generate & Download PDF to create your bill of sale document. Both seller and buyer should sign the document and retain a copy. Some states require notarization.' },
  ],
}

const trustSignals = ['📄 No Watermarks', '🔒 Private', '⚡ Instant', '✓ Free']

export default function BillOfSalePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema).replace(/</g, '\\u003c') }} />

      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgflf.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              Free Bill of Sale Generator
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Create a professional bill of sale for vehicles, property, boats, or firearms. Download as PDF instantly. Legally formatted with as-is disclosure and title warranty. No signup.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-4 mb-4">
            <AdBanner slot="7777777777" />
          </div>

          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <BillOfSaleGeneratorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="8888888888" />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-10">
            {[
              { icon: '📄', label: 'No Watermarks', sub: 'Professional legal document' },
              { icon: '🔒', label: 'Private', sub: 'Data stays in your browser' },
              { icon: '⚡', label: 'Instant', sub: 'Download in seconds' },
              { icon: '✓', label: 'Free', sub: 'No signup, no cost' },
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
              Why you need a bill of sale for private transactions
            </h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              A bill of sale is the primary legal document that transfers ownership of property in a private sale. Without a signed bill of sale, disputes about the terms of a sale — the price, the date, what was included, and whether the item was sold with or without a warranty — are difficult to resolve. For vehicle sales, most states require a bill of sale as part of the title transfer process with the DMV. The bill of sale also protects the seller from liability after the transaction by documenting that ownership has legally transferred to the buyer. Our bill of sale generator creates professionally formatted, legally specific documents for vehicles, property, boats, and firearms. All document data is processed entirely in your browser — no information is ever sent to a server.
            </p>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="pb-6">
            <AdBanner slot="9999999999" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
