import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy - Crushie Web',
  description: 'Privacy Policy for Crushie Web',
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-dark-gray text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link
          href="/"
          className="inline-flex items-center text-purple-300 hover:text-neon-pink mb-8 transition-colors"
        >
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-neon-pink to-purple-400 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
            <p>
              Crushie Web collects minimal information necessary to provide our services. We may collect:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
              <li>Chat conversation data stored locally in your browser cookies</li>
              <li>Browser language preferences for localization</li>
              <li>Basic usage analytics to improve our service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
            <p>
              We use the collected information to:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
              <li>Provide and maintain our AI chat service</li>
              <li>Personalize your experience based on language preferences</li>
              <li>Improve our service quality and user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Data Storage</h2>
            <p>
              Your chat conversations are stored locally in your browser cookies. We do not store your conversations on our servers. 
              You can clear your browser cookies at any time to delete your chat history.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Third-Party Services</h2>
            <p>
              We use Google AdSense to display advertisements on our website. Google AdSense may use cookies and similar technologies 
              to provide personalized ads. Please refer to Google's Privacy Policy for more information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
              <li>Clear your chat history by deleting browser cookies</li>
              <li>Disable cookies in your browser settings</li>
              <li>Stop using our service at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy 
              on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us through our website.
            </p>
          </section>

          <p className="text-sm text-gray-400 mt-8">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  )
}

