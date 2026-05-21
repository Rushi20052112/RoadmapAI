import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="bg-[#080e1a] py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e3a5f] to-transparent" />

      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-[#3b82f6]/6 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-5 leading-tight">
          Stop guessing. Start{" "}
          <span className="bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
            building your future.
          </span>
        </h2>
        <p className="text-[#4a5d75] text-lg mb-10 max-w-lg mx-auto">
          Your personalized developer roadmap is one click away. Free to start, no credit card required.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/register"
            className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold text-base transition-all duration-200 shadow-xl shadow-blue-500/25 hover:-translate-y-0.5"
          >
            Generate My Free Roadmap
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 16 16">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link
            to="/login"
            className="text-[#4a5d75] hover:text-[#8899aa] text-sm font-medium transition-colors py-4 px-4"
          >
            Already have an account? Log in →
          </Link>
        </div>
      </div>
    </section>
  );
}