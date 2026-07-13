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
    a: 'A bill of sale is a legal document that transfers ownership of personal property from a seller to a buyer. It serves as written evidence of the transaction and typically includes a description of the property, the sale price, payment method, sale date, and signatures of both parties. A bill of sale is commonly used for motor vehicles, boats, firearms, heavy equipment, and other personal property. Unlike real estate, which requires a formal deed recorded with a county clerk, personal property transfers are typically accomplished through a bill of sale, which is then used alongside the title or registration at the relevant government agency.',
  },
  {
    q: 'Is a bill of sale required when selling a car?',
    a: 'Requirements vary by state. Many states — including Texas, Florida, and Tennessee — require a bill of sale as part of the vehicle title transfer process with the DMV. Even in states where it is not legally mandated, a signed bill of sale is strongly recommended to protect both parties. For the seller, it provides legally dated documentation that ownership transferred on a specific date, protecting them from liability for accidents, traffic violations, or parking tickets that occur after the sale. For the buyer, it serves as a receipt and proof of legal purchase, which may be required to register the vehicle or obtain insurance.',
  },
  {
    q: 'Does a bill of sale need to be notarized?',
    a: 'Notarization requirements vary by state and the type of property being transferred. Louisiana, Maryland, Montana, Nebraska, New Hampshire, and West Virginia require notarized bills of sale for vehicle transfers. Most other states do not require notarization for a bill of sale to be valid and legally binding. Even when notarization is not required, it adds legal weight by providing independent verification that the parties signed voluntarily and knowingly. For high-value transactions — a car selling for $30,000 or a boat for $50,000 — the small cost of notarization is well worth the added protection. Always check your state\'s specific DMV requirements before completing the transfer.',
  },
  {
    q: 'What information should a bill of sale include?',
    a: 'A complete bill of sale should include: the full legal names and addresses of the seller and buyer, a detailed description of the property (for vehicles: VIN, year, make, model, trim, color, and odometer reading), the exact sale price in dollars, the payment method (cash, cashier\'s check, wire transfer), the date of the transaction, an explicit as-is disclosure stating the buyer accepts the property in its current condition, a warranty of title stating the seller holds clear title free of liens and encumbrances, an odometer disclosure for vehicles under 10 years old (required by federal law), and original signatures from both parties. Missing the VIN or odometer reading on a vehicle bill of sale can cause problems at the DMV title transfer.',
  },
  {
    q: 'Is a bill of sale legally binding?',
    a: 'Yes, a properly executed bill of sale is a legally binding contract that transfers ownership of property from seller to buyer. The document creates a contractual record of the transaction that courts will recognize as evidence of the sale and its terms. Both parties should sign the document in the presence of a witness or notary as required by their state, and each party should retain a signed original. For vehicles, the bill of sale is used alongside the signed title at the state DMV to complete the official title transfer. Without both documents, the buyer may face difficulty registering the vehicle in their name, even if they possess the vehicle.',
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

          {/* Supporting Content */}
          <div className="mb-10 space-y-10">

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">How a Bill of Sale Works</h2>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>A bill of sale is the primary legal instrument transferring title to personal property in a private sale. It accomplishes three legal functions simultaneously: it <strong className="text-gray-900 dark:text-white">transfers ownership</strong> from seller to buyer as of the documented date, it <strong className="text-gray-900 dark:text-white">evidences the transaction terms</strong> (price, payment method, condition, date), and it provides the seller a <strong className="text-gray-900 dark:text-white">liability shield</strong> — documented proof that ownership transferred to the buyer on a specific date, protecting the seller from claims arising after the sale.</p>
                <p>For vehicle sales specifically, most states require the seller to present a signed bill of sale alongside the endorsed title at the DMV to complete the official title transfer to the buyer&apos;s name. The bill of sale and title work together: the title establishes the chain of ownership, and the bill of sale documents the specific terms of the transfer. The <strong className="text-gray-900 dark:text-white">as-is clause</strong> is particularly important in private sales — it documents that the buyer accepted the vehicle in its current condition with no warranties, protecting the seller from later claims about undisclosed defects. An <strong className="text-gray-900 dark:text-white">odometer disclosure</strong> is required by federal law for vehicles under 10 years old and documents the mileage at the time of transfer.</p>
                <p>For firearm transfers, most states additionally require a federal background check through a licensed dealer (FFL) or state-specific procedures. A bill of sale alone is not sufficient to legally transfer a firearm in most jurisdictions — the appropriate background check process must also be completed.</p>
                <p>The sale price recorded in the bill of sale is used by most states to calculate the use tax or sales tax owed on the purchase, as well as title transfer fees. Recording an artificially low price to reduce tax liability is fraudulent and can result in significant penalties.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Private Vehicle Sale</h2>
              <div className="bg-gray-50 dark:bg-[#1e293b] rounded-xl p-5 space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>Daniel Hoffman is selling his <strong className="text-gray-900 dark:text-white">2018 Ford F-150 XLT</strong> to his neighbor Carlos Reyes for <strong className="text-gray-900 dark:text-white">$24,500</strong>. Daniel creates a bill of sale with these details:</p>
                <div className="bg-white dark:bg-[#0f172a] rounded-lg p-4 border border-gray-200 dark:border-gray-700 text-xs space-y-2 font-mono">
                  <div><span className="text-gray-400">Seller:</span> <span>Daniel R. Hoffman, 4412 Oak Bluff Dr, Nashville, TN 37201</span></div>
                  <div><span className="text-gray-400">Buyer:</span> <span>Carlos M. Reyes, 4418 Oak Bluff Dr, Nashville, TN 37201</span></div>
                  <div><span className="text-gray-400">Vehicle:</span> <span>2018 Ford F-150 XLT, Black</span></div>
                  <div><span className="text-gray-400">VIN:</span> <span>1FTFW1EG8JFA12345</span></div>
                  <div><span className="text-gray-400">Odometer:</span> <span>67,042 miles (accurate to best of seller&apos;s knowledge)</span></div>
                  <div><span className="text-gray-400">Sale Price:</span> <span>$24,500 — paid in full by cashier&apos;s check</span></div>
                  <div><span className="text-gray-400">Condition:</span> <span>Sold as-is, no warranty expressed or implied</span></div>
                  <div><span className="text-gray-400">Title:</span> <span>Seller warrants clear title, free of all liens</span></div>
                  <div><span className="text-gray-400">Date:</span> <span>June 14, 2025</span></div>
                </div>
                <p>Both Daniel and Carlos sign the bill of sale. Daniel endorses the title over to Carlos and writes &quot;Sold As-Is&quot; on the title. Carlos takes both documents to the Tennessee DMV within 30 days to complete the title transfer and pay Tennessee&apos;s <strong className="text-gray-900 dark:text-white">7% state sales tax</strong> on the $24,500 purchase price ($1,715). Daniel retains his copy of the signed bill of sale as proof that ownership transferred on June 14th — protecting him if Carlos later receives a traffic ticket or is involved in an accident while the title is still being processed.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Factors in a Private Property Sale</h2>
              <ul className="space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <li><strong className="text-gray-900 dark:text-white">Vehicle Identification Number (VIN).</strong> The 17-character VIN is the single most important piece of identifying information on a vehicle bill of sale. Always verify the VIN matches the plate on the dashboard and the door jamb sticker, and run a VIN history check (CARFAX or NMVTIS) to confirm there are no undisclosed liens, salvage titles, or odometer fraud flags before completing the purchase.</li>
                <li><strong className="text-gray-900 dark:text-white">As-is disclosure.</strong> In a private sale, including an explicit &quot;sold as-is&quot; clause in the bill of sale documents that the buyer accepted the property in its current condition with no warranty — express or implied. This significantly reduces the seller&apos;s exposure to post-sale claims about defects. Without this language, implied warranty claims are possible in some states.</li>
                <li><strong className="text-gray-900 dark:text-white">Odometer disclosure requirement.</strong> The Federal Odometer Act (49 U.S.C. §32705) requires sellers to provide a written odometer disclosure statement for all motor vehicles under 10 years old. Providing a false odometer reading is a federal crime punishable by fines and imprisonment. Your bill of sale should include the exact odometer reading at the time of transfer and a statement that it is accurate to the seller&apos;s knowledge.</li>
                <li><strong className="text-gray-900 dark:text-white">Lien release.</strong> The seller must warrant that the vehicle or property is free of all liens and encumbrances. If there is an outstanding auto loan, the lender holds a lien on the title — that lien must be formally released by the lender before a clean title can be transferred to the buyer. Never transfer a vehicle with an outstanding loan without involving the lender in the payoff process.</li>
                <li><strong className="text-gray-900 dark:text-white">State DMV requirements.</strong> Requirements vary significantly by state. California requires a smog certificate before transfer for most vehicles. Some states require a specific state-issued bill of sale form. Some require notarized signatures. Check your state&apos;s DMV website or call before completing the transfer — missing a required step can prevent title transfer and leave both parties in legal limbo.</li>
              </ul>
            </div>

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
