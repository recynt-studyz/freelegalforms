import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import ContractorAgreementGeneratorWrapper from '@/components/ContractorAgreementGeneratorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Free Independent Contractor Agreement Generator',
  description:
    'Generate a free independent contractor agreement PDF instantly. Includes IP ownership, payment terms, confidentiality and governing law. No signup.',
  alternates: { canonical: 'https://freelegalforms.app/contractor-agreement' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What is an independent contractor agreement?',
    a: 'An independent contractor agreement is a legally binding contract between a client and an independent contractor that defines the terms of their professional relationship. It outlines the services to be performed, compensation terms, project timeline, intellectual property ownership, confidentiality obligations, independent contractor status, and termination conditions. It distinguishes the contractor from an employee for legal and tax purposes.',
  },
  {
    q: 'What is the difference between an employee and a contractor?',
    a: 'Employees work under employer direction and control, receive benefits like health insurance and paid leave, and have taxes withheld by the employer. Independent contractors operate their own businesses, control how and when they work, may work for multiple clients simultaneously, and are responsible for their own taxes, insurance, and benefits. The IRS and many states have specific tests to determine proper classification. Misclassifying an employee as a contractor can result in significant legal and tax penalties.',
  },
  {
    q: 'Who owns the work created by an independent contractor?',
    a: 'By default under U.S. copyright law, a contractor owns the work they create unless there is a written agreement transferring ownership. This is why an intellectual property clause in your contractor agreement is critical. Our generator offers two options: (1) Client owns all work product as a work-for-hire arrangement, or (2) Contractor retains rights and licenses the work to the client. Most clients prefer the work-for-hire option to ensure they own all deliverables outright.',
  },
  {
    q: 'Does an independent contractor agreement need to be notarized?',
    a: 'Generally, notarization is not required for an independent contractor agreement to be legally binding. A signed written contract is typically sufficient to create an enforceable agreement. However, both parties should sign the agreement, and each should retain a fully executed copy. For very high-value contracts or if required by your industry or jurisdiction, notarization provides additional evidentiary weight.',
  },
  {
    q: 'What should be included in a contractor agreement?',
    a: 'A comprehensive contractor agreement should include: a detailed description of services and deliverables, payment type and amount, payment schedule, project timeline (start and end dates or ongoing), intellectual property ownership clause, confidentiality obligations, independent contractor status affirmation (IRS compliance language), non-compete and non-solicitation terms if applicable, limitation of liability, termination conditions, and governing law. A strong IP clause and clear payment terms are the most critical provisions.',
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
  name: 'Free Independent Contractor Agreement Generator',
  url: 'https://freelegalforms.app/contractor-agreement',
  description: 'Free independent contractor agreement generator. Includes IP, payment, confidentiality, and governing law. No signup.',
  applicationCategory: 'LegalApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Create a Free Independent Contractor Agreement',
  step: [
    { '@type': 'HowToStep', name: 'Enter client and contractor information', text: 'Enter the client company details including name, address, and contact person. Then enter the contractor\'s name, business name if applicable, and address.' },
    { '@type': 'HowToStep', name: 'Define services, payment, and project terms', text: 'Describe the services and deliverables in detail, set payment type (fixed price or hourly) and amount, choose payment schedule, and configure IP ownership, non-compete, and non-solicitation terms.' },
    { '@type': 'HowToStep', name: 'Generate and download your contractor agreement', text: 'Click Generate & Download PDF to create your independent contractor agreement. Both client and contractor should review, sign, and retain a fully executed copy.' },
  ],
}

const trustSignals = ['📄 No Watermarks', '🔒 Private', '⚡ Instant', '✓ Free']

export default function ContractorAgreementPage() {
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
              Free Contractor Agreement Generator
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Create a professional independent contractor agreement PDF instantly. Includes services, payment terms, IP ownership, confidentiality, and governing law. No signup, no watermarks.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-4 mb-4">
            <AdBanner slot="5544332211" />
          </div>

          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <ContractorAgreementGeneratorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="6655443322" />
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
              Why every freelancer and client needs a contractor agreement
            </h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              An independent contractor agreement is essential protection for both clients and freelancers. Without a written contract, disputes about ownership of work product, payment terms, scope of services, and confidentiality obligations are extremely difficult to resolve. For clients, a properly executed contractor agreement with a work-for-hire clause ensures they own the deliverables they paid for. For contractors, it ensures they get paid according to agreed terms and clearly defines the scope of work. The agreement also establishes the contractor&apos;s independent status — an important distinction for IRS compliance. Our contractor agreement generator creates professional agreements with all the standard clauses: services description, payment terms, intellectual property ownership, confidentiality, independent contractor status language, limitation of liability, and governing law. All data is processed entirely in your browser — never transmitted to a server.
            </p>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="pb-6">
            <AdBanner slot="7766554433" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
