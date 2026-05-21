import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Perfect for exploring and getting started.",
    features: [
      "3 roadmap generations/month",
      "10 AI mentor messages",
      "Basic progress tracking",
      "Community access",
    ],
    cta: "Get Started Free",
    ctaLink: "/register",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "₹499",
    period: "per month",
    description: "For developers serious about landing their first job.",
    features: [
      "Unlimited roadmap generations",
      "Unlimited AI mentor chat",
      "Advanced progress analytics",
      "Interview prep module",
      "Resume feedback",
      "Priority support",
    ],
    cta: "Start Pro — ₹499/mo",
    ctaLink: "/register",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Credits",
    price: "₹199",
    period: "100 credits",
    description: "Pay-as-you-go for occasional use.",
    features: [
      "1 credit = 1 roadmap generation",
      "1 credit = 10 mentor messages",
      "Credits never expire",
      "All Pro features included",
    ],
    cta: "Buy Credits",
    ctaLink: "/register",
    highlighted: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-[#070d18] py-24 px-6 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e3a5f] to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0f1c2e] border border-[#1e3a5f] text-[#60a5fa] text-xs font-medium mb-5">
            Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Invest in your career, not your subscription
          </h2>
          <p className="text-[#4a5d75] text-lg max-w-xl mx-auto">
            Start free. Upgrade when you're ready to accelerate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-7 border transition-all duration-300 ${
                plan.highlighted
                  ? "bg-gradient-to-b from-[#0d1e3a] to-[#0a1628] border-[#3b82f6]/40 shadow-2xl shadow-blue-500/10"
                  : "bg-[#0a1628]/60 border-[#1e2d4a]/70"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full bg-[#3b82f6] text-white text-xs font-semibold whitespace-nowrap">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="text-white text-4xl font-black">{plan.price}</span>
                  <span className="text-[#4a5d75] text-sm">/ {plan.period}</span>
                </div>
                <p className="text-[#4a5d75] text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-[#6b7f94]">
                    <svg className="w-4 h-4 mt-0.5 text-[#22c55e] shrink-0" fill="none" viewBox="0 0 16 16">
                      <path d="M3 8l4 4 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to={plan.ctaLink}
                className={`block text-center text-sm font-semibold py-3 px-5 rounded-xl transition-all duration-200 ${
                  plan.highlighted
                    ? "bg-[#3b82f6] hover:bg-[#2563eb] text-white shadow-lg shadow-blue-500/20"
                    : "bg-[#0f1c2e] hover:bg-[#142236] border border-[#1e3a5f] text-[#8899aa] hover:text-white"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-[#2e3f55] text-xs mt-8">
          Secure payments via Razorpay · Cancel anytime · No hidden fees
        </p>
      </div>
    </section>
  );
}