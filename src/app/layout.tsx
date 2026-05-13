import type { Metadata } from 'next'
import './globals.css'
import SidebarNav from '../components/SidebarNav'

export const metadata: Metadata = {
  title: 'CareLink Pro — Field Unit 04',
  description: 'Clinical overview and patient management system',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 antialiased text-slate-900 flex h-screen overflow-hidden">
        <SidebarNav />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto px-8 py-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}
