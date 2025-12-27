import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service - Crushie Web',
  description: 'Terms of Service for Crushie Web',
}

export default function TermsOfService() {
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
          Terms of Service
        </h1>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Crushie Web, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Use License</h2>
            <p>
              Permission is granted to temporarily use Crushie Web for personal, non-commercial transitory viewing only. 
              This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Service Description</h2>
            <p>
              Crushie Web provides an AI-powered chat simulation service. The AI characters and their responses are generated 
              for entertainment purposes only. The service is provided "as is" without any warranties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. User Conduct</h2>
            <p>
              You agree to use Crushie Web in a lawful manner and in accordance with these Terms. You agree not to:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
              <li>Use the service for any illegal or unauthorized purpose</li>
              <li>Transmit any harmful, offensive, or inappropriate content</li>
              <li>Attempt to gain unauthorized access to any part of the service</li>
              <li>Interfere with or disrupt the service or servers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Disclaimer</h2>
            <p>
              The materials on Crushie Web are provided on an 'as is' basis. Crushie Web makes no warranties, expressed or implied, 
              and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions 
              of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Limitations</h2>
            <p>
              In no event shall Crushie Web or its suppliers be liable for any damages (including, without limitation, damages for loss 
              of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Crushie Web.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Revisions</h2>
            <p>
              Crushie Web may revise these terms of service at any time without notice. By using this website you are agreeing to be 
              bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us through our website.
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

