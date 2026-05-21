export default function AIChatCard() {
  return (
    <section className="bg-[#0a1628] border border-[#1e2d4a] rounded-3xl p-6 h-fit sticky top-28">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          AI Mentor
        </h2>

        <button className="text-[#3b82f6] text-sm hover:text-[#60a5fa] transition-colors">
          Open full chat →
        </button>
      </div>

      <div className="space-y-5">
        <div className="flex gap-3 items-start">
          <div className="w-10 h-10 rounded-full bg-[#e0f2fe] text-[#0c4a6e] flex items-center justify-center font-semibold shrink-0">
            AI
          </div>

          <div className="bg-[#09111f] border border-[#1e2d4a] rounded-2xl p-4 text-[#e2e8f0] text-sm leading-relaxed">
            You are currently learning advanced React concepts. Build small side projects while learning hooks for faster retention.
          </div>
        </div>

        <div className="flex justify-end">
          <div className="bg-[#13294d] border border-[#3b82f6]/20 rounded-2xl p-4 text-white text-sm max-w-[85%]">
            What should I learn after React hooks?
          </div>
        </div>

        <div className="flex gap-3 items-start">
          <div className="w-10 h-10 rounded-full bg-[#e0f2fe] text-[#0c4a6e] flex items-center justify-center font-semibold shrink-0">
            AI
          </div>

          <div className="bg-[#09111f] border border-[#1e2d4a] rounded-2xl p-4 text-[#e2e8f0] text-sm leading-relaxed">
            Next learn state management with Redux Toolkit or Context API, then move to backend integration and authentication.
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <input
          type="text"
          placeholder="Ask anything about your roadmap..."
          className="flex-1 bg-[#070d18] border border-[#1e2d4a] rounded-2xl px-4 py-3 text-sm text-white placeholder-[#4a5d75] outline-none focus:border-[#3b82f6]"
        />

        <button className="px-5 rounded-2xl bg-[#3b82f6] hover:bg-[#2563eb] transition-all text-white font-medium">
          Send
        </button>
      </div>
    </section>
  );
}