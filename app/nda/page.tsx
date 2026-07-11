import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import NDAGeneratorWrapper from '@/components/NDAGeneratorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Free NDA Generator — Non-Disclosure Agreement PDF',
  description:
    'Generate a free non-disclosure agreement PDF instantly. Mutual and one-way NDA templates with custom terms, duration and governing law. No signup required.',
  alternates: { canonical: 'https://freelegalforms.app/nda' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What is a non-disclosure agreement?',
    a: 'A non-disclosure agreement (NDA), also called a confidentiality agreement, is a legally binding contract in which parties agree to keep certain information confidential. NDAs are commonly used to protect trade secrets, business strategies, proprietary technology, and other sensitive information when exploring business relationships, hiring contractors, or sharing proprietary data.',
  },
  {
    q: 'What is the difference between a mutual and one-way NDA?',
    a: 'A mutual NDA (bilateral NDA) creates confidentiality obligations for both parties — each party agrees to protect the other\'s confidential information. A one-way NDA (unilateral NDA) only obligates the receiving party to keep the disclosing party\'s information confidential. Mutual NDAs are common in joint ventures and partnerships; one-way NDAs are typical when only one party is sharing proprietary information.',
  },
  {
    q: 'Is a free NDA template legally binding?',
    a: 'An NDA is legally binding when it contains the essential elements of a contract: offer, acceptance, and consideration. A well-drafted NDA template with proper terms, signatures, and consideration can be legally enforceable. However, enforceability depends on applicable state law, the specific terms of the agreement, and the circumstances of any breach. For high-stakes situations involving significant trade secrets or business interests, consulting a licensed attorney is recommended.',
  },
  {
    q: 'How long should an NDA last?',
    a: 'NDA duration depends on the nature of the confidential information and the business relationship. Common durations range from 1 to 5 years. Two to three years is typical for general business NDAs. Some NDAs include indefinite obligations for certain categories of information (such as trade secrets). Your chosen governing state\'s laws may affect the enforceability of very long-term confidentiality obligations.',
  },
  {
    q: 'Do I need a lawyer to create an NDA?',
    a: 'You don\'t need a lawyer to create a basic NDA for straightforward situations. Our free NDA generator includes standard legal clauses — definition of confidential information, obligations of the receiving party, exclusions, term, remedies, and governing law — that are commonly used in professional agreements. However, for complex arrangements involving significant intellectual property, large financial stakes, cross-border transactions, or employment relationships, consulting a licensed attorney is advisable.',
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
  name: 'Free NDA Generator',
  url: 'https://freelegalforms.app/nda',
  description: 'Free non-disclosure agreement generator — create mutual or one-way NDA PDFs instantly. No signup required.',
  applicationCategory: 'LegalApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Create a Free NDA',
  step: [
    { '@type': 'HowToStep', name: 'Choose your NDA type and enter party details', text: 'Select whether you need a Mutual NDA or One-Way NDA. Enter the names, types (Individual or Company), and states for both the disclosing and receiving parties.' },
    { '@type': 'HowToStep', name: 'Define the purpose and confidential information', text: 'Describe the purpose of disclosure and define what constitutes confidential information. Set the duration of the NDA and choose the governing state law.' },
    { '@type': 'HowToStep', name: 'Generate and download your NDA', text: 'Click Generate & Download PDF to create your legally formatted non-disclosure agreement as a PDF. Both parties should review, sign, and retain a copy of the executed agreement.' },
  ],
}

const trustSignals = ['📄 No Watermarks', '🔒 Private', '⚡ Instant', '✓ Free']

export default function NDAPage() {
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
              Free NDA Generator
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Create a legally formatted non-disclosure agreement PDF instantly. Mutual and one-way NDA templates with standard confidentiality clauses. No signup, no watermarks.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-4 mb-4">
            <AdBanner slot="4444444444" />
          </div>

          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <NDAGeneratorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="5555555555" />
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
              When should you use a non-disclosure agreement?
            </h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              A non-disclosure agreement is an essential legal document any time you share confidential business information with another party. Common situations requiring an NDA include: sharing a business idea with a potential partner or investor, hiring a contractor who will have access to proprietary systems or data, negotiating an acquisition or merger, discussing licensing your intellectual property, or entering a joint venture. A properly executed NDA creates a legally binding confidentiality obligation that gives you legal remedies — including injunctive relief — if confidential information is disclosed without authorization. Your NDA data is generated entirely in your browser and never transmitted to any server.
            </p>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="pb-6">
            <AdBanner slot="6666666666" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
