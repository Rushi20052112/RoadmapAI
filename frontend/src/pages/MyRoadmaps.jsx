import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import { getUserRoadmaps } from "../services/api.js";

export default function MyRoadmaps() {
    const [roadmaps, setRoadmaps] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchRoadmaps = async () => {
            try {
                const { data } = await getUserRoadmaps();
                setRoadmaps(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchRoadmaps();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#070d18] flex items-center justify-center text-white">
                Loading roadmaps...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#070d18] text-white flex">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="flex-1 overflow-y-auto">
                <DashboardHeader onMenuClick={() => setSidebarOpen(true)}  />

                <div className="p-6">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-white">My Roadmaps</h2>
                        <p className="text-[#8899aa] text-sm mt-1">
                            {roadmaps.length} roadmap{roadmaps.length !== 1 ? "s" : ""} found
                        </p>
                    </div>

                    {roadmaps.length === 0 ? (
                        <div className="bg-[#0a1628] border border-[#1e2d4a] rounded-3xl p-12 text-center">
                            <p className="text-[#8899aa] mb-4">No roadmaps yet</p>
                            <button
                                onClick={() => navigate("/roadmaps/new")}
                                className="px-6 py-3 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold rounded-xl transition-colors"
                            >
                                + Create your first roadmap
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                            {roadmaps.map((roadmap) => {
                                const completedWeeks = roadmap.weeks.filter(w => w.completed).length;
                                const progress = Math.round((completedWeeks / roadmap.totalWeeks) * 100);

                                return (
                                    <div
                                        key={roadmap._id}
                                        className="bg-[#0a1628] border border-[#1e2d4a] rounded-3xl p-6 hover:border-[#3b82f6]/40 transition-colors cursor-pointer"
                                        onClick={() => navigate("/dashboard", { state: { roadmapId: roadmap._id } })}
                                    >
                                        {/* Title & Level */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-white leading-snug mb-1">
                                                    {roadmap.title}
                                                </h3>
                                                <span className="text-xs px-2.5 py-1 rounded-full bg-[#13294d] text-[#93c5fd] capitalize">
                                                    {roadmap.currentLevel}
                                                </span>
                                            </div>

                                            <span className="text-[#3b82f6] text-sm font-medium shrink-0 ml-4">
                                                {progress}%
                                            </span>
                                        </div>

                                        {/* Progress bar */}
                                        <div className="w-full h-2 rounded-full bg-[#09111f] overflow-hidden mb-4">
                                            <div
                                                style={{ width: `${progress}%` }}
                                                className="h-full bg-[#3b82f6] rounded-full transition-all duration-500"
                                            />
                                        </div>

                                        {/* Stats row */}
                                        <div className="flex items-center gap-6 text-sm text-[#8899aa]">
                                            <span>{completedWeeks}/{roadmap.totalWeeks} weeks</span>
                                            <span>{roadmap.dailyHours}h / day</span>
                                            <span className="capitalize">{roadmap.targetRole}</span>
                                        </div>

                                        {/* Technologies */}
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {roadmap.technologies.slice(0, 4).map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="px-2.5 py-1 rounded-full bg-[#09111f] border border-[#1e2d4a] text-[#8899aa] text-xs"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {roadmap.technologies.length > 4 && (
                                                <span className="px-2.5 py-1 rounded-full bg-[#09111f] border border-[#1e2d4a] text-[#8899aa] text-xs">
                                                    +{roadmap.technologies.length - 4} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}