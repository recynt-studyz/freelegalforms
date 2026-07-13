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
    a: 'An independent contractor agreement is a legally binding contract between a client and an independent contractor that defines the terms of their professional relationship. It outlines the services to be performed, compensation terms, project timeline, intellectual property ownership, confidentiality obligations, independent contractor status, and termination conditions. It distinguishes the contractor from an employee for legal and tax purposes — an important distinction that affects how income taxes are reported, who pays self-employment taxes, and whether benefits must be provided. Without a written agreement, disputes about ownership of work product, scope of services, payment terms, and confidentiality are extremely difficult to resolve.',
  },
  {
    q: 'What is the difference between an employee and a contractor?',
    a: 'Employees work under employer direction and control, receive benefits like health insurance and paid leave, have taxes withheld by the employer, and are covered by employment laws including overtime, minimum wage, and anti-discrimination protections. Independent contractors operate their own businesses, control how and when they complete their work, may work for multiple clients simultaneously, and are responsible for paying their own self-employment taxes (15.3% for Social Security and Medicare), insurance, and benefits. The IRS uses a multi-factor test focusing on behavioral control, financial control, and the nature of the relationship to determine proper classification. Misclassifying an employee as a contractor can result in back taxes, penalties, liability for unpaid benefits, and significant legal exposure in class action lawsuits.',
  },
  {
    q: 'Who owns the work created by an independent contractor?',
    a: 'By default under U.S. copyright law (17 U.S.C. § 101), a contractor retains copyright ownership of all original works they create — even if the client paid for the work — unless there is a written agreement transferring ownership. This is why an intellectual property clause in your contractor agreement is critically important. Our generator offers two options: (1) the client owns all work product as a work-for-hire or IP assignment arrangement, or (2) the contractor retains rights and grants the client a license to use the work. Most clients — particularly when commissioning custom software, designs, written content, or marketing materials — choose the work-for-hire option to ensure they own all deliverables outright. Without a written IP clause, a client who paid $50,000 for custom software technically doesn\'t own it.',
  },
  {
    q: 'Does an independent contractor agreement need to be notarized?',
    a: 'Generally, notarization is not required for an independent contractor agreement to be legally binding. A signed written contract between competent parties with adequate consideration is enforceable without notarization in virtually all U.S. jurisdictions. However, both parties should sign the agreement before any work begins, and each party should retain a fully executed copy with original signatures. For very high-value contracts (above $100,000), contracts with real property components, or agreements in industries with specific regulatory requirements, notarization provides additional evidentiary weight and can simplify enforcement if a dispute arises later.',
  },
  {
    q: 'What should be included in a contractor agreement?',
    a: 'A comprehensive independent contractor agreement should include: a detailed description of services and specific deliverables, payment type (fixed price or hourly rate) and total amount, payment schedule (upfront, milestone-based, or upon completion), late payment fee terms, project timeline (start and end dates, or ongoing designation), an intellectual property ownership clause (work-for-hire or license), confidentiality obligations protecting the client\'s trade secrets and proprietary information, an independent contractor status affirmation with IRS-compliant language, non-compete and non-solicitation restrictions if applicable (considering state enforceability), a limitation of liability provision capping damages at the contract value, termination conditions specifying notice periods, and governing law and dispute resolution. The IP clause and clear payment terms are the most critical — disputes about ownership and compensation account for the vast majority of contractor litigation.',
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

          {/* Supporting Content */}
          <div className="mb-10 space-y-10">

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">How an Independent Contractor Agreement Works</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>An independent contractor agreement defines the professional relationship between a client and a contractor who operates as an independent business — not an employee. The fundamental legal distinction matters enormously: employees have taxes withheld and receive employment law protections; contractors pay their own self-employment taxes, are ineligible for unemployment insurance and most employment law protections, and are responsible for their own benefits and insurance. The agreement establishes — in writing — that the contractor relationship is intentional, helping demonstrate proper classification if the arrangement is later reviewed by the IRS or a state labor agency.</p>
                <p>The contract&apos;s core function is to define four things with precision. The <strong className="text-gray-900 dark:text-white">scope of services</strong> specifies exactly what the contractor will deliver — and just as importantly, what falls outside the agreement. The <strong className="text-gray-900 dark:text-white">compensation terms</strong> establish whether payment is fixed-price or hourly, when payment is due, and what late fees apply. The <strong className="text-gray-900 dark:text-white">intellectual property clause</strong> determines who owns the work product — under U.S. copyright law, contractors own their work by default, so a written IP assignment is essential for clients who need to own the deliverables. The <strong className="text-gray-900 dark:text-white">confidentiality obligations</strong> protect the client&apos;s proprietary information, trade secrets, and customer data that the contractor necessarily accesses during the engagement.</p>
                <p>Payment structures fall into three main types: <strong className="text-gray-900 dark:text-white">fixed price</strong> (a set total for a defined deliverable), <strong className="text-gray-900 dark:text-white">hourly rate</strong> (a per-hour rate with time tracking), and <strong className="text-gray-900 dark:text-white">milestone-based</strong> (a portion upfront, portions at defined project milestones, and a final payment on delivery). Milestone-based payment is often the fairest structure — it gives the contractor financial security during a long project while giving the client leverage to withhold final payment until deliverables are accepted.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Freelance UX Designer Engagement</h2>
              <div className="bg-gray-50 dark:bg-[#1e293b] rounded-xl p-5 space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p><strong className="text-gray-900 dark:text-white">Horizon Media Group, Inc.</strong> needs to hire freelance UX designer <strong className="text-gray-900 dark:text-white">Tomas Reyes</strong> to redesign their mobile app. Here&apos;s how the contractor agreement is structured:</p>
                <div className="bg-white dark:bg-[#0f172a] rounded-lg p-4 border border-gray-200 dark:border-gray-700 text-xs space-y-2 font-mono">
                  <div><span className="text-gray-400">Client:</span> <span>Horizon Media Group, Inc., 220 5th Ave, New York, NY 10001</span></div>
                  <div><span className="text-gray-400">Contractor:</span> <span>Tomas Reyes Design Studio, 88 Riverside Dr, Brooklyn, NY 11201</span></div>
                  <div><span className="text-gray-400">Services:</span> <span>Complete redesign of HMG mobile app (iOS + Android) — research synthesis, wireframes, high-fidelity Figma mockups, design system, developer handoff assets</span></div>
                  <div><span className="text-gray-400">Deliverables:</span> <span>Figma project file, exported assets at all resolutions, design system PDF</span></div>
                  <div><span className="text-gray-400">Payment:</span> <span>Fixed price $14,500 — $4,500 at kickoff · $5,000 at midpoint review · $5,000 upon final acceptance</span></div>
                  <div><span className="text-gray-400">Late fee:</span> <span>1.5% per month on overdue balances after net-15</span></div>
                  <div><span className="text-gray-400">Timeline:</span> <span>10 weeks from execution date</span></div>
                  <div><span className="text-gray-400">IP Ownership:</span> <span>Client owns all work product (work-for-hire)</span></div>
                  <div><span className="text-gray-400">Non-solicitation:</span> <span>12 months — Tomas will not solicit Horizon&apos;s employees or clients</span></div>
                  <div><span className="text-gray-400">Governing law:</span> <span>New York</span></div>
                </div>
                <p>The work-for-hire clause means Horizon owns the Figma files, design system, and all assets immediately upon creation — Tomas cannot later claim copyright in the designs or license them to a competitor. The milestone payment structure protects Tomas financially during the 10-week project while giving Horizon leverage to withhold the final $5,000 until deliverables are fully accepted. Both parties sign before Tomas begins any billable work. Tomas invoices against the milestone schedule and retains copies of all signed invoices for his tax records.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Factors in Contractor Agreements</h2>
              <ul className="space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <li><strong className="text-gray-900 dark:text-white">Worker classification risk.</strong> The IRS and many states apply multi-factor tests to determine whether a worker is truly an independent contractor or a misclassified employee. Key factors include: does the client control how (not just what) the work is done? Is the relationship ongoing and exclusive, or project-based with multiple clients? Does the worker use their own tools and equipment? Misclassification can result in back taxes, FICA penalties, liability for unpaid overtime, and state labor department fines — often far exceeding the cost of properly classifying workers from the start.</li>
                <li><strong className="text-gray-900 dark:text-white">Intellectual property clause specificity.</strong> A vague IP clause — "contractor assigns all work to client" — may be insufficient. For works that don&apos;t automatically qualify as work-for-hire under 17 U.S.C. § 101 (which requires specific categories of commissioned works), include both a work-for-hire designation and an explicit copyright assignment as a backup. The assignment ensures ownership transfers even if a court determines the work-for-hire designation doesn&apos;t apply.</li>
                <li><strong className="text-gray-900 dark:text-white">Scope specificity prevents disputes.</strong> Vague scope descriptions ("consulting services — $5,000") are the primary cause of contractor disputes. Specific scope language — describing exactly what is included, what format deliverables will take, how many revision rounds are allowed, and what triggers each payment milestone — makes disputes easier to resolve and scope creep easier to bill for. If the client asks for something not in the scope, you have a written baseline for pricing the additional work.</li>
                <li><strong className="text-gray-900 dark:text-white">Non-compete enforceability.</strong> Non-compete clauses for independent contractors are entirely unenforceable in California, North Dakota, Oklahoma, and Minnesota. In other states, non-competes are only enforceable if reasonable in geographic scope, duration, and the legitimate business interest protected. Non-solicitation clauses — which prohibit the contractor from poaching the client&apos;s employees or customers — are generally more narrowly tailored and more reliably enforceable across jurisdictions.</li>
                <li><strong className="text-gray-900 dark:text-white">Payment terms and late fees.</strong> Specifying a late fee (typically 1-2% per month on overdue balances) in the agreement creates a contractual basis for recovering carrying costs on unpaid invoices without requiring a separate demand letter. Including both a net payment term (e.g., Net 15) and a late fee rate gives the contractor clear remedies and incentivizes the client to pay on time. For large projects, milestone-based payment protects both parties better than payment entirely at the end.</li>
              </ul>
            </div>

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
