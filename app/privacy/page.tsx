import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy — freelegalforms.app',
  description: 'Privacy policy for freelegalforms.app — how we handle your data when you generate free legal documents.',
  alternates: { canonical: 'https://freelegalforms.app/privacy' },
}

export default function Privacy() {
  return (
    <>
      <section className="relative bg-cover bg-center bg-no-repeat min-h-[200px]" style={{ backgroundImage: "url('/herobgflf.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-8">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-8 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-xs text-gray-400 mb-8">Last updated: July 1, 2026</p>
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Information We Collect</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                freelegalforms.app does not collect, store, or transmit your legal document information. All document inputs—including names, addresses, contract terms, and any other information you enter into our legal document generators—are processed entirely within your browser. Your data never reaches our servers.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
                We use <strong className="text-gray-700 dark:text-gray-300">localStorage</strong> in your browser to remember your last form inputs so you see your previous information when you return. This data is stored only on your device and is never transmitted to us or any third party.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Document Generation</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                All PDF generation happens client-side using JavaScript (jsPDF library). When you click &quot;Generate &amp; Download PDF,&quot; your document is created in your browser and downloaded directly to your device. No document content is ever uploaded to or processed on any server.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Advertising (Google AdSense)</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We display advertisements through Google AdSense (publisher ID: ca-pub-5035661017594256). Google AdSense may use cookies and similar technologies to serve ads based on your prior visits to our website and other sites. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-green-700 dark:text-green-400 hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Analytics</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We may use standard web analytics to understand aggregate usage patterns (such as which legal document generators are most popular). Any analytics data is aggregate and anonymized and does not identify individual users or contain any document content.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Cookies</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We use localStorage (not cookies) to save your form inputs and theme preference on your device. Google AdSense may set cookies for ad serving and measurement. You can control cookies through your browser settings.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Children&apos;s Privacy</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                freelegalforms.app is not directed at children under 13. We do not knowingly collect personal information from children.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Changes to This Policy</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We may update this privacy policy from time to time. Changes will be posted on this page with an updated date.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                For privacy-related questions, please use the Contact link in the footer.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
