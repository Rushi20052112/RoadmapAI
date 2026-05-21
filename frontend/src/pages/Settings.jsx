import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import { getUserData, updateProfile, changePassword, deleteAccount } from "../services/api.js";

export default function Settings() {
    const navigate = useNavigate();

    const [profileData, setProfileData] = useState({ username: "", email: "" });
    const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [profileMsg, setProfileMsg] = useState(null);
    const [passwordMsg, setPasswordMsg] = useState(null);
    const [loading, setLoading] = useState({ profile: false, password: false, delete: false });
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await getUserData();
                setProfileData({
                    username: data.user.username,
                    email: data.user.email,
                });
            } catch (err) {
                console.log(err);
            }
        };
        fetch();
    }, []);

    const handleProfileChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleProfileSubmit = async () => {
        setLoading(l => ({ ...l, profile: true }));
        setProfileMsg(null);
        try {
            await updateProfile(profileData);
            setProfileMsg({ type: "success", text: "Profile updated successfully" });
        } catch (err) {
            setProfileMsg({ type: "error", text: err.response?.data?.message || "Failed to update" });
        } finally {
            setLoading(l => ({ ...l, profile: false }));
        }
    };

    const handlePasswordSubmit = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordMsg({ type: "error", text: "Passwords do not match" });
            return;
        }
        if (passwordData.newPassword.length < 6) {
            setPasswordMsg({ type: "error", text: "Password must be at least 6 characters" });
            return;
        }
        setLoading(l => ({ ...l, password: true }));
        setPasswordMsg(null);
        try {
            await changePassword({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
            });
            setPasswordMsg({ type: "success", text: "Password changed successfully" });
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err) {
            setPasswordMsg({ type: "error", text: err.response?.data?.message || "Failed to change password" });
        } finally {
            setLoading(l => ({ ...l, password: false }));
        }
    };

    const handleDeleteAccount = async () => {
        setLoading(l => ({ ...l, delete: true }));
        try {
            await deleteAccount();
            navigate("/auth/login");
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(l => ({ ...l, delete: false }));
        }
    };

    return (
        <div className="min-h-screen bg-[#070d18] text-white flex">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="flex-1 overflow-y-auto">
                <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

                <div className="p-6 space-y-6 max-w-2xl">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Settings</h2>
                        <p className="text-[#8899aa] text-sm mt-1">Manage your account settings</p>
                    </div>

                    {/* Update Profile */}
                    <div className="bg-[#0a1628] border border-[#1e2d4a] rounded-3xl p-6 space-y-4">
                        <h3 className="text-lg font-semibold text-white">Update Profile</h3>

                        <div>
                            <label className="text-[#8899aa] text-sm mb-2 block">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={profileData.username}
                                onChange={handleProfileChange}
                                className="w-full bg-[#09111f] border border-[#1e2d4a] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#3b82f6] transition-colors"
                            />
                        </div>

                        <div>
                            <label className="text-[#8899aa] text-sm mb-2 block">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={profileData.email}
                                onChange={handleProfileChange}
                                className="w-full bg-[#09111f] border border-[#1e2d4a] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#3b82f6] transition-colors"
                            />
                        </div>

                        {profileMsg && (
                            <p className={`text-sm ${profileMsg.type === "success" ? "text-green-400" : "text-red-400"}`}>
                                {profileMsg.text}
                            </p>
                        )}

                        <button
                            onClick={handleProfileSubmit}
                            disabled={loading.profile}
                            className="w-full bg-[#3b82f6] hover:bg-[#2563eb] disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
                        >
                            {loading.profile ? "Saving..." : "Save Changes"}
                        </button>
                    </div>

                    {/* Change Password */}
                    <div className="bg-[#0a1628] border border-[#1e2d4a] rounded-3xl p-6 space-y-4">
                        <h3 className="text-lg font-semibold text-white">Change Password</h3>

                        {["currentPassword", "newPassword", "confirmPassword"].map((field) => (
                            <div key={field}>
                                <label className="text-[#8899aa] text-sm mb-2 block capitalize">
                                    {field.replace(/([A-Z])/g, " $1")}
                                </label>
                                <input
                                    type="password"
                                    name={field}
                                    value={passwordData[field]}
                                    onChange={handlePasswordChange}
                                    className="w-full bg-[#09111f] border border-[#1e2d4a] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#3b82f6] transition-colors"
                                />
                            </div>
                        ))}

                        {passwordMsg && (
                            <p className={`text-sm ${passwordMsg.type === "success" ? "text-green-400" : "text-red-400"}`}>
                                {passwordMsg.text}
                            </p>
                        )}

                        <button
                            onClick={handlePasswordSubmit}
                            disabled={loading.password}
                            className="w-full bg-[#3b82f6] hover:bg-[#2563eb] disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
                        >
                            {loading.password ? "Updating..." : "Update Password"}
                        </button>
                    </div>

                    {/* Delete Account */}
                    <div className="bg-[#0a1628] border border-red-500/20 rounded-3xl p-6 space-y-4">
                        <h3 className="text-lg font-semibold text-red-400">Delete Account</h3>
                        <p className="text-[#8899aa] text-sm">
                            Permanently delete your account and all associated roadmaps. This action cannot be undone.
                        </p>

                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-semibold py-3 rounded-xl transition-colors"
                        >
                            Delete Account
                        </button>
                    </div>
                </div>
            </main>

            {/* Delete Confirm Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-[#0a1628] border border-[#1e2d4a] rounded-3xl p-8 w-full max-w-md mx-4 space-y-5">
                        <h3 className="text-xl font-bold text-white">Are you sure?</h3>
                        <p className="text-[#8899aa] text-sm">
                            This will permanently delete your account and all your roadmaps. This cannot be undone.
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 py-3 rounded-xl border border-[#1e2d4a] text-white hover:bg-[#1e2d4a] transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                disabled={loading.delete}
                                className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-semibold transition-colors"
                            >
                                {loading.delete ? "Deleting..." : "Yes, Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}