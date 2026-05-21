import { useState } from "react";

export default function Form({ onSubmit, loading }) {
    const [formData, setFormData] = useState({
        targetRole: "",
        currentLevel: "",
        dailyHours: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (!formData.targetRole || !formData.currentLevel || !formData.dailyHours) return;
        onSubmit(formData);
    };

    return (
        <div className="bg-[#0a1628] border border-[#1e2d4a] rounded-3xl p-8 w-full max-w-2xl">
            <div className="space-y-6">
                <div>
                    <label className="text-[#8899aa] text-sm mb-2 block">Target Role</label>
                    <input
                        type="text"
                        name="targetRole"
                        value={formData.targetRole}
                        onChange={handleChange}
                        placeholder="e.g. Full Stack Developer"
                        className="w-full bg-[#09111f] border border-[#1e2d4a] rounded-xl px-4 py-3 text-white text-sm placeholder-[#8899aa] outline-none focus:border-[#3b82f6] transition-colors"
                    />
                </div>

                <div>
                    <label className="text-[#8899aa] text-sm mb-2 block">Current Level</label>
                    <select
                        name="currentLevel"
                        value={formData.currentLevel}
                        onChange={handleChange}
                        className="w-full bg-[#09111f] border border-[#1e2d4a] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#3b82f6] transition-colors"
                    >
                        <option value="" disabled>Select your level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>

                <div>
                    <label className="text-[#8899aa] text-sm mb-2 block">Daily Hours</label>
                    <input
                        type="number"
                        name="dailyHours"
                        value={formData.dailyHours}
                        onChange={handleChange}
                        placeholder="e.g. 3"
                        min="1"
                        max="24"
                        className="w-full bg-[#09111f] border border-[#1e2d4a] rounded-xl px-4 py-3 text-white text-sm placeholder-[#8899aa] outline-none focus:border-[#3b82f6] transition-colors"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-[#3b82f6] hover:bg-[#2563eb] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors"
                >
                    {loading ? "Generating..." : "Create Roadmap"}
                </button>
            </div>
        </div>
    );
}