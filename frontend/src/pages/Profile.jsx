import { useEffect, useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import { getUserData, getUserRoadmaps } from "../services/api.js";

export default function Profile() {
    const [userData, setUserData] = useState(null);
    const [roadmaps, setRoadmaps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [{ data: uData }, { data: rData }] = await Promise.all([
                    getUserData(),
                    getUserRoadmaps(),
                ]);
                setUserData(uData.user);
                setRoadmaps(rData);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#070d18] flex items-center justify-center text-white">
                Loading profile...
            </div>
        );
    }

    const totalWeeks = roadmaps.reduce((acc, r) => acc + r.totalWeeks, 0);
    const completedWeeks = roadmaps.reduce(
        (acc, r) => acc + r.weeks.filter((w) => w.completed).length, 0
    );
    const overallProgress = totalWeeks > 0 ? Math.round((completedWeeks / totalWeeks) * 100) : 0;

    const joinedDate = new Date(userData?.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const lastLogin = userData?.lastLogin
        ? new Date(userData.lastLogin).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
          })
        : "N/A";

    const initials = userData?.username
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    
    

    return (
        <div className="min-h-screen bg-[#070d18] text-white flex">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}     />

            <main className="flex-1 overflow-y-auto">
                <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

                <div className="p-6 space-y-6">

                    {/* Profile Card */}
                    <div className="bg-[#0a1628] border border-[#1e2d4a] rounded-3xl p-8">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-full bg-[#bfdbfe] text-[#1e3a8a] flex items-center justify-center text-2xl font-bold shrink-0">
                                {initials}
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-white mb-1">
                                    {userData?.username}
                                </h2>
                                <p className="text-[#8899aa] text-sm">{userData?.email}</p>
                                <span className="mt-2 inline-block px-3 py-1 rounded-full bg-[#13294d] text-[#93c5fd] text-xs">
                                    {userData?.plan || "Free plan"} Plan
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <div className="bg-[#0a1628] border border-[#1e2d4a] rounded-3xl p-6">
                            <p className="text-[#8899aa] text-sm mb-1">Total Roadmaps</p>
                            <p className="text-3xl font-bold text-white">{roadmaps.length}</p>
                        </div>

                        <div className="bg-[#0a1628] border border-[#1e2d4a] rounded-3xl p-6">
                            <p className="text-[#8899aa] text-sm mb-1">Weeks Completed</p>
                            <p className="text-3xl font-bold text-white">
                                {completedWeeks}
                                <span className="text-[#8899aa] text-lg font-normal">/{totalWeeks}</span>
                            </p>
                        </div>

                        <div className="bg-[#0a1628] border border-[#1e2d4a] rounded-3xl p-6">
                            <p className="text-[#8899aa] text-sm mb-1">Overall Progress</p>
                            <p className="text-3xl font-bold text-white">{overallProgress}%</p>
                            <div className="w-full h-2 rounded-full bg-[#09111f] overflow-hidden mt-3">
                                <div
                                    style={{ width: `${overallProgress}%` }}
                                    className="h-full bg-[#3b82f6] rounded-full transition-all duration-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Account Info */}
                    <div className="bg-[#0a1628] border border-[#1e2d4a] rounded-3xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-5">Account Info</h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-3 border-b border-[#1e2d4a]">
                                <span className="text-[#8899aa] text-sm">Username</span>
                                <span className="text-white text-sm">{userData?.username}</span>
                            </div>

                            <div className="flex items-center justify-between py-3 border-b border-[#1e2d4a]">
                                <span className="text-[#8899aa] text-sm">Email</span>
                                <span className="text-white text-sm">{userData?.email}</span>
                            </div>

                            <div className="flex items-center justify-between py-3 border-b border-[#1e2d4a]">
                                <span className="text-[#8899aa] text-sm">Joined</span>
                                <span className="text-white text-sm">{joinedDate}</span>
                            </div>

                            <div className="flex items-center justify-between py-3">
                                <span className="text-[#8899aa] text-sm">Last Login</span>
                                <span className="text-white text-sm">{lastLogin}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}