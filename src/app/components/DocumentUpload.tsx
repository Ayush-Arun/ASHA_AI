export function DocumentUpload() {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Knowledge Base</h3>
      <div className="border border-dashed border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-800/50 transition-colors group">
        <div className="w-10 h-10 rounded-full bg-slate-800 group-hover:bg-indigo-900/50 flex items-center justify-center mb-3 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-indigo-400 transition-colors"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
        </div>
        <span className="text-sm font-medium text-slate-300">Upload Document</span>
        <span className="text-xs text-slate-500 mt-1">PDF, TXT, CSV (Max 10MB)</span>
      </div>
    </div>
  )
}
