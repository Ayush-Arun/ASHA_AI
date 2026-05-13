import React from 'react'
import { Search, Filter, ChevronLeft, ChevronRight, AlertTriangle, Clock, Activity, Users } from 'lucide-react'

const patients = [
  { initials: 'EJ', name: 'Elena Jimenez', id: 'CL-2983', age: 64, gender: 'Female', status: 'Active Triage', statusColor: 'bg-red-100 text-red-800', risk: 'High Risk', riskColor: 'text-red-600', bp: '145/92', hr: 102, location: 'Sector 7, Unit A', initialsBg: 'bg-red-100 text-red-600' },
  { initials: 'MW', name: 'Marcus Wright', id: 'CL-1104', age: 42, gender: 'Male', status: 'Recovering', statusColor: 'bg-slate-200 text-slate-700', risk: 'Low Risk', riskColor: 'text-slate-500', bp: '118/74', hr: 72, location: 'Sector 4, Field Clinic', initialsBg: 'bg-indigo-100 text-indigo-600' },
  { initials: 'SN', name: 'Sarah Nguyen', id: 'CL-4421', age: 29, gender: 'Female', status: 'Observation', statusColor: 'bg-amber-200 text-amber-800', risk: 'Moderate', riskColor: 'text-amber-600', bp: '128/86', hr: 88, location: 'Sector 7, Unit C', initialsBg: 'bg-amber-100 text-amber-600' },
  { initials: 'DK', name: 'David Kim', id: 'CL-0952', age: 51, gender: 'Male', status: 'Pending Review', statusColor: 'bg-slate-200 text-slate-700', risk: 'Low Risk', riskColor: 'text-slate-500', bp: '120/80', hr: 65, location: 'Sector 1, General Unit', initialsBg: 'bg-blue-100 text-blue-600' },
]

export default function PatientRegistry() {
  return (
    <div className="space-y-6 animate-fade-in max-w-[1200px] mx-auto">
      
      {/* ─── Header ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0f172a] tracking-tight">Patient Registry</h1>
          <p className="text-slate-600 text-base mt-1">Active field roster for Sector 7-G</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 rounded-md p-1 border border-slate-200">
            <button className="px-4 py-1.5 text-sm font-semibold bg-white text-slate-900 rounded-md shadow-sm">All Patients</button>
            <button className="px-4 py-1.5 text-sm font-semibold text-slate-600 rounded-md">Recent</button>
            <button className="px-4 py-1.5 text-sm font-semibold text-slate-600 rounded-md">Flagged</button>
          </div>
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-md text-sm font-semibold text-slate-700 flex items-center gap-2 hover:bg-slate-50">
            <Filter size={16} /> Filters
          </button>
        </div>
      </div>

      {/* ─── Table ─── */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Patient Details</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Risk Level</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Vitals</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Unit/Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {patients.map((p, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${p.initialsBg}`}>
                        {p.initials}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{p.name}</p>
                        <p className="text-xs text-slate-500">ID: {p.id} • {p.age}y, {p.gender}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.statusColor}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${p.riskColor.replace('text-', 'bg-')}`} />
                      <span className={`text-sm font-semibold ${p.riskColor}`}>{p.risk}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                       <div>
                         <p className="text-[10px] font-bold text-slate-400 uppercase">BP</p>
                         <p className="text-sm font-bold text-slate-900">{p.bp}</p>
                       </div>
                       <div>
                         <p className="text-[10px] font-bold text-slate-400 uppercase">HR</p>
                         <p className="text-sm font-bold text-slate-900">{p.hr} <span className="text-[10px] font-normal text-slate-400">bpm</span></p>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {p.location}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-sm text-slate-500">Showing 4 of 128 patients</p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded text-slate-500 hover:bg-slate-50"><ChevronLeft size={16} /></button>
            <button className="w-8 h-8 flex items-center justify-center border border-slate-900 bg-slate-900 text-white rounded font-medium text-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center border border-white text-slate-700 hover:bg-slate-50 rounded font-medium text-sm">2</button>
            <button className="w-8 h-8 flex items-center justify-center border border-white text-slate-700 hover:bg-slate-50 rounded font-medium text-sm">3</button>
            <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded text-slate-500 hover:bg-slate-50"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      {/* ─── Bottom Stats ─── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-white rounded-xl p-5 border border-slate-200">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Total Enrolled</p>
          <p className="text-2xl font-bold text-slate-900 mb-2">1,204</p>
          <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1"><Activity size={12} /> +12% this month</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-200">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Critical Cases</p>
          <p className="text-2xl font-bold text-red-600 mb-2">08</p>
          <p className="text-xs font-semibold text-red-600 flex items-center gap-1"><AlertTriangle size={12} /> Action Required</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-200">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Avg. Triage Time</p>
          <p className="text-2xl font-bold text-slate-900 mb-2">14 <span className="text-sm font-medium text-slate-500">min</span></p>
          <p className="text-xs font-semibold text-slate-500 flex items-center gap-1"><Clock size={12} /> Stable efficiency</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-200">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">System Health</p>
          <p className="text-2xl font-bold text-amber-600 mb-2">Optimum</p>
          <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1"><Activity size={12} /> Sync active</p>
        </div>
      </div>

    </div>
  )
}
