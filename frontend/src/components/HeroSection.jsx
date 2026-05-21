import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#070d18]">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#3b82f6]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-[#06b6d4]/6 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[280px] h-[280px] bg-[#8b5cf6]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24 pb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0f1c2e] border border-[#1e3a5f] text-[#60a5fa] text-xs font-medium mb-8 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-pulse"></span>
          AI-Powered Career Guidance for Developers
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">
          Your Personal{" "}
          <span className="relative">
            <span className="bg-gradient-to-r from-[#3b82f6] via-[#06b6d4] to-[#8b5cf6] bg-clip-text text-transparent">
              AI Roadmap
            </span>
          </span>
          <br />
          to Land Your Dream{" "}
          <span className="text-[#8899aa]">Dev Job</span>
        </h1>

        {/* Subheading */}
        <p className="text-[#4a5d75] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
          Stop following random tutorials. Get a personalized learning roadmap, weekly study plan, project suggestions, and interview prep — all powered by AI.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            to="/register"
            className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold text-base transition-all duration-200 shadow-xl shadow-blue-500/20 hover:shadow-blue-500/35 hover:-translate-y-0.5"
          >
            Generate My Roadmap
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 16 16">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#0f1c2e] hover:bg-[#142236] border border-[#1e3a5f] text-[#8899aa] hover:text-white font-semibold text-base transition-all duration-200"
          >
            Log in to your account
          </Link>
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-6 text-sm text-[#2e3f55]">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {["#3b82f6","#8b5cf6","#06b6d4","#f59e0b"].map((color, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-[#070d18]"
                  style={{ backgroundColor: color + "33", borderColor: "#070d18" }}
                />
              ))}
            </div>
            <span>2,400+ developers</span>
          </div>
          <span className="w-px h-4 bg-[#1e2d4a]" />
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-3.5 h-3.5 text-[#f59e0b]" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1l1.85 3.75 4.15.6-3 2.92.7 4.12L8 10.35l-3.7 1.94.7-4.12L2 5.35l4.15-.6z"/>
              </svg>
            ))}
            <span className="ml-1">4.9/5 rating</span>
          </div>
        </div>

        {/* Preview card */}
        <div className="mt-16 relative mx-auto max-w-3xl">
          <div className="relative bg-[#0a1628]/80 backdrop-blur-sm border border-[#1e3a5f]/60 rounded-2xl p-6 shadow-2xl shadow-black/40">
            {/* Terminal dots */}
            <div className="flex items-center gap-1.5 mb-5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"/>
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"/>
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]"/>
              <span className="ml-3 text-[#2e3f55] text-xs font-mono">roadmap-generator</span>
            </div>

            <div className="space-y-3 text-left">
              {[
                { label: "Target Role", value: "Full Stack Developer", color: "text-[#34d399]" },
                { label: "Current Level", value: "Beginner → Intermediate", color: "text-[#60a5fa]" },
                { label: "Daily Hours", value: "3 hrs/day", color: "text-[#a78bfa]" },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="text-[#2e3f55] text-xs font-mono w-28 shrink-0">{label}</span>
                  <span className="text-[#1e2d4a] text-xs">→</span>
                  <span className={`text-xs font-semibold font-mono ${color}`}>{value}</span>
                </div>
              ))}
              <div className="pt-3 border-t border-[#1e3a5f]/50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#3b82f6] text-xs font-mono">AI Generating roadmap...</span>
                  <span className="flex gap-0.5">
                    {[...Array(3)].map((_, i) => (
                      <span key={i} className="w-1 h-1 rounded-full bg-[#3b82f6] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }}/>
                    ))}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["HTML/CSS", "JavaScript", "React.js", "Node.js", "MongoDB", "Express"].map((tech) => (
                    <span key={tech} className="px-2.5 py-1 rounded-md bg-[#0f1c2e] border border-[#1e3a5f] text-[#60a5fa] text-xs font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Glow under card */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-[#3b82f6]/15 blur-2xl rounded-full" />
        </div>
      </div>
    </section>
  );
}