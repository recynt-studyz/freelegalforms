import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import LeaseAgreementGeneratorWrapper from '@/components/LeaseAgreementGeneratorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Free Lease Agreement Generator — Rental Agreement PDF',
  description:
    'Generate a free residential lease agreement PDF instantly. Customizable rental agreement with all standard clauses. No signup, no watermarks required.',
  alternates: { canonical: 'https://freelegalforms.app/lease-agreement' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What should a lease agreement include?',
    a: 'A comprehensive lease agreement should include: property address and description, landlord and tenant contact information, lease term and dates, monthly rent amount and due date, security deposit terms and return policy, late fee amount and grace period, utility responsibilities, pet policy, parking arrangements, maintenance responsibilities, landlord entry notice requirements, smoking policy, termination conditions, and governing state law.',
  },
  {
    q: 'Is a free lease agreement template legally binding?',
    a: 'A lease agreement is legally binding when it contains the essential terms of the tenancy, is signed by all parties with legal capacity, and complies with applicable state and local landlord-tenant laws. While our template includes standard residential lease provisions, landlord-tenant laws vary significantly by state and municipality. Some states have mandatory lease terms or disclosure requirements. For complex situations or commercial properties, consulting a licensed real estate attorney is recommended.',
  },
  {
    q: 'How much can a landlord charge for a security deposit?',
    a: 'Security deposit limits vary significantly by state. Many states cap residential security deposits at one to two months\' rent. California caps at two months (unfurnished) or three months (furnished). New York limits to one month. Some states have no statutory cap. The landlord must typically return the security deposit within 14-30 days of the tenant vacating, depending on state law, minus any lawful deductions for unpaid rent or damage beyond normal wear and tear.',
  },
  {
    q: 'What is the difference between a lease and a rental agreement?',
    a: 'A fixed-term lease is an agreement for a specific period (typically 12 months) that cannot be unilaterally changed until the term ends. It provides stability for both landlord and tenant. A month-to-month rental agreement automatically renews each month and can be terminated by either party with proper notice (typically 30 days). Month-to-month agreements offer flexibility but less security. Our generator creates both types.',
  },
  {
    q: 'Do I need a lawyer to create a lease agreement?',
    a: 'While you can create a residential lease agreement using a template without an attorney, landlord-tenant law is highly state-specific and some states have strict tenant protection requirements. Mandatory disclosure requirements, security deposit rules, entry notice periods, habitability standards, and just-cause eviction protections vary widely. For California, New York, and other tenant-protection-heavy states, or for multi-unit properties, having an attorney review your lease can prevent costly disputes and ensure legal compliance.',
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
  name: 'Free Lease Agreement Generator',
  url: 'https://freelegalforms.app/lease-agreement',
  description: 'Free residential lease agreement generator. Customizable rental agreement PDF with all standard clauses. No signup.',
  applicationCategory: 'LegalApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Create a Free Lease Agreement',
  step: [
    { '@type': 'HowToStep', name: 'Enter property and landlord information', text: 'Enter the complete property address, property type, and landlord contact information including name, address, phone, and email.' },
    { '@type': 'HowToStep', name: 'Set lease terms and tenant details', text: 'Enter tenant names, choose lease type (fixed term or month-to-month), set start and end dates, monthly rent, security deposit, late fee policy, and configure utilities, pet, and parking terms.' },
    { '@type': 'HowToStep', name: 'Generate and download your lease agreement', text: 'Click Generate & Download PDF to create your residential lease agreement. Both landlord and all tenants should review, sign, and retain a copy of the executed lease.' },
  ],
}

const trustSignals = ['📄 No Watermarks', '🔒 Private', '⚡ Instant', '✓ Free']

export default function LeaseAgreementPage() {
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
              Free Lease Agreement Generator
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Create a comprehensive residential lease agreement PDF instantly. Includes all standard clauses — rent, security deposit, utilities, pets, maintenance, and governing law. No signup.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-4 mb-4">
            <AdBanner slot="1234567890" />
          </div>

          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <LeaseAgreementGeneratorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="0987654321" />
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
              Why every landlord needs a written lease agreement
            </h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              A written residential lease agreement is the single most important document in any landlord-tenant relationship. It establishes the legally binding terms of the tenancy, including the rent amount and due date, security deposit terms, maintenance responsibilities, entry notice requirements, and conditions for termination. Without a written lease agreement, disputes about what was agreed upon become difficult to resolve — verbal agreements are hard to prove and may not include all the legal protections state law requires. Our free lease agreement generator creates a comprehensive residential lease covering all standard clauses, customized with your specific terms. The generated PDF can be printed, signed by both parties, and retained as the binding legal agreement governing the tenancy. All document data is processed entirely in your browser.
            </p>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="pb-6">
            <AdBanner slot="1122334455" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
