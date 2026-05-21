import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUserData, getUserRoadmaps, logout } from "../../services/api";

const navItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "My Roadmaps", path: "/roadmaps" },
  { label: "AI Mentor", path: "/ai-mentor" },
];

const accountItems = [
  { label: "Profile", path: "/profile" },
  { label: "Credits & Plans", path: "/credits" },
  { label: "Settings", path: "/settings" },
];



export default function Sidebar({ isOpen, onClose }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [credits, setCredits] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: uData }, { data: roadmaps }] = await Promise.all([
          getUserData(),
          getUserRoadmaps(),
        ]);
        setUserData(uData.user);
        setCredits(Math.max(uData.user?.credits));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // close sidebar on route change on mobile
  useEffect(() => {
    onClose?.();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const initials = userData?.username
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "RK";

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed lg:static top-0 left-0 h-full w-[280px] z-50
        bg-[#080e1a] border-r border-[#1e2d4a] flex flex-col justify-between min-h-screen
        transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
      `}>

        <div>
          {/* Logo + close button */}
          <div className="p-6 border-b border-[#1e2d4a] flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#06b6d4] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                  <path d="M3 13L7 7L10 10L13 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="3" cy="13" r="1.2" fill="white" />
                  <circle cx="13" cy="3" r="1.2" fill="white" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white">
                Roadmap<span className="text-[#3b82f6]">AI</span>
              </h1>
            </Link>

            {/* Close button - mobile only */}
            <button
              onClick={onClose}
              className="lg:hidden text-[#8899aa] hover:text-white transition-colors text-xl"
            >
              ✕
            </button>
          </div>

          <div className="p-5">
            <p className="text-[#4a5d75] text-xs uppercase tracking-widest mb-4">Main</p>

            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all text-left ${pathname === item.path
                      ? "bg-[#13294d] text-[#60a5fa]"
                      : "hover:bg-[#0a1628] text-[#cbd5e1]"
                    }`}
                >
                  <span>{item.label}</span>
                  {item.label === "AI Mentor" && (
                    <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs">
                      3
                    </span>
                  )}
                </Link>
              ))}
            </div>

            <p className="text-[#4a5d75] text-xs uppercase tracking-widest mt-10 mb-4">Account</p>

            <div className="space-y-2">
              {accountItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`w-full flex items-center px-4 py-3 rounded-2xl transition-all text-left ${pathname === item.path
                      ? "bg-[#13294d] text-[#60a5fa]"
                      : "hover:bg-[#0a1628] text-[#cbd5e1]"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-[#1e2d4a]">
          <div className="relative" ref={menuRef}>
            {menuOpen && (
              <div className="absolute bottom-full mb-2 left-0 right-0 bg-[#0a1628] border border-[#1e2d4a] rounded-2xl overflow-hidden shadow-xl">
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-[#cbd5e1] hover:bg-[#0d1f3c] hover:text-white transition-colors"
                >
                  <span>👤</span>
                  <span className="text-sm">Profile</span>
                </Link>
                <div className="border-t border-[#1e2d4a]" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <span>→</span>
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            )}

            <div
              onClick={() => setMenuOpen((o) => !o)}
              className="flex items-center gap-3 bg-[#0a1628] border border-[#1e2d4a] rounded-2xl p-3 cursor-pointer hover:bg-[#0d1f3c] hover:border-[#3b82f6]/40 transition-all"
            >
              <div className="w-11 h-11 rounded-full bg-[#bfdbfe] text-[#1e3a8a] flex items-center justify-center font-semibold shrink-0">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{userData?.username || "..."}</p>
                <p className={`text-sm ${credits === 0 ? "text-red-400" : "text-[#8899aa]"}`}>
                  {userData?.plan || "Free plan"} · {credits} credit{credits !== 1 ? "s" : ""}
                </p>
              </div>
              <span className={`text-[#8899aa] text-xs transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}>
                ▲
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}