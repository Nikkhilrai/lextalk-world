"use client";

import { useState, useEffect } from "react";
import { Lock, Save, Shield, User } from "lucide-react";
import { updateProfile, updatePassword, getAdminProfile } from "@/actions/auth";

export default function SettingsPage() {
    const [isLoadingProfile, setIsLoadingProfile] = useState(false);
    const [isLoadingPassword, setIsLoadingPassword] = useState(false);

    // Profile State
    const [profile, setProfile] = useState({ name: "", email: "" });

    // Password State
    const [passwordData, setPasswordData] = useState({
        current: "",
        new: "",
        confirm: ""
    });

    useEffect(() => {
        const loadProfile = async () => {
            const res = await getAdminProfile();
            if (res.success && res.profile) {
                setProfile({
                    name: res.profile.name || "",
                    email: res.profile.email
                });
            }
        };
        loadProfile();
    }, []);

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoadingProfile(true);

        const res = await updateProfile(profile);
        if (res.success) {
            alert("Profile updated successfully!");
        } else {
            alert(res.error || "Failed to update profile");
        }
        setIsLoadingProfile(false);
    };

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoadingPassword(true);

        if (passwordData.new !== passwordData.confirm) {
            alert("New passwords do not match!");
            setIsLoadingPassword(false);
            return;
        }

        const res = await updatePassword({
            current: passwordData.current,
            new: passwordData.new
        });

        if (res.success) {
            alert("Password updated successfully!");
            setPasswordData({ current: "", new: "", confirm: "" });
        } else {
            alert(res.error || "Failed to update password");
        }
        setIsLoadingPassword(false);
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

                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Display Name</label>
                            <input
                                type="text"
                                value={profile.name}
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-amber-500 outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Email Address</label>
                            <input
                                type="email"
                                value={profile.email}
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-amber-500 outline-none"
                            />
                        </div>
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isLoadingProfile}
                                className="px-4 py-2 bg-slate-800 text-white font-medium rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                            >
                                {isLoadingProfile ? "Saving..." : (
                                    <>
                                        <Save size={16} />
                                        Save Profile
                                    </>
                                )}
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
                                disabled={isLoadingPassword}
                                className="px-4 py-2 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2 disabled:opacity-50"
                            >
                                {isLoadingPassword ? "Updating..." : (
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
