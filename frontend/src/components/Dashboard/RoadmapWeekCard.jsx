import { useState, useRef, useEffect } from "react";

export default function RoadmapWeekCard({ week, currentWeek, onMarkCompleted }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const isCompleted = week.completed;
  const isCurrent = week.weekNumber === currentWeek && !week.completed;

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`rounded-3xl border p-5 transition-all ${
        isCompleted
          ? "bg-green-500/10 border-green-500/20"
          : isCurrent
          ? "bg-[#13294d] border-[#3b82f6]/40"
          : "bg-[#09111f] border-[#1e2d4a]"
      }`}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="text-[#3b82f6] text-sm font-medium mb-1">
            Week {week.weekNumber}
          </p>

          <h3 className="text-xl font-semibold text-white leading-snug">
            {week.title}
          </h3>
        </div>

        {/* Status badge with dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => !isCompleted && setMenuOpen((o) => !o)}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              isCompleted
                ? "bg-green-500/20 text-green-400 cursor-default"
                : isCurrent
                ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 cursor-pointer"
                : "bg-[#1e293b] text-[#94a3b8] hover:bg-[#1e293b]/80 cursor-pointer"
            }`}
          >
            {isCompleted ? "✓ Completed" : isCurrent ? "In Progress ▾" : "Upcoming ▾"}
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-1 bg-[#0a1628] border border-[#1e2d4a] rounded-xl shadow-lg z-10 w-48">
              <button
                onClick={() => {
                  onMarkCompleted(week._id);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-sm text-green-400 hover:bg-[#1e2d4a] rounded-xl transition-colors"
              >
                ✓ Mark as Completed
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3 mb-5">
        {week.topics.slice(0, 3).map((topic, index) => (
          <div key={index} className="flex gap-3">
            <div className="w-2 h-2 rounded-full bg-[#3b82f6] mt-2 shrink-0" />
            <p className="text-[#cbd5e1] text-sm leading-relaxed">{topic}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#070d18] border border-[#1e2d4a] rounded-2xl p-4 mb-4">
        <p className="text-[#8899aa] text-xs uppercase tracking-wider mb-2">
          Project
        </p>
        <p className="text-white text-sm leading-relaxed">{week.project}</p>
      </div>

      <div>
        <p className="text-[#8899aa] text-xs uppercase tracking-wider mb-3">
          Resources
        </p>
        <div className="flex flex-wrap gap-2">
          {week.resources.slice(0, 3).map((resource, index) => (
            <span
              key={index}
              className="px-3 py-1.5 rounded-full bg-[#13294d] text-[#93c5fd] text-xs"
            >
              {resource}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}