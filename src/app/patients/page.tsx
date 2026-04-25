'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import PatientCard from '../../components/PatientCard'
import { supabase } from '../../lib/supabase'
import { getAllPatientsOffline, syncToSupabase } from '../../lib/offlineDB'

export default function PatientsPage() {
  const [patients, setPatients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [syncing, setSyncing] = useState(false)
  const [syncMessage, setSyncMessage] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    loadPatients()
  }, [])

  async function loadPatients() {
    setLoading(true)
    try {
      if (typeof navigator !== 'undefined' && navigator.onLine) {
        // Online: fetch from Supabase
        const { data, error } = await supabase
          .from('patients')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        setPatients(data || [])
      } else {
        // Offline: fetch from IndexedDB
        const offlineData = await getAllPatientsOffline()
        offlineData.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        setPatients(offlineData)
      }
    } catch (err) {
      console.error('Failed to load patients:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleSync() {
    setSyncing(true)
    setSyncMessage(null)
    try {
      const result = await syncToSupabase(supabase)
      setSyncMessage(`Synced ${result.synced} patient(s). ${result.failed > 0 ? `${result.failed} failed.` : ''}`)
      await loadPatients()
    } catch (err) {
      setSyncMessage('Sync failed. Please try again.')
    } finally {
      setSyncing(false)
    }
  }

  const filtered = patients.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.village?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Patients</h1>
          <p className="text-sm text-gray-500">{patients.length} total records</p>
        </div>
        <Link href="/patients/new" className="btn-primary">
          + Add Patient
        </Link>
      </div>

      {/* Search + Sync row */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search by name or village..."
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
          className="input-field flex-1"
        />
        {isMounted && navigator.onLine && (
          <button
            onClick={handleSync}
            disabled={syncing}
            className="btn-secondary flex-shrink-0"
          >
            {syncing ? 'Syncing...' : 'Sync'}
          </button>
        )}
      </div>

      {/* Sync message */}
      {syncMessage && (
        <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
          {syncMessage}
        </div>
      )}

      {/* Offline banner */}
      {isMounted && !navigator.onLine && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-700">
          You are offline. Showing locally saved patients.
        </div>
      )}

      {/* Patient list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card animate-pulse">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="flex-1 space-y-2 pt-1">
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="h-2 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">👥</div>
          <h3 className="font-semibold text-gray-700">
            {search ? 'No patients found' : 'No patients yet'}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {search ? 'Try a different search term' : 'Add your first patient to get started'}
          </p>
          {!search && (
            <Link href="/patients/new" className="btn-primary inline-block mt-4">
              Add First Patient
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      )}

    </div>
  )
}
