const steps = [
  {
    step: "01",
    title: "Create your profile",
    description: "Sign up and tell us your current skills, target role (e.g. Full Stack Dev), experience level, and how many hours per day you can commit.",
    color: "#3b82f6",
  },
  {
    step: "02",
    title: "Generate your roadmap",
    description: "Hit generate and our AI instantly builds a personalized week-by-week learning plan with technologies, resources, and project ideas.",
    color: "#06b6d4",
  },
  {
    step: "03",
    title: "Learn & track progress",
    description: "Follow your plan, mark tasks complete, and watch your streak grow. Chat with the AI mentor anytime you hit a wall.",
    color: "#8b5cf6",
  },
  {
    step: "04",
    title: "Get interview-ready",
    description: "As you near your goals, the AI prepares you with role-specific interview questions, mock challenges, and resume guidance.",
    color: "#22c55e",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-[#080e1a] py-24 px-6 relative overflow-hidden">
      {/* Subtle line divider top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e3a5f] to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0f1c2e] border border-[#1e3a5f] text-[#60a5fa] text-xs font-medium mb-5">
            Simple process
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            From confused beginner to{" "}
            <span className="bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
              confident developer
            </span>
          </h2>
          <p className="text-[#4a5d75] text-lg max-w-xl mx-auto">
            Four steps is all it takes to go from "what should I learn?" to landing offers.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#1e3a5f] to-transparent" />

          {steps.map((s, i) => (
            <div key={i} className="relative flex flex-col items-center text-center">
              {/* Circle */}
              <div
                className="relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 border"
                style={{
                  backgroundColor: s.color + "10",
                  borderColor: s.color + "30",
                  boxShadow: `0 0 30px ${s.color}15`,
                }}
              >
                <span
                  className="text-3xl font-black font-mono"
                  style={{ color: s.color }}
                >
                  {s.step}
                </span>
              </div>
              <h3 className="text-white font-semibold text-base mb-2">{s.title}</h3>
              <p className="text-[#4a5d75] text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}