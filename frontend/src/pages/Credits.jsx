import Sidebar from "../components/Dashboard/Sidebar";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import { useState } from "react";
import { loadRazorpayScript } from "../utils/loadRazorpay.js";
import { createOrder, getUserData, verifyPayment } from "../services/api.js";

const handlePayment = async (plan) => {
    try {

        if (plan.priceValue === 0) {
            alert("You're on the Free plan already!");
            return;
        }
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) return alert("Razorpay SDK failed to load.");

        // 1. Create order on your backend
        const { data } = await createOrder({ amount: plan.priceValue, currency: "INR" }); // convert to paise
        const { user } = await getUserData();


        // 2. Open Razorpay checkout
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: data.amount,       // in paise (returned by backend)
            currency: data.currency,
            order_id: data.id,
            name: "RoadmapAI",
            description: `${plan.name} Plan`,
            theme: { color: "#3b82f6" },
            handler: async (response) => {
                // 3. Verify payment on backend
                const verify = await verifyPayment({
                    ...response,
                    planName: plan.name,           // "PRO" or "CREDITS"
                    credits: plan.name === "CREDITS" ? 100 : (plan.name === "PRO" ? 100 : (plan.name === "FREE" ? 3 : 0))
                });
                if (verify.data.success) {
                    alert("Payment successful! 🎉");
                    // TODO: update user plan in DB / UI
                }
            },
            prefill: {
                name: user?.username,   // replace with logged-in user's name
                email: user?.email,
            },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    } catch (error) {
        console.error("Payment error:", error);
    }
};

const plans = [
    {
        name: "FREE",
        priceValue: 0,
        price: "₹0",
        period: "/ forever",
        description: "Perfect for exploring and getting started.",
        features: [
            "3 roadmap generations/month",
            "10 AI mentor messages",
            "Basic progress tracking",
            "Community access",
        ],
        button: "Get Started Free",
        highlight: false,
    },
    {
        name: "PRO",
        priceValue: 499,
        price: "₹499",
        period: "/ per month",
        description: "For developers serious about landing their first job.",
        features: [
            "Unlimited roadmap generations",
            "Unlimited AI mentor chat",
            "Advanced progress analytics",
            "Interview prep module",
            "Resume feedback",
            "Priority support",
        ],
        button: "Start Pro — ₹499/mo",
        highlight: true,
        badge: "Most Popular",
    },
    {
        name: "CREDITS",
        priceValue: 199,
        price: "₹199",
        period: "/ 100 credits",
        description: "Pay-as-you-go for occasional use.",
        features: [
            "1 credit = 1 roadmap generation",
            "1 credit = 10 mentor messages",
            "Credits never expire",
            "All Pro features included",
        ],
        button: "Buy Credits",
        highlight: false,
    },
];

export default function Credits() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="min-h-screen bg-[#070d18] text-white flex">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="flex-1 overflow-y-auto">
                <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

                <div className="p-6 space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Credits & Plans</h2>
                        <p className="text-[#8899aa] text-sm mt-1">
                            Choose the plan that works best for you
                        </p>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start ">
                        {plans.map((plan) => (
                            <div
                                key={plan.name}
                                className={`relative rounded-3xl border p-7 flex flex-col gap-5 transition-all ${plan.highlight
                                    ? "bg-[#0d1f3c] border-[#3b82f6]/50 shadow-lg shadow-blue-500/10 scale-105"
                                    : "bg-[#0a1628] border-[#1e2d4a]"
                                    }`}
                            >
                                {/* Badge */}
                                {plan.badge && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <span className="px-4 py-1.5 rounded-full bg-[#3b82f6] text-white text-xs font-semibold">
                                            {plan.badge}
                                        </span>
                                    </div>
                                )}

                                {/* Plan name */}
                                <p className="text-white font-bold tracking-widest text-sm">
                                    {plan.name}
                                </p>

                                {/* Price */}
                                <div>
                                    <span className="text-4xl font-bold text-white">
                                        {plan.price}
                                    </span>
                                    <span className="text-[#8899aa] text-sm ml-2">
                                        {plan.period}
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="text-[#8899aa] text-sm">{plan.description}</p>

                                {/* Features */}
                                <ul className="space-y-3">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-[#cbd5e1]">
                                            <span className="text-green-400 shrink-0">✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* Button */}
                                <button onClick={() => handlePayment(plan)}
                                    className={`relative rounded-3xl border p-3 flex flex-col gap-5 transition-all duration-300 cursor-pointer group ${plan.highlight
                                        ? "bg-[#0d1f3c] border-[#3b82f6]/50 shadow-lg shadow-blue-500/10 scale-105 hover:scale-110 hover:shadow-xl hover:shadow-blue-500/20 hover:border-[#3b82f6]"
                                        : "bg-[#0a1628] border-[#1e2d4a] hover:-translate-y-2 hover:bg-[#0d1f3c] hover:border-[#3b82f6]/40 hover:shadow-xl hover:shadow-blue-500/10"
                                        }`}
                                >
                                    {plan.button}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
