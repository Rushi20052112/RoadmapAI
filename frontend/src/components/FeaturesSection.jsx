const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 19L8 11L12 14L17 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="3" cy="19" r="1.5" fill="currentColor"/>
        <circle cx="17" cy="4" r="1.5" fill="currentColor"/>
      </svg>
    ),
    title: "AI Roadmap Generator",
    description: "Tell us your current skills and target role. Get a complete personalized learning path with weekly milestones tailored to your pace.",
    accent: "#3b82f6",
    tag: "Core Feature",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M11 7v4l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: "Weekly Study Plans",
    description: "Break your roadmap into daily and weekly tasks. Never wonder 'what to learn today' again — your schedule is ready.",
    accent: "#06b6d4",
    tag: "Productivity",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 18l4-8 4 4 3-6 3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="2" y="2" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
    title: "Progress Dashboard",
    description: "Mark tasks done, track streaks, and visualize your learning momentum. Watch your skills grow week over week.",
    accent: "#22c55e",
    tag: "Tracking",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 6h14M4 10h10M4 14h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="17" cy="17" r="3" fill="currentColor" opacity="0.2"/>
        <path d="M15.5 17l1 1 2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Project Suggestions",
    description: "AI recommends real-world projects that match your current skill level — so your portfolio gets stronger with every build.",
    accent: "#f59e0b",
    tag: "Portfolio",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M7 8h8M7 12h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M4 4h14a1 1 0 011 1v10a1 1 0 01-1 1H8l-4 3V5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
    title: "AI Mentor Chatbot",
    description: 'Ask anything — "What should I learn after React?" — and get instant, context-aware answers from your personal AI career coach.',
    accent: "#8b5cf6",
    tag: "AI Mentor",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="8" r="4" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M3 19c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M16 6l1.5 1.5L20 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Interview Preparation",
    description: "Get topic-wise interview questions, coding challenges, and system design prompts based on your target company and role.",
    accent: "#ec4899",
    tag: "Interview Prep",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-[#070d18] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0f1c2e] border border-[#1e3a5f] text-[#60a5fa] text-xs font-medium mb-5">
            Everything you need
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Built for developers who are{" "}
            <span className="text-[#4a5d75]">serious</span> about growth
          </h2>
          <p className="text-[#4a5d75] text-lg max-w-2xl mx-auto">
            Every feature is designed to cut through the noise and help you make real progress.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group relative p-6 rounded-2xl bg-[#0a1628]/60 border border-[#1e2d4a]/70 hover:border-[#1e3a5f] transition-all duration-300 hover:-translate-y-0.5"
            >
              {/* Accent glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `radial-gradient(ellipse at top left, ${feature.accent}08, transparent 60%)` }}
              />

              <div className="relative">
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                  style={{
                    backgroundColor: feature.accent + "15",
                    color: feature.accent,
                    boxShadow: `0 0 0 1px ${feature.accent}20`,
                  }}
                >
                  {feature.icon}
                </div>

                {/* Tag */}
                <span
                  className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full mb-3"
                  style={{ backgroundColor: feature.accent + "15", color: feature.accent }}
                >
                  {feature.tag}
                </span>

                <h3 className="text-white font-semibold text-base mb-2">{feature.title}</h3>
                <p className="text-[#4a5d75] text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}