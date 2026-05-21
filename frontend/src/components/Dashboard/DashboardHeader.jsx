import { useEffect, useState } from "react";
import { getUserData, getUserRoadmaps } from "../../services/api";
import { useNavigate } from "react-router-dom";

const INITIAL_CREDITS = 3;

export default function DashboardHeader({ onMenuClick }) {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const [userData, setUserData] = useState(null);
  const [credits, setCredits] = useState(INITIAL_CREDITS);
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: uData }, { data: roadmaps }] = await Promise.all([
          getUserData(),
          getUserRoadmaps(),
        ]);
        setUserData(uData);
        setCredits(Math.max(INITIAL_CREDITS - roadmaps.length, 0));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const noCredits = credits === 0;

  return (
    <header className="border-b border-[#1e2d4a] bg-[#080e1a]/70 backdrop-blur-md sticky top-0 z-30">
      <div className="px-6 py-5 flex items-center justify-between">

        <div className="flex items-center gap-4">
          {/* Hamburger - mobile only */}
          <button
            onClick={onMenuClick}
            className="lg:hidden text-white p-2 rounded-xl hover:bg-[#0a1628] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">
              {`Welcome, ${userData?.user?.username || "there"} 👋`}
            </h1>
            <p className="text-[#8899aa]">{formattedDate}</p>
          </div>
        </div>

        <button
          onClick={() => navigate(noCredits ? "/credits" : "/roadmaps/new")}
          className={`px-4 lg:px-6 py-3 rounded-2xl transition-all text-white font-semibold shadow-lg text-sm lg:text-base ${
            noCredits
              ? "bg-red-500/20 border border-red-500/30 text-red-400 shadow-red-500/10 hover:bg-red-500/30"
              : "bg-[#3b82f6] hover:bg-[#2563eb] shadow-blue-500/20"
          }`}
        >
          {noCredits ? "Buy Plans" : "+ New Roadmap"}
        </button>

      </div>
    </header>
  );
}