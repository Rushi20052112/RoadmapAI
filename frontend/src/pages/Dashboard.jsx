import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import StatCard from "../components/Dashboard/StatCard";
import RoadmapWeekCard from "../components/Dashboard/RoadmapWeekCard";
import AIChatCard from "../components/Dashboard/AIChatCard";
import { getUserRoadmaps, markWeekCompletedAPI } from "../services/api.js";
import { useNavigate, useLocation } from "react-router-dom";

export default function Dashboard() {
    const [roadmaps, setRoadmaps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation()

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

    useEffect(() => {
        fetchRoadmaps();
    }, []);

    const activeRoadmap = useMemo(() => {
        if (location.state?.roadmapId) {
            return roadmaps.find(r => r._id === location.state.roadmapId) || roadmaps[0];
        }
        return roadmaps[0];
    }, [roadmaps, location.state]);

    const completedWeeks = useMemo(() => {
        if (!activeRoadmap) return 0;

        return activeRoadmap.weeks.filter((week) => week.completed).length;
    }, [activeRoadmap]);

    const progressPercentage = useMemo(() => {
        if (!activeRoadmap) return 0;

        return Math.round(
            (completedWeeks / activeRoadmap.totalWeeks) * 100
        );
    }, [activeRoadmap, completedWeeks]);

    const currentWeek = useMemo(() => {
        if (!activeRoadmap) return 1;

        const current = activeRoadmap.weeks.find(
            (week) => !week.completed
        );

        return current?.weekNumber || activeRoadmap.totalWeeks;
    }, [activeRoadmap]);

    const markWeekCompleted = async (weekId) => {
        try {
            const { data } = await markWeekCompletedAPI(activeRoadmap._id, weekId);
            setRoadmaps(prev =>
                prev.map(r => r._id === activeRoadmap._id ? data : r)
            );
        } catch (err) {
            console.log(err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#070d18] flex items-center justify-center text-white">
                Loading dashboard...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#070d18] text-white flex">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="flex-1 overflow-y-auto">
                <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

                        <StatCard
                            title="Tasks done"
                            value={`${completedWeeks}/${activeRoadmap?.totalWeeks || 0}`}
                            subtitle="Completed weeks"
                        />

                        <StatCard
                            title="Roadmaps"
                            value={roadmaps.length}
                            subtitle="1 active roadmap"
                        />

                        <StatCard
                            title="Progress"
                            value={`${progressPercentage}%`}
                            subtitle="Current completion"
                        />
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_0.7fr] gap-6">
                        <section className="bg-[#0a1628] border border-[#1e2d4a] rounded-3xl p-6">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-1">
                                        Active roadmap
                                    </h2>

                                    <p className="text-[#8899aa] text-sm">
                                        {activeRoadmap?.title}
                                    </p>
                                </div>

                                <button
                                    className="text-[#3b82f6] text-sm hover:text-[#60a5fa] transition-colors"
                                    onClick={() => navigate('/roadmaps')}
                                >
                                    View all →
                                </button>
                            </div>

                            <div className="mb-6">
                                <div className="flex items-center justify-between text-sm mb-2">
                                    <span className="text-[#8899aa]">
                                        Week {currentWeek} of {activeRoadmap?.totalWeeks}
                                    </span>

                                    <span className="text-[#3b82f6] font-medium">
                                        {progressPercentage}% complete
                                    </span>
                                </div>

                                <div className="w-full h-3 rounded-full bg-[#09111f] overflow-hidden">
                                    <div
                                        style={{ width: `${progressPercentage}%` }}
                                        className="h-full bg-[#3b82f6] rounded-full transition-all duration-500"
                                    />
                                </div>
                            </div>

                            <div className="relative flex items-center gap-3">
                                {/* Back Arrow */}
                                {currentWeekIndex > 0 && (
                                    <button
                                        onClick={() => setCurrentWeekIndex(i => i - 1)}
                                        className="p-2 rounded-full bg-[#09111f] border border-[#1e2d4a] text-white hover:bg-[#1e2d4a] transition-colors shrink-0"
                                    >
                                        ←
                                    </button>
                                )}

                                {/* Week Card */}
                                <div className="flex-1">
                                    {activeRoadmap?.weeks[currentWeekIndex] && (
                                        <RoadmapWeekCard
                                            key={activeRoadmap.weeks[currentWeekIndex]._id}
                                            week={activeRoadmap.weeks[currentWeekIndex]}
                                            currentWeek={currentWeek}
                                            onMarkCompleted={markWeekCompleted}
                                        />
                                    )}
                                </div>

                                {/* Forward Arrow */}
                                {currentWeekIndex < (activeRoadmap?.weeks.length - 1) && (
                                    <button
                                        onClick={() => setCurrentWeekIndex(i => i + 1)}
                                        className="p-2 rounded-full bg-[#09111f] border border-[#1e2d4a] text-white hover:bg-[#1e2d4a] transition-colors shrink-0"
                                    >
                                        →
                                    </button>
                                )}
                            </div>
                        </section>

                        <AIChatCard />
                    </div>
                </div>
            </main>
        </div>
    );
}
