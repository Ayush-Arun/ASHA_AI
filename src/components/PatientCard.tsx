'use client'
import Link from 'next/link'

export default function PatientCard({ patient }: { patient: any }) {
  const { id, name, age, gender, village, phone, created_at, synced } = patient

  const initials = name
    ? name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  const formattedDate = created_at
    ? new Date(created_at).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric',
      })
    : 'Unknown date'

  return (
    <Link href={`/patients/${id}`}>
      <div className="card hover:border-green-300 hover:shadow-md transition-all cursor-pointer group">
        <div className="flex items-start gap-3">

          {/* Avatar */}
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-green-700 font-semibold text-sm">{initials}</span>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold text-gray-900 text-sm truncate group-hover:text-green-700">
                {name}
              </h3>
              {/* Sync status */}
              {synced === false && (
                <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full flex-shrink-0">
                  Offline
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
              {age && (
                <span className="text-xs text-gray-500">{age} yrs</span>
              )}
              {gender && (
                <span className="text-xs text-gray-500 capitalize">{gender}</span>
              )}
              {village && (
                <span className="text-xs text-gray-500">📍 {village}</span>
              )}
            </div>

            {phone && (
              <div className="text-xs text-gray-400 mt-0.5">📞 {phone}</div>
            )}
          </div>

          {/* Date + arrow */}
          <div className="text-right flex-shrink-0">
            <div className="text-xs text-gray-400">{formattedDate}</div>
            <svg className="w-4 h-4 text-gray-300 group-hover:text-green-500 ml-auto mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

        </div>
      </div>
    </Link>
  )
}
