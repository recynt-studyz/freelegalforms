import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About — freelegalforms.app',
  description: 'About freelegalforms.app — free legal document generator for invoices, NDAs, bill of sale, lease agreements and contractor agreements.',
  alternates: { canonical: 'https://freelegalforms.app/about' },
}

export default function About() {
  return (
    <>
      <section className="relative bg-cover bg-center bg-no-repeat min-h-[200px]" style={{ backgroundImage: "url('/herobgflf.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-8">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl font-bold">About freelegalforms.app</h1>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-8 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What is freelegalforms.app?</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                freelegalforms.app is a free suite of legal document generators covering professional invoices, non-disclosure agreements (NDAs), bills of sale for vehicles and property, residential lease agreements, and independent contractor agreements. All five document generators are free, instant, and completely private—your data never leaves your device.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How it works</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                All document generation runs entirely in your browser using jsPDF, a JavaScript PDF library. No data is ever sent to a server. You can verify this by opening your browser&apos;s Network tab — you will see zero outbound requests when you generate a legal document. Your information stays on your device and downloads directly to your computer as a professional PDF.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Legal disclaimer</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                freelegalforms.app provides legal document templates for informational and educational purposes only. These templates do not constitute legal advice, and no attorney-client relationship is formed by using this site. Laws governing contracts, leases, NDAs, and other legal agreements vary significantly by state and jurisdiction. The enforceability of any agreement depends on many factors, including applicable state law and the specific circumstances of the parties. For complex legal matters, significant transactions, or whenever you are uncertain about the legal implications of a document, consult a licensed attorney in your jurisdiction.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">YMYL and accuracy</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Legal documents are &quot;Your Money or Your Life&quot; (YMYL) content. We take the responsibility of providing legal templates seriously. Our templates are based on commonly accepted legal language and standard contract provisions used in the United States. However, we make no guarantees about the enforceability of any document in any specific jurisdiction. State-specific legal requirements, local ordinances, and individual circumstances may affect whether a document is legally binding.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Privacy</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Since all document generation happens client-side, your personal and legal information never leaves your device. We use localStorage to remember your last inputs so returning visitors see their previous information. We use Google AdSense for advertising, which may use cookies for ad personalization. See our <a href="/privacy" className="text-green-700 dark:text-green-400 hover:underline">Privacy Policy</a> for full details.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Why free?</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We believe everyone should have access to professional legal document templates without paying subscription fees or signing up for accounts. freelegalforms.app is supported by advertising. In exchange, you get professional PDF legal documents—invoices, NDAs, bills of sale, lease agreements, and contractor agreements—completely free, with no watermarks and no email required.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
