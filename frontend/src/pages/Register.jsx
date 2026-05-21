import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api.js";


// ─── tiny reusable input ────────────────────────────────────────────────────
function InputField({ label, id, type = "text", placeholder, value, onChange, error, icon }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-[#8899aa] mb-1.5 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3b4f66]">
            {icon}
          </span>
        )}
        <input
          id={id}
          type={isPassword && show ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={isPassword ? "new-password" : "off"}
          className={`w-full bg-[#0a1628] border rounded-xl px-4 py-3 text-sm text-white placeholder-[#2e3f55] transition-all duration-200 outline-none
            ${icon ? "pl-10" : ""}
            ${error
              ? "border-[#ef4444]/60 focus:border-[#ef4444] focus:ring-2 focus:ring-[#ef4444]/10"
              : "border-[#1e2d4a] focus:border-[#3b82f6]/60 focus:ring-2 focus:ring-[#3b82f6]/10"
            }`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#3b4f66] hover:text-[#8899aa] transition-colors"
          >
            {show ? (
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                <path d="M2 8s2.5-5 6-5 6 5 6 5-2.5 5-6 5-6-5-6-5z" stroke="currentColor" strokeWidth="1.4"/>
                <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M2 2l12 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                <path d="M2 8s2.5-5 6-5 6 5 6 5-2.5 5-6 5-6-5-6-5z" stroke="currentColor" strokeWidth="1.4"/>
                <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4"/>
              </svg>
            )}
          </button>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-[#ef4444]">{error}</p>}
    </div>
  );
}

// ─── password strength meter ─────────────────────────────────────────────────
function PasswordStrength({ password }) {
  if (!password) return null;
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "#ef4444", "#f59e0b", "#3b82f6", "#22c55e"];

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{ backgroundColor: i <= score ? colors[score] : "#1e2d4a" }}
          />
        ))}
      </div>
      <p className="text-xs" style={{ color: colors[score] }}>
        {score > 0 ? labels[score] : ""}
      </p>
    </div>
  );
}

