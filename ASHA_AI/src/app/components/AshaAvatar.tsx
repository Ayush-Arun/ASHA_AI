export function AshaAvatar() {
  return (
    <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[2px] shadow-lg shadow-indigo-500/20">
      <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-500/20 animate-pulse" />
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400 relative z-10"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
      </div>
    </div>
  )
}
