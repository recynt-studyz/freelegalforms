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
    a: 'A non-disclosure agreement (NDA), also called a confidentiality agreement, is a legally binding contract in which one or both parties agree to keep certain information confidential. NDAs are commonly used to protect trade secrets, business strategies, proprietary technology, and other sensitive information when exploring business relationships, hiring contractors, or sharing proprietary data. The agreement creates a legal obligation — not merely a moral one — and gives the disclosing party the right to seek court-ordered injunctive relief if confidential information is shared without authorization. A well-drafted NDA defines what information is protected, how it may be used, how long the obligation lasts, and what remedies are available for breach.',
  },
  {
    q: 'What is the difference between a mutual and one-way NDA?',
    a: 'A mutual NDA (bilateral NDA) creates confidentiality obligations for both parties — each party agrees to protect the other\'s confidential information. A one-way NDA (unilateral NDA) only obligates the receiving party to keep the disclosing party\'s information confidential. Mutual NDAs are common in joint ventures, partnerships, and merger discussions where both sides are sharing proprietary information. One-way NDAs are typical when only one party is sharing — for example, a startup sharing its product roadmap with a prospective investor, or a company sharing trade secret recipes with a manufacturer. Choosing the right type matters: using a mutual NDA when only one party is sharing can inadvertently create confidentiality obligations where none were intended.',
  },
  {
    q: 'Is a free NDA template legally binding?',
    a: 'An NDA is legally binding when it contains the essential elements of a contract: offer, acceptance, and consideration. In most NDAs, consideration is the mutual promise to maintain confidentiality or the business opportunity itself (access to proprietary information in exchange for a promise of confidentiality). A well-drafted NDA template with clear terms, signatures from authorized representatives of both parties, and adequate consideration can be fully legally enforceable. However, enforceability depends on applicable state law, the specificity of the confidential information definition, the reasonableness of the obligations, and the circumstances of any breach. Courts routinely enforce properly executed NDA templates. For high-stakes situations involving significant trade secrets, substantial financial risk, or employment relationships, consulting a licensed attorney is recommended.',
  },
  {
    q: 'How long should an NDA last?',
    a: 'NDA duration depends on the nature of the confidential information and the business relationship. Common durations range from 1 to 5 years. Two to three years is typical for general business NDAs. Some NDAs include perpetual or indefinite obligations specifically for information that qualifies as a trade secret — since trade secret protection can theoretically last forever as long as the information remains secret. However, courts in some states are skeptical of very long-term or perpetual NDA obligations and may decline to enforce them as written. Your chosen governing state\'s laws significantly affect the enforceability of the duration you select. California, in particular, treats long-term NDAs in employment contexts differently than most states.',
  },
  {
    q: 'Do I need a lawyer to create an NDA?',
    a: 'You don\'t need a lawyer to create a basic NDA for straightforward business situations. Our free NDA generator includes all the standard legal clauses — a definition of confidential information, obligations of the receiving party, standard exclusions, the term of the agreement, remedies provisions acknowledging the right to injunctive relief, and governing law — that attorneys commonly include in professional NDAs. These clauses reflect widely accepted contract drafting practices. However, for complex arrangements involving significant intellectual property, large financial stakes, cross-border transactions, M&A due diligence, or employment relationships, having a licensed attorney review your specific situation is advisable. The cost of a legal review is small compared to the potential consequences of a poorly drafted NDA in a high-value situation.',
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

          {/* Supporting Content */}
          <div className="mb-10 space-y-10">

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">How a Non-Disclosure Agreement Works</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>A non-disclosure agreement works by creating a legally binding obligation for one or both parties to protect designated confidential information. For an NDA to be enforceable, it must satisfy the standard requirements of contract law: there must be an <strong className="text-gray-900 dark:text-white">offer</strong> (the promise to share information), <strong className="text-gray-900 dark:text-white">acceptance</strong> (the other party&apos;s agreement), and <strong className="text-gray-900 dark:text-white">consideration</strong> — something of value exchanged, which in most NDAs is the business opportunity itself or the mutual promise of confidentiality.</p>
                <p>A standard NDA is built around six core clauses. The <strong className="text-gray-900 dark:text-white">definition of confidential information</strong> specifies exactly what is protected — typically all non-public information shared in furtherance of the stated business purpose. The <strong className="text-gray-900 dark:text-white">obligations clause</strong> requires the receiving party to hold information in confidence and use it solely for the agreed purpose. The <strong className="text-gray-900 dark:text-white">exclusions clause</strong> carves out information that was already public, independently developed by the receiving party, or obtained from a third party with no confidentiality obligation — courts require these exclusions for the agreement to be enforceable. The <strong className="text-gray-900 dark:text-white">term clause</strong> specifies how long obligations last. The <strong className="text-gray-900 dark:text-white">remedies clause</strong> acknowledges that a breach would cause irreparable harm, making injunctive relief available without requiring proof of specific monetary damages. The <strong className="text-gray-900 dark:text-white">governing law clause</strong> specifies which state&apos;s law governs interpretation and dispute resolution.</p>
                <p>This generator produces two types of NDA: a <strong className="text-gray-900 dark:text-white">Mutual NDA</strong> where both parties owe confidentiality obligations to each other, and a <strong className="text-gray-900 dark:text-white">One-Way NDA</strong> where only the receiving party owes an obligation to the disclosing party. Choose the type that reflects the actual flow of information in your situation.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Startup Sharing Proprietary Technology with an Investor</h2>
              <div className="bg-gray-50 dark:bg-[#1e293b] rounded-xl p-5 space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>Marcus Osei is the founder of <strong className="text-gray-900 dark:text-white">ClearPath Health, LLC</strong>, a health-tech startup. He wants to share his proprietary patient data processing algorithm with <strong className="text-gray-900 dark:text-white">SilverBridge Capital Management, LLC</strong>, a potential Series A investor, before signing a term sheet. Since only Marcus is disclosing proprietary information, he configures a <strong className="text-gray-900 dark:text-white">one-way NDA</strong>.</p>
                <div className="bg-white dark:bg-[#0f172a] rounded-lg p-4 border border-gray-200 dark:border-gray-700 text-xs space-y-2 font-mono">
                  <div><span className="text-gray-400">Type:</span> <span>One-Way NDA</span></div>
                  <div><span className="text-gray-400">Disclosing Party:</span> <span>ClearPath Health, LLC (Company, Delaware)</span></div>
                  <div><span className="text-gray-400">Receiving Party:</span> <span>SilverBridge Capital Management, LLC (Company, Delaware)</span></div>
                  <div><span className="text-gray-400">Purpose:</span> <span>Evaluation of a potential equity investment in ClearPath Health</span></div>
                  <div><span className="text-gray-400">Confidential info:</span> <span>Technical documentation, source code, patient data methodologies, business projections, and trade secrets</span></div>
                  <div><span className="text-gray-400">Duration:</span> <span>3 years from effective date</span></div>
                  <div><span className="text-gray-400">Governing law:</span> <span>Delaware</span></div>
                </div>
                <p>Under this agreement, SilverBridge Capital is legally prohibited from sharing Marcus&apos;s algorithm with competitors, using it to inform investments in competing companies, or disclosing his business projections to other parties. If SilverBridge violates the NDA, Marcus can seek <strong className="text-gray-900 dark:text-white">injunctive relief</strong> — an emergency court order stopping further disclosure — in addition to monetary damages for any business losses caused by the breach. Both parties sign the NDA before Marcus shares any proprietary materials.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect NDA Enforceability</h2>
              <ul className="space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <li><strong className="text-gray-900 dark:text-white">Definition of confidential information.</strong> An overly narrow definition leaves important information unprotected; an overly broad one (such as "all information of any kind") can be struck down as unenforceable. The best practice is to describe the specific category of information being shared: technical specifications, financial projections, customer lists, source code, formulas, or manufacturing processes. The more specific and reasonable the definition, the more likely a court will enforce it.</li>
                <li><strong className="text-gray-900 dark:text-white">Standard exclusions.</strong> All enforceable NDAs must include exclusions for information that was already publicly known, independently developed by the receiving party without reference to the disclosed information, or disclosed by a third party with no confidentiality obligation. Courts will refuse to enforce an NDA that lacks these exclusions — they represent the outer limits of what parties can legitimately agree to keep confidential.</li>
                <li><strong className="text-gray-900 dark:text-white">Duration and reasonableness.</strong> Courts evaluate whether the duration of an NDA is reasonable given the nature of the information. A 2-year NDA for a general business relationship is almost universally upheld. A perpetual NDA for employee non-disclosure of trade secrets may be upheld in most states but struck down in others. Longer durations face greater scrutiny and should be tied to a legitimate business justification.</li>
                <li><strong className="text-gray-900 dark:text-white">Governing law selection.</strong> The state you choose as governing law significantly affects enforcement. Delaware and New York have well-developed commercial law and routinely enforce NDAs. California courts are far more skeptical of broad confidentiality obligations — particularly in employment contexts — and may modify or refuse to enforce provisions that California law disfavors. Choose the state where your business is organized or where you would realistically pursue litigation.</li>
                <li><strong className="text-gray-900 dark:text-white">Remedies clause.</strong> Including specific language acknowledging that a breach would cause irreparable harm for which monetary damages alone would be insufficient makes it significantly easier to obtain emergency injunctive relief from a court. Without this language, you must separately prove irreparable harm before a court will issue an injunction — a high bar in time-sensitive situations where disclosure is ongoing.</li>
              </ul>
            </div>

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
