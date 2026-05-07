export function ModelSelector() {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Model</h3>
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-2 flex items-center justify-between cursor-pointer hover:bg-slate-800 transition-colors">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <span className="text-[10px] font-bold text-white">G</span>
          </div>
          <span className="text-sm font-medium text-slate-200">Gemini 1.5 Pro</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500"><path d="m6 9 6 6 6-6"/></svg>
      </div>
    </div>
  )
}
