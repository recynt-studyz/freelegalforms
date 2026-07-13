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
    a: 'A comprehensive residential lease agreement should include: the full property address and property type, complete contact information for the landlord and all tenants, the lease start and end dates (or month-to-month designation), the exact monthly rent amount and the date it is due each month, the security deposit amount and the conditions and timeline for its return, late fee amount and grace period, which party pays each utility, pet policy and any pet deposit, parking terms, maintenance and repair responsibilities of each party, the required notice period before the landlord may enter (typically 24-48 hours under state law), smoking policy, conditions for early termination, and the governing state law. Missing any of these elements — particularly security deposit terms and utility responsibilities — is a common source of landlord-tenant disputes.',
  },
  {
    q: 'Is a free lease agreement template legally binding?',
    a: 'A lease agreement is legally binding when it contains the essential terms of the tenancy, is signed by all parties with legal capacity, and complies with applicable state and local landlord-tenant laws. A signed written lease is enforceable in court and governs both parties\' rights for the duration of the tenancy. Landlord-tenant laws vary significantly by state and municipality — some states have mandatory disclosure requirements (lead paint, mold history, flood zone status) that must accompany every lease for it to be fully enforceable. Our template includes standard provisions but does not substitute for state-specific mandatory disclosures. For complex situations, multi-unit properties, or commercial rentals, consulting a licensed real estate attorney is recommended.',
  },
  {
    q: 'How much can a landlord charge for a security deposit?',
    a: 'Security deposit limits vary significantly by state. California limits security deposits to 2 months\' rent for unfurnished units and 3 months for furnished units. New York caps deposits at 1 month\'s rent for most residential leases. Many other states cap deposits at 1-2 months\' rent. Texas, Florida, and several other states have no statutory maximum, leaving the amount to market negotiation. The landlord must return the security deposit within a legally specified period after the tenant vacates — typically 14-30 days depending on the state — along with an itemized written statement of any deductions. Improper withholding of a security deposit can result in the landlord owing the tenant double or triple the amount wrongfully withheld, plus attorney fees, in many states.',
  },
  {
    q: 'What is the difference between a lease and a rental agreement?',
    a: 'A fixed-term lease is an agreement for a specific period — typically 12 months — that locks in the terms for both parties until the end date. Neither party can unilaterally change the rent, add new conditions, or terminate early without consequences during the lease term. It provides stability: the tenant is assured they can stay through the term; the landlord is assured of rent income. A month-to-month rental agreement automatically renews each month and can be terminated by either party with proper advance notice — typically 30 days, though some states require 60 days for long-term tenants. Month-to-month agreements give both parties flexibility but less certainty. Landlords can raise rent with proper notice; tenants can leave without breaking a long-term commitment.',
  },
  {
    q: 'Do I need a lawyer to create a lease agreement?',
    a: 'While you can create a basic residential lease using a template without an attorney, landlord-tenant law is among the most state-specific areas of law in the U.S. Mandatory disclosure requirements, security deposit rules, entry notice periods, habitability standards, just-cause eviction protections, and rent control ordinances vary dramatically by state and even by city. California, New York, Oregon, and several other states have enacted strong tenant protections that override conflicting lease terms — meaning a lease clause that would be valid in Texas may be illegal in San Francisco. For landlords in tenant-protection-heavy states, or for multi-unit properties where tenant disputes can be costly, having an attorney review your lease before use can prevent significant financial and legal exposure.',
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

          {/* Supporting Content */}
          <div className="mb-10 space-y-10">

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">How a Residential Lease Agreement Works</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>A residential lease agreement is a legally binding contract that establishes every material term of the landlord-tenant relationship. It operates on top of a foundation of state landlord-tenant law — which sets minimum tenant rights that a lease cannot override — and fills in the specific negotiated terms: rent amount, lease duration, deposit, maintenance responsibilities, and dozens of other details. When a dispute arises between a landlord and tenant, the lease is the first document a court examines to determine each party&apos;s rights and obligations.</p>
                <p>The financial structure of a residential lease centers on three figures. The <strong className="text-gray-900 dark:text-white">monthly rent</strong> is the recurring payment due on the specified date — missing this date triggers the grace period and potentially the late fee. The <strong className="text-gray-900 dark:text-white">security deposit</strong> is a lump sum collected at signing and held by the landlord as collateral against unpaid rent or damage beyond normal wear and tear; state law strictly governs how it is held, when it must be returned, and what deductions are permissible. The <strong className="text-gray-900 dark:text-white">late fee</strong> is a contractual penalty applied after a specified grace period — most states regulate the maximum late fee and require a minimum grace period before it can be charged.</p>
                <p>A lease must clearly specify whether it is a <strong className="text-gray-900 dark:text-white">fixed-term lease</strong> (most commonly 12 months) or a <strong className="text-gray-900 dark:text-white">month-to-month agreement</strong> that renews automatically until terminated by either party with proper notice. Fixed-term leases provide certainty: neither party can change rent or terms mid-lease, and the tenant has the right to remain through the end date. Month-to-month agreements offer flexibility for both parties but require proper notice — typically 30 days — before termination.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: 12-Month Residential Lease in Texas</h2>
              <div className="bg-gray-50 dark:bg-[#1e293b] rounded-xl p-5 space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>Priya Sharma is a landlord renting her single-family home in Austin, Texas to a tenant named Jordan Walsh. Here&apos;s how she configures the lease:</p>
                <div className="bg-white dark:bg-[#0f172a] rounded-lg p-4 border border-gray-200 dark:border-gray-700 text-xs space-y-2 font-mono">
                  <div><span className="text-gray-400">Property:</span> <span>1847 Barton Springs Rd, Austin, TX 78704</span></div>
                  <div><span className="text-gray-400">Landlord:</span> <span>Priya Sharma (Owner)</span></div>
                  <div><span className="text-gray-400">Tenant:</span> <span>Jordan Walsh</span></div>
                  <div><span className="text-gray-400">Lease type:</span> <span>Fixed 12 months — Sep 1, 2025 through Aug 31, 2026</span></div>
                  <div><span className="text-gray-400">Monthly rent:</span> <span>$2,400.00 due on the 1st of each month</span></div>
                  <div><span className="text-gray-400">Grace period:</span> <span>5 days (Texas law minimum)</span></div>
                  <div><span className="text-gray-400">Late fee:</span> <span>$100 flat fee after day 5</span></div>
                  <div><span className="text-gray-400">Security deposit:</span> <span>$2,400 (1 month&apos;s rent)</span></div>
                  <div><span className="text-gray-400">Pets:</span> <span>1 dog allowed, max 40 lbs, $500 pet deposit</span></div>
                  <div><span className="text-gray-400">Utilities:</span> <span>Tenant pays electricity &amp; internet; Landlord pays water &amp; trash</span></div>
                </div>
                <p>Under Texas law, Priya must return the security deposit within <strong className="text-gray-900 dark:text-white">30 days</strong> of Jordan vacating, along with an itemized written statement of any deductions. Permissible deductions include unpaid rent and damage beyond normal wear and tear — not routine cleaning or carpet replacement at the end of normal useful life. If Priya fails to return the deposit within 30 days without a valid itemized deduction list, Jordan can sue for three times the wrongfully withheld amount plus attorney fees. Both parties sign the lease on August 15th; Jordan takes possession and pays first month&apos;s rent plus the security deposit at signing.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Factors in Residential Leases</h2>
              <ul className="space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <li><strong className="text-gray-900 dark:text-white">Security deposit limits by state.</strong> Many states cap security deposits at 1-2 months&apos; rent. California limits deposits to 2 months for unfurnished units; New York caps at 1 month for most leases. Charging above the state maximum is unlawful — even if the tenant agrees — and can expose the landlord to double or triple damages plus attorney fees in many states. Always verify your state&apos;s current cap before setting the deposit amount.</li>
                <li><strong className="text-gray-900 dark:text-white">Late fee limitations.</strong> States regulate late fees significantly. Oregon caps late fees at 4% of the monthly rent. California requires a 3-day grace period before any late fee can be charged. Washington limits late fees to 1.5% of monthly rent. Texas allows fees after a 2-day grace period and does not cap the percentage. A late fee that exceeds state limits is unenforceable — the landlord cannot collect it even if the tenant contractually agreed to it.</li>
                <li><strong className="text-gray-900 dark:text-white">Landlord entry notice requirements.</strong> Most states require landlords to give advance notice before entering a rental unit for non-emergency purposes — typically 24 hours in California and Florida, or 48 hours in Kentucky and other states. A lease clause attempting to waive a tenant&apos;s right to entry notice is void as against public policy in most states. The only exception is genuine emergencies like fire, flooding, or burst pipes.</li>
                <li><strong className="text-gray-900 dark:text-white">Implied warranty of habitability.</strong> Federal and state law requires landlords to maintain rental properties in a habitable condition — working heat, plumbing, structural integrity, and freedom from significant pest infestations — regardless of what any lease provision says. A clause attempting to disclaim habitability obligations is unenforceable. Failure to maintain habitability can give tenants the right to withhold rent, repair and deduct, or terminate the lease in most states.</li>
                <li><strong className="text-gray-900 dark:text-white">Local rent control and just-cause eviction laws.</strong> Cities including New York, Los Angeles, San Francisco, Portland, and Seattle have enacted local ordinances that cap rent increases, restrict allowable grounds for eviction, or require relocation assistance that applies independently of what the lease says. Landlords in these cities must understand local requirements — a lease that is perfectly valid under state law may still be non-compliant with local ordinances.</li>
              </ul>
            </div>

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
