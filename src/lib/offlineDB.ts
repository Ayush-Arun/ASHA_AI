import { openDB } from 'idb'

const DB_NAME = 'asha-ai-db'
const DB_VERSION = 1

// Opens (or creates) the IndexedDB database
async function getDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Patients store
      if (!db.objectStoreNames.contains('patients')) {
        const store = db.createObjectStore('patients', { keyPath: 'id' })
        store.createIndex('synced', 'synced')
      }
      // Symptom checks store
      if (!db.objectStoreNames.contains('symptom_checks')) {
        db.createObjectStore('symptom_checks', { keyPath: 'id' })
      }
    },
  })
}

// ── PATIENTS ──────────────────────────────────────────────

// Save a patient locally (offline)
export async function savePatientOffline(patient: any) {
  const db = await getDB()
  const record = {
    ...patient,
    id: patient.id || `offline_${Date.now()}`,
    synced: false,
    created_at: patient.created_at || new Date().toISOString(),
  }
  await db.put('patients', record)
  return record
}

// Get all patients from local DB
export async function getAllPatientsOffline() {
  const db = await getDB()
  return db.getAll('patients')
}

// Get a single patient by id
export async function getPatientOffline(id: string) {
  const db = await getDB()
  return db.get('patients', id)
}

// Get all patients that haven't been synced yet
export async function getUnsyncedPatients() {
  const db = await getDB()
  const allPatients = await db.getAll('patients')
  return allPatients.filter((p: any) => p.synced === false)
}

// Mark a patient as synced (used after pushing to Supabase)
export async function markPatientSynced(offlineId: string, supabaseId: string) {
  const db = await getDB()
  const patient = await db.get('patients', offlineId)
  if (patient) {
    patient.synced = true
    patient.id = supabaseId
    await db.delete('patients', offlineId) // Delete the old record with offline ID
    await db.put('patients', patient) // Insert the new record with Supabase ID
  }
}

// Delete a patient from local DB
export async function deletePatientOffline(id: string) {
  const db = await getDB()
  await db.delete('patients', id)
}

// ── SYMPTOM CHECKS ────────────────────────────────────────

// Save a symptom check result locally
export async function saveSymptomCheck(check: any) {
  const db = await getDB()
  const record = {
    ...check,
    id: check.id || `check_${Date.now()}`,
    created_at: new Date().toISOString(),
  }
  await db.put('symptom_checks', record)
  return record
}

// Get all symptom checks for a patient
export async function getSymptomChecksForPatient(patientId: string) {
  const db = await getDB()
  const all = await db.getAll('symptom_checks')
  return all.filter((c: any) => c.patient_id === patientId)
}

// ── SYNC ──────────────────────────────────────────────────

// Push all unsynced patients to Supabase when online
export async function syncToSupabase(supabase: any) {
  if (typeof navigator !== 'undefined' && !navigator.onLine) return { synced: 0, failed: 0 }

  const unsynced = await getUnsyncedPatients()
  let synced = 0
  let failed = 0

  for (const patient of unsynced) {
    const offlineId = patient.id
    const { id, synced: _s, ...data } = patient // strip local-only fields

    const { data: result, error } = await supabase
      .from('patients')
      .insert(data)
      .select()
      .single()

    if (error) {
      console.error('Sync failed for patient:', offlineId, error)
      failed++
    } else {
      await markPatientSynced(offlineId, result.id)
      synced++
    }
  }

  return { synced, failed }
}
