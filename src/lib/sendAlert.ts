// Sends a WhatsApp alert via Twilio when a critical case is detected
export async function sendCriticalAlert({ patientName, patientAge, village, symptoms, severity, referralReason, doctorPhone }: any) {
  const response = await fetch('/api/alert', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      patientName,
      patientAge,
      village,
      symptoms,
      severity,
      referralReason,
      doctorPhone,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to send alert')
  }

  return response.json()
}

// Format the alert message for WhatsApp
export function formatAlertMessage({ patientName, patientAge, village, symptoms, severity, referralReason }: any) {
  const emoji = severity === 'CRITICAL' ? '🚨' : '⚠️'
  return `${emoji} *ASHA AI Alert — ${severity} Case*

*Patient:* ${patientName}, ${patientAge} years
*Village:* ${village}
*Symptoms:* ${symptoms}
*Reason for referral:* ${referralReason}

Please respond immediately. Sent via ASHA AI.`
}
