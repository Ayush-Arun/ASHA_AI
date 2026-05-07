'use client'
import { useState } from 'react'
import { sendCriticalAlert } from '../lib/sendAlert'

export default function AlertBanner({ assessment, patient }: { assessment?: any, patient?: any }) {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [doctorPhone, setDoctorPhone] = useState('')

  if (!assessment?.referralNeeded) return null

  const isCritical = assessment.severity === 'CRITICAL'
  const isHigh = assessment.severity === 'HIGH'

  async function handleSendAlert() {
    if (!doctorPhone.trim()) {
      setError('Please enter the doctor\'s phone number')
      return
    }

    setSending(true)
    setError(null)

    try {
      await sendCriticalAlert({
        patientName: patient?.name || 'Unknown Patient',
        patientAge: patient?.age || 'Unknown',
        village: patient?.village || 'Unknown',
        symptoms: assessment.summary,
        severity: assessment.severity,
        referralReason: assessment.referralReason,
        doctorPhone: doctorPhone.trim(),
      })
      setSent(true)
    } catch (err: any) {
      setError(err.message || 'Failed to send alert. Check the phone number and try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className={`rounded-xl border-2 p-4 space-y-3 ${
      isCritical
        ? 'bg-red-50 border-red-300'
        : 'bg-orange-50 border-orange-300'
    }`}>

      {/* Header */}
      <div className="flex items-center gap-2">
        <svg className={`w-5 h-5 ${isCritical ? 'text-red-600' : 'text-orange-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.834-1.964-.834-2.732 0L3.072 16.5C2.302 17.333 3.264 19 4.804 19z" />
        </svg>
        <div>
          <h3 className={`font-bold text-sm ${isCritical ? 'text-red-800' : 'text-orange-800'}`}>
            {isCritical ? '🚨 Critical Case — Immediate Referral Needed' : '⚠️ High Severity — Doctor Referral Needed'}
          </h3>
          <p className={`text-xs mt-0.5 ${isCritical ? 'text-red-600' : 'text-orange-600'}`}>
            {assessment.referralReason}
          </p>
        </div>
      </div>

      {/* Send alert section */}
      {sent ? (
        <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 flex items-center gap-2">
          <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm text-green-700 font-medium">
            Alert sent to doctor via WhatsApp!
          </span>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-xs text-gray-600">
            Enter the PHC doctor's WhatsApp number to send an instant alert:
          </p>
          <div className="flex gap-2">
            <input
              type="tel"
              value={doctorPhone}
              onChange={(e) => setDoctorPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="input-field flex-1 text-sm"
            />
            <button
              onClick={handleSendAlert}
              disabled={sending}
              className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors flex-shrink-0 ${
                isCritical
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-orange-600 hover:bg-orange-700'
              } disabled:opacity-50`}
            >
              {sending ? 'Sending...' : 'Send Alert'}
            </button>
          </div>
          {error && (
            <p className="text-xs text-red-600">{error}</p>
          )}
        </div>
      )}

    </div>
  )
}
