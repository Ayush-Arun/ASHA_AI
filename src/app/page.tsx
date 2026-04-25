import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="space-y-8">

      {/* Hero */}
      <div className="text-center py-12">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full mb-4">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          AI-Powered · Offline-First · Multilingual
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Empowering <span className="text-green-700">Frontline</span> Health Workers
        </h1>
        <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
          ASHA AI gives community health workers instant AI-assisted triage,
          offline patient records, and critical-case alerts — right from a basic smartphone.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <Link href="/patients/new" className="btn-primary text-center">
            Add New Patient
          </Link>
          <Link href="/symptom-checker" className="btn-secondary text-center">
            Start Symptom Check
          </Link>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { value: '850K+', label: 'ASHA workers in India' },
          { value: '1:1000', label: 'Worker to patient ratio' },
          { value: '72%', label: 'Rural areas served' },
        ].map((stat) => (
          <div key={stat.label} className="card text-center">
            <div className="text-2xl font-bold text-green-700">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Feature cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Link href="/patients" className="card hover:border-green-300 transition-colors group">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 text-sm group-hover:text-green-700">Patient Records</h3>
          <p className="text-xs text-gray-500 mt-1">Offline-first patient profiles that sync when connected</p>
        </Link>

        <Link href="/symptom-checker" className="card hover:border-purple-300 transition-colors group">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 text-sm group-hover:text-purple-700">AI Triage</h3>
          <p className="text-xs text-gray-500 mt-1">Describe symptoms and get instant AI-powered assessment</p>
        </Link>

        <div className="card">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 text-sm">Doctor Alerts</h3>
          <p className="text-xs text-gray-500 mt-1">Critical cases trigger instant WhatsApp alerts to the nearest PHC doctor</p>
        </div>
      </div>

      {/* How it works */}
      <div className="card">
        <h2 className="font-semibold text-gray-900 mb-4">How it works</h2>
        <div className="space-y-3">
          {[
            { step: '1', title: 'Add the patient', desc: 'Enter name, age, village and contact — works offline too' },
            { step: '2', title: 'Describe symptoms', desc: 'Type symptoms in the AI chat — available in Tamil, Hindi, English' },
            { step: '3', title: 'Get triage advice', desc: 'Claude AI assesses severity and recommends next steps' },
            { step: '4', title: 'Alert the doctor', desc: 'If critical, one tap sends a WhatsApp alert to the nearest PHC' },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-700 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                {item.step}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">{item.title}</div>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
