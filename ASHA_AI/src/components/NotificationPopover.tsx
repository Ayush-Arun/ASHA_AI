'use client'
import { useState } from 'react'

export default function NotificationPopover() {
  const [isOpen, setIsOpen] = useState(false)
  const [doctorPhone, setDoctorPhone] = useState('')
  const [patientMessage, setPatientMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSend() {
    if (!doctorPhone.trim()) return
    setSending(true)
    setError(null)
    try {
      const { sendCriticalAlert } = await import('../lib/sendAlert')
      await sendCriticalAlert({
        patientName: 'Manual Quick Alert',
        patientAge: 'N/A',
        village: 'N/A',
        symptoms: patientMessage || 'General notification from ASHA AI dashboard.',
        severity: 'INFO',
        referralReason: 'General Notification',
        doctorPhone: doctorPhone.trim()
      })
      setSent(true)
      setTimeout(() => {
        setSent(false)
        setIsOpen(false)
        setPatientMessage('')
      }, 3000)
    } catch (e: any) {
      setError(e.message || 'Failed to send alert')
    } finally {
      setSending(false)
    }
  }

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Navbar trigger item */}
      <div className="px-3 py-1.5 text-sm text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1">
        <span>Notifications</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </div>

      {/* Popover content */}
      {isOpen && (
        <div className="absolute right-0 mt-1 w-80 bg-white border border-gray-200 shadow-xl rounded-xl p-4 z-[100]">
          <h3 className="font-bold text-gray-900 mb-1">Quick WhatsApp Alert</h3>
          <p className="text-xs text-gray-500 mb-4">Send a manual notification alert.</p>
          
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">WhatsApp Number</label>
              <input
                type="tel"
                value={doctorPhone}
                onChange={(e) => setDoctorPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="input-field text-sm w-full py-1.5"
              />
            </div>
            
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Message Details</label>
              <textarea
                value={patientMessage}
                onChange={(e) => setPatientMessage(e.target.value)}
                placeholder="Enter any specific details..."
                className="input-field text-sm w-full py-1.5 resize-none h-16"
              />
            </div>

            {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
            {sent && <p className="text-xs text-green-700 font-medium bg-green-50 px-2 py-1.5 rounded border border-green-200">✅ Alert sent successfully!</p>}

            <button 
              onClick={handleSend} 
              disabled={sending || !doctorPhone.trim()} 
              className="btn-primary w-full py-2 text-sm mt-2"
            >
              {sending ? 'Sending...' : 'Send WhatsApp Notification'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
