import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import NotificationPopover from '../components/NotificationPopover'

export const metadata: Metadata = {
  title: 'ASHA AI',
  description: 'Empowering frontline health workers with AI-assisted tools',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">

        {/* ── Navbar ── */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">A</span>
              </div>
              <div>
                <span className="text-green-700 font-bold text-base">ASHA AI</span>
                <span className="hidden sm:block text-xs text-gray-400 leading-none">
                  Frontline Health Assistant
                </span>
              </div>
            </Link>

            {/* Nav links */}
            <div className="flex items-center gap-1">
              <Link
                href="/"
                className="px-3 py-1.5 text-sm text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-lg font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/patients"
                className="px-3 py-1.5 text-sm text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-lg font-medium transition-colors"
              >
                Patients
              </Link>
              <Link
                href="/symptom-checker"
                className="px-3 py-1.5 text-sm text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-lg font-medium transition-colors"
              >
                Symptom Checker
              </Link>
              <NotificationPopover />
            </div>

          </div>
        </nav>

        {/* Page content */}
        <main className="max-w-5xl mx-auto px-4 py-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 mt-12 py-6 text-center text-xs text-gray-400">
          ASHA AI — Built for rural frontline health workers · Hackathon 2025
        </footer>

      </body>
    </html>
  )
}

