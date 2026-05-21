import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0f1a]/95 backdrop-blur-md border-b border-[#1e2d4a]/60 shadow-xl shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#06b6d4] flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L7 7L10 10L13 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="3" cy="13" r="1.2" fill="white"/>
                <circle cx="13" cy="3" r="1.2" fill="white"/>
              </svg>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              Roadmap<span className="text-[#3b82f6]">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#8899aa] hover:text-white text-sm font-medium transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="text-[#8899aa] hover:text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:bg-white/5"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="text-sm font-semibold px-5 py-2.5 rounded-lg bg-[#3b82f6] hover:bg-[#2563eb] text-white transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
            >
              Get Started Free
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#8899aa] hover:text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-[#1e2d4a]/60 pt-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-[#8899aa] hover:text-white text-sm py-2 px-3 rounded-lg hover:bg-white/5 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-3">
              <Link
                to="/login"
                className="text-center text-sm text-[#8899aa] hover:text-white py-2 px-4 rounded-lg hover:bg-white/5 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="text-center text-sm font-semibold py-2.5 px-4 rounded-lg bg-[#3b82f6] hover:bg-[#2563eb] text-white transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Get Started Free
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}