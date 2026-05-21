import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import Form from "../components/Form";
import { roadmapGenerate } from "../services/api.js";

export default function NewRoadmap() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSubmit = async (formData) => {
        setLoading(true);
        try {
            await roadmapGenerate(formData);
            navigate("/dashboard");
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#070d18] text-white flex">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="flex-1 overflow-y-auto">
                <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

                <div className="p-6">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-white">New Roadmap</h2>
                        <p className="text-[#8899aa] text-sm mt-1">
                            Fill in the details to generate your personalized learning roadmap
                        </p>
                    </div>

                    <Form onSubmit={handleSubmit} loading={loading} />
                </div>
            </main>
        </div>
    );
}