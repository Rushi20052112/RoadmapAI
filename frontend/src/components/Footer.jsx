import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  const links = {
    Product: ["Features", "Pricing", "Changelog", "Roadmap"],
    Resources: ["Documentation", "Blog", "Community", "Support"],
    Company: ["About", "Careers", "Privacy Policy", "Terms of Service"],
  };

  return (
    <footer className="bg-[#070d18] border-t border-[#1e2d4a]/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#06b6d4] flex items-center justify-center shadow-lg shadow-blue-500/20">
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
            <p className="text-[#4a5d75] text-sm leading-relaxed max-w-xs">
              Your personal AI mentor for navigating a software engineering career. From zero to hired.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {["twitter", "github", "linkedin"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-[#0f1c2e] border border-[#1e2d4a] flex items-center justify-center text-[#4a5d75] hover:text-white hover:border-[#3b82f6]/50 transition-all duration-200"
                >
                  <span className="text-xs capitalize">{social[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[#4a5d75] hover:text-[#8899aa] text-sm transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-[#1e2d4a]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#2e3f55] text-xs">
            © {year} RoadmapAI. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse"></span>
            <span className="text-[#2e3f55] text-xs">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}