// ─── main component ───────────────────────────────────────────────────────────
export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "At least 8 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setErrors({});
    setLoading(true);
    try {
      const { data } = await registerUser ({
        username: form.name,
        email: form.email,
        password: form.password,
      });
      localStorage.setItem("refreshToken", data.user.refreshToken);
      navigate("/dashboard");
    } catch (err) {
      setApiError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070d18] flex">
      {/* ── Left panel (decorative) ── */}
      <div className="hidden lg:flex lg:w-[46%] relative overflow-hidden bg-[#080e1a] border-r border-[#1e2d4a]/50 flex-col justify-between p-12">
        {/* grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-[#3b82f6]/6 rounded-full blur-[100px] pointer-events-none" />

        {/* Logo */}
        <Link to="/" className="relative flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#06b6d4] flex items-center justify-center shadow-lg shadow-blue-500/30">
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <path d="M3 13L7 7L10 10L13 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="3" cy="13" r="1.2" fill="white"/>
              <circle cx="13" cy="3" r="1.2" fill="white"/>
            </svg>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">
            Roadmap<span className="text-[#3b82f6]">AI</span>
          </span>
        </Link>

        {/* Testimonial / quote */}
        <div className="relative z-10">
          <div className="space-y-6 mb-10">
            {[
              { icon: "🗺️", title: "Personalized Roadmap", desc: "AI builds a plan based on your exact skills and goals" },
              { icon: "🤖", title: "AI Mentor Chatbot",    desc: "Ask anything — get instant career & technical guidance" },
              { icon: "📊", title: "Progress Tracking",   desc: "Streaks, milestones, and visual growth over time" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0f1c2e] border border-[#1e3a5f] flex items-center justify-center text-lg shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{item.title}</p>
                  <p className="text-[#4a5d75] text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-[#0a1628]/80 border border-[#1e3a5f]/60">
            <p className="text-[#8899aa] text-sm leading-relaxed italic mb-4">
              "RoadmapAI gave me a clear path from JavaScript basics to landing a Full Stack role in 6 months. Worth every minute."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center text-white text-xs font-bold">
                AK
              </div>
              <div>
                <p className="text-white text-xs font-semibold">Arjun K.</p>
                <p className="text-[#4a5d75] text-xs">Full Stack Dev @ Razorpay</p>
              </div>
            </div>
          </div>
        </div>

        <p className="relative text-[#2e3f55] text-xs">© {new Date().getFullYear()} RoadmapAI</p>
      </div>

      {/* ── Right panel (form) ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#06b6d4] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L7 7L10 10L13 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="3" cy="13" r="1.2" fill="white"/>
                <circle cx="13" cy="3" r="1.2" fill="white"/>
              </svg>
            </div>
            <span className="text-white font-bold text-lg">Roadmap<span className="text-[#3b82f6]">AI</span></span>
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-1.5">Create your account</h1>
            <p className="text-[#4a5d75] text-sm">
              Already have one?{" "}
              <Link to="/login" className="text-[#3b82f6] hover:text-[#60a5fa] font-medium transition-colors">
                Log in
              </Link>
            </p>
          </div>

          {/* Google OAuth */}
          <a
            href={import.meta.env.VITE_BASE_URL + "/api/auth/google"}
            className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-xl bg-[#0a1628] border border-[#1e2d4a] hover:border-[#2e4a6a] text-white text-sm font-medium transition-all duration-200 hover:bg-[#0f1c2e] mb-6"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </a>

          {/* Divider */}
          <div className="relative flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-[#1e2d4a]" />
            <span className="text-[#2e3f55] text-xs">or register with email</span>
            <div className="flex-1 h-px bg-[#1e2d4a]" />
          </div>

          {/* API error */}
          {apiError && (
            <div className="mb-5 p-3.5 rounded-xl bg-[#ef4444]/10 border border-[#ef4444]/25 flex items-start gap-2.5">
              <svg className="w-4 h-4 text-[#ef4444] mt-0.5 shrink-0" fill="none" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M8 5v3M8 10.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              <p className="text-[#ef4444] text-sm">{apiError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <InputField
              label="Full Name"
              id="name"
              placeholder="John Doe"
              value={form.name}
              onChange={set("name")}
              error={errors.name}
              icon={
                <svg width="15" height="15" fill="none" viewBox="0 0 16 16">
                  <circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M2 14c0-3 2.686-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              }
            />
            <InputField
              label="Email address"
              id="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={set("email")}
              error={errors.email}
              icon={
                <svg width="15" height="15" fill="none" viewBox="0 0 16 16">
                  <rect x="2" y="4" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M2 5l6 5 6-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            />
            <div>
              <InputField
                label="Password"
                id="password"
                type="password"
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={set("password")}
                error={errors.password}
                icon={
                  <svg width="15" height="15" fill="none" viewBox="0 0 16 16">
                    <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                    <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                }
              />
              <PasswordStrength password={form.password} />
            </div>
            <InputField
              label="Confirm Password"
              id="confirm"
              type="password"
              placeholder="Re-enter password"
              value={form.confirm}
              onChange={set("confirm")}
              error={errors.confirm}
              icon={
                <svg width="15" height="15" fill="none" viewBox="0 0 16 16">
                  <path d="M3 8l4 4 6-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#3b82f6] hover:bg-[#2563eb] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 hover:-translate-y-0.5 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 16 16">
                    <circle className="opacity-25" cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2"/>
                    <path className="opacity-75" d="M14 8a6 6 0 00-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Creating account…
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-[#2e3f55] text-xs text-center mt-6 leading-relaxed">
            By registering you agree to our{" "}
            <a href="#" className="text-[#4a5d75] hover:text-[#8899aa] transition-colors">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="text-[#4a5d75] hover:text-[#8899aa] transition-colors">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}