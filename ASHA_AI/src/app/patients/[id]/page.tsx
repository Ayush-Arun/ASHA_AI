'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '../../../lib/supabase'
import { getPatientOffline, deletePatientOffline } from '../../../lib/offlineDB'

export default function PatientDetailPage() {
  const { id } = useParams() as { id: string }
  const router = useRouter()
  const [patient, setPatient] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showAlertModal, setShowAlertModal] = useState(false)
  const [doctorPhone, setDoctorPhone] = useState('')
  const [sendingAlert, setSendingAlert] = useState(false)
  const [alertSent, setAlertSent] = useState(false)
  const [alertError, setAlertError] = useState<string | null>(null)

  async function handleManualAlert() {
    if (!doctorPhone.trim()) return;
    setSendingAlert(true);
    setAlertError(null);
    try {
      const { sendCriticalAlert } = await import('../../../lib/sendAlert');
      await sendCriticalAlert({
        patientName: patient.name,
        patientAge: patient.age || 'Unknown',
        village: patient.village || 'Unknown',
        symptoms: 'Manual alert sent from patient profile. Please review the patient records.',
        severity: 'HIGH',
        referralReason: 'General Follow-up / Notification requested by health worker',
        doctorPhone: doctorPhone.trim()
      });
      setAlertSent(true);
    } catch (e: any) {
      setAlertError(e.message || 'Failed to send alert');
    } finally {
      setSendingAlert(false);
    }
  }

  useEffect(() => {
    loadPatient()
  }, [id])

  async function loadPatient() {
    setLoading(true)
    try {
      if (typeof navigator !== 'undefined' && navigator.onLine) {
        const { data, error } = await supabase
          .from('patients')
          .select('*')
          .eq('id', id)
          .single()
        if (error) throw error
        setPatient(data)
      } else {
        const data = await getPatientOffline(id)
        setPatient(data)
      }
    } catch (err) {
      console.error('Failed to load patient:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    setDeleting(true)
    try {
      if (typeof navigator !== 'undefined' && navigator.onLine) {
        const { error } = await supabase.from('patients').delete().eq('id', id)
        if (error) throw error
      } else {
        await deletePatientOffline(id)
      }
      router.push('/patients')
    } catch (err) {
      console.error('Delete failed:', err)
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse max-w-lg mx-auto">
        <div className="h-6 bg-gray-200 rounded w-1/3" />
        <div className="card space-y-3">
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-100 rounded w-2/3" />
          <div className="h-4 bg-gray-100 rounded w-1/2" />
        </div>
      </div>
    )
  }

  if (!patient) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-3">🔍</div>
        <h3 className="font-semibold text-gray-700">Patient not found</h3>
        <Link href="/patients" className="btn-primary inline-block mt-4">
          Back to Patients
        </Link>
      </div>
    )
  }

  const initials = patient.name
    ? patient.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  const formattedDate = new Date(patient.created_at).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <div className="max-w-lg mx-auto space-y-4">

      {/* Back link */}
      <Link href="/patients" className="text-sm text-gray-500 hover:text-green-700 flex items-center gap-1">
        ← Back to Patients
      </Link>

      {/* Patient header card */}
      <div className="card flex items-center gap-4">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-green-700 font-bold text-lg">{initials}</span>
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900">{patient.name}</h1>
          <p className="text-sm text-gray-500">
            Added on {formattedDate}
            {patient.synced === false && (
              <span className="ml-2 text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full text-xs">
                Offline
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Patient details */}
      <div className="card space-y-3">
        <h2 className="font-semibold text-gray-900 text-sm">Patient Details</h2>
        {[
          { label: 'Age',     value: patient.age ? `${patient.age} years` : '—' },
          { label: 'Gender',  value: patient.gender ? patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1) : '—' },
          { label: 'Village', value: patient.village || '—' },
          { label: 'Phone',   value: patient.phone || '—' },
          { label: 'Notes',   value: patient.notes || '—' },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between text-sm">
            <span className="text-gray-500 font-medium">{label}</span>
            <span className="text-gray-900 text-right max-w-[60%]">{value}</span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <Link
            href={`/symptom-checker?patientId=${patient.id}&patientName=${encodeURIComponent(patient.name)}`}
            className="btn-primary flex-1 text-center"
          >
            Symptom Check
          </Link>
          <button onClick={() => setShowAlertModal(true)} className="btn-secondary flex-1">
            Send Alert
          </button>
        </div>
        <div className="flex gap-3">
          <Link href={`/patients/${id}/edit`} className="btn-secondary flex-1 text-center">
            Edit
          </Link>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="btn-danger flex-1"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Alert Modal */}
      {showAlertModal && (
        <div className="card border-green-200 bg-green-50 space-y-3">
          {alertSent ? (
            <div className="space-y-2">
              <p className="text-sm text-green-700 font-medium flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Alert sent successfully via WhatsApp!
              </p>
              <button onClick={() => {setShowAlertModal(false); setAlertSent(false)}} className="btn-secondary w-full">Close</button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-gray-700 font-medium">
                Send patient details via WhatsApp:
              </p>
              <input
                type="tel"
                value={doctorPhone}
                onChange={(e) => setDoctorPhone(e.target.value)}
                placeholder="Enter WhatsApp Number (e.g. 9876543210)"
                className="input-field text-sm w-full"
              />
              {alertError && <p className="text-xs text-red-600">{alertError}</p>}
              <div className="flex gap-2">
                <button onClick={handleManualAlert} disabled={sendingAlert || !doctorPhone} className="btn-primary flex-1">
                  {sendingAlert ? 'Sending...' : 'Send WhatsApp'}
                </button>
                <button onClick={() => setShowAlertModal(false)} className="btn-secondary flex-1">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Delete confirmation */}
      {showDeleteConfirm && (
        <div className="card border-red-200 bg-red-50 space-y-3">
          <p className="text-sm text-red-700 font-medium">
            Are you sure you want to delete {patient.name}? This cannot be undone.
          </p>
          <div className="flex gap-2">
            <button onClick={handleDelete} disabled={deleting} className="btn-danger flex-1">
              {deleting ? 'Deleting...' : 'Yes, Delete'}
            </button>
            <button onClick={() => setShowDeleteConfirm(false)} className="btn-secondary flex-1">
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
