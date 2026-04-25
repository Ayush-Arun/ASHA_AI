'use client'

const SEVERITY_STYLES: any = {
  LOW:      { bg: 'bg-green-50',  border: 'border-green-200',  text: 'text-green-800',  badge: 'badge-low'    },
  MEDIUM:   { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', badge: 'badge-medium' },
  HIGH:     { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', badge: 'badge-medium' },
  CRITICAL: { bg: 'bg-red-50',    border: 'border-red-200',    text: 'text-red-800',    badge: 'badge-high'   },
}

export default function ChatMessage({ message }: { message: any }) {
  const { role, content, assessment, timestamp } = message

  const isUser = role === 'user'
  const time = timestamp
    ? new Date(timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    : ''

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%]">
          <div className="bg-green-700 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm leading-relaxed">
            {content}
          </div>
          {time && <div className="text-xs text-gray-400 text-right mt-1">{time}</div>}
        </div>
      </div>
    )
  }

  // AI message
  const severity = assessment?.severity
  const styles = severity ? SEVERITY_STYLES[severity] : null

  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] space-y-2">

        {/* AI avatar + bubble */}
        <div className="flex items-start gap-2">
          <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-green-700 text-xs font-bold">A</span>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-gray-800 leading-relaxed shadow-sm">
            {content}
          </div>
        </div>

        {/* Assessment card — shown only when Claude returns structured data */}
        {assessment && severity && (
          <div className={`ml-9 rounded-xl border p-3 space-y-2 ${styles.bg} ${styles.border}`}>

            {/* Severity badge + summary */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${styles.bg} ${styles.text} border ${styles.border}`}>
                {severity} severity
              </span>
              {assessment.summary && (
                <span className="text-xs text-gray-600">{assessment.summary}</span>
              )}
            </div>

            {/* Next steps */}
            {assessment.nextSteps?.length > 0 && (
              <div>
                <div className="text-xs font-medium text-gray-700 mb-1">Recommended steps:</div>
                <ul className="space-y-0.5">
                  {assessment.nextSteps.map((step: string, i: number) => (
                    <li key={i} className="text-xs text-gray-600 flex gap-1.5">
                      <span className="text-green-600 font-medium">•</span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Referral warning */}
            {assessment.referralNeeded && (
              <div className="flex items-start gap-1.5 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                <svg className="w-3.5 h-3.5 text-red-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.834-1.964-.834-2.732 0L3.072 16.5C2.302 17.333 3.264 19 4.804 19z" />
                </svg>
                <span className="text-xs text-red-700 font-medium">
                  Referral needed: {assessment.referralReason}
                </span>
              </div>
            )}

          </div>
        )}

        {time && <div className="text-xs text-gray-400 ml-9">{time}</div>}
      </div>
    </div>
  )
}
