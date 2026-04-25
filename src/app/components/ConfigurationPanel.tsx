export function ConfigurationPanel() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">System Configuration</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-300">Continuous Listening</span>
          <div className="w-10 h-5 bg-slate-700 rounded-full relative cursor-pointer">
            <div className="w-4 h-4 bg-slate-400 rounded-full absolute left-0.5 top-0.5" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-300">Auto-search Vector DB</span>
          <div className="w-10 h-5 bg-indigo-600 rounded-full relative cursor-pointer">
            <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-slate-300">Temperature</span>
            <span className="text-xs text-slate-500">0.7</span>
          </div>
          <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 w-[70%]" />
          </div>
        </div>
      </div>
    </div>
  )
}
