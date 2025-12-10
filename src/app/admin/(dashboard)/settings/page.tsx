"use client";

import { useState } from "react";
import { Lock, Save, Shield, User } from "lucide-react";

export default function SettingsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [passwordData, setPasswordData] = useState({
        current: "",
        new: "",
        confirm: ""
    });

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (passwordData.new !== passwordData.confirm) {
            alert("New passwords do not match!");
            setIsLoading(false);
            return;
        }

        // Logic to update password server-side would go here
        // For now, simulating a request
        await new Promise(resolve => setTimeout(resolve, 1000));

        alert("Password updated successfully (Simulation)");
        setPasswordData({ current: "", new: "", confirm: "" });
        setIsLoading(false);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
                <p className="text-slate-400 text-sm">Manage your account and system preferences.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Profile Settings */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center">
                            <User className="text-amber-500" size={24} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">Admin Profile</h2>
                            <p className="text-slate-400 text-sm">Update your public profile information.</p>
                        </div>
                    </div>

                    <form className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Display Name</label>
                            <input
                                type="text"
                                defaultValue="Super Admin"
                                className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-amber-500 outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Email Address</label>
                            <input
                                type="email"
                                defaultValue="admin@lextalk.world"
                                className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-amber-500 outline-none"
                            />
                        </div>
                        <div className="pt-4">
                            <button className="px-4 py-2 bg-slate-800 text-white font-medium rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2">
                                <Save size={16} />
                                Save Profile
                            </button>
                        </div>
                    </form>
                </div>

                {/* Security Settings */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                            <Lock className="text-red-500" size={24} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">Security</h2>
                            <p className="text-slate-400 text-sm">Change your password and security settings.</p>
                        </div>
                    </div>

                    <form onSubmit={handlePasswordUpdate} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Current Password</label>
                            <input
                                type="password"
                                value={passwordData.current}
                                onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                                className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-amber-500 outline-none"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">New Password</label>
                            <input
                                type="password"
                                value={passwordData.new}
                                onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                                className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-amber-500 outline-none"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Confirm New Password</label>
                            <input
                                type="password"
                                value={passwordData.confirm}
                                onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                                className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-amber-500 outline-none"
                                required
                            />
                        </div>
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-4 py-2 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2 disabled:opacity-50"
                            >
                                {isLoading ? "Updating..." : (
                                    <>
                                        <Shield size={16} />
                                        Update Password
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
