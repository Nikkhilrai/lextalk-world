"use client";

import { useState, useEffect } from "react";
import { Lock, Save, Shield, User, UserPlus, Trash2, Users } from "lucide-react";
import {
    updateProfile,
    updatePassword,
    getAdminProfile,
    getAllAdminUsers,
    createAdminUser,
    deleteAdminUser
} from "@/actions/auth";

interface AdminUser {
    id: string;
    name: string | null;
    email: string;
    role: string;
    createdAt: Date;
}

export default function SettingsPage() {
    const [isLoadingProfile, setIsLoadingProfile] = useState(false);
    const [isLoadingPassword, setIsLoadingPassword] = useState(false);
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const [isCreatingUser, setIsCreatingUser] = useState(false);

    // Profile State
    const [profile, setProfile] = useState({ name: "", email: "", role: "" });

    // Password State
    const [passwordData, setPasswordData] = useState({
        current: "",
        new: "",
        confirm: ""
    });

    // Admin Users State
    const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
    const [showNewUserForm, setShowNewUserForm] = useState(false);
    const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "admin" });

    const isSuperAdmin = profile.role === "super_admin";

    useEffect(() => {
        const loadData = async () => {
            // Load profile
            const profileRes = await getAdminProfile();
            if (profileRes.success && profileRes.profile) {
                setProfile({
                    name: profileRes.profile.name || "",
                    email: profileRes.profile.email,
                    role: profileRes.profile.role || "admin"
                });
            }

            // Load admin users if super_admin
            if (profileRes.profile?.role === "super_admin") {
                setIsLoadingUsers(true);
                const usersRes = await getAllAdminUsers();
                if (usersRes.success && usersRes.users) {
                    setAdminUsers(usersRes.users);
                }
                setIsLoadingUsers(false);
            }
        };
        loadData();
    }, []);

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoadingProfile(true);

        const res = await updateProfile({ name: profile.name, email: profile.email });
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

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsCreatingUser(true);

        const res = await createAdminUser(newUser);
        if (res.success) {
            alert("Admin user created successfully!");
            setNewUser({ name: "", email: "", password: "", role: "admin" });
            setShowNewUserForm(false);
            // Reload users
            const usersRes = await getAllAdminUsers();
            if (usersRes.success && usersRes.users) {
                setAdminUsers(usersRes.users);
            }
        } else {
            alert(res.error || "Failed to create user");
        }
        setIsCreatingUser(false);
    };

    const handleDeleteUser = async (id: string, email: string) => {
        if (!confirm(`Are you sure you want to delete ${email}?`)) return;

        const res = await deleteAdminUser(id);
        if (res.success) {
            setAdminUsers(adminUsers.filter(u => u.id !== id));
        } else {
            alert(res.error || "Failed to delete user");
        }
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
                            <p className="text-slate-400 text-sm">Update your profile information.</p>
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
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Role</label>
                            <input
                                type="text"
                                value={profile.role}
                                disabled
                                className="w-full px-4 py-2 bg-slate-950/50 border border-slate-800 rounded-lg text-slate-500 cursor-not-allowed"
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
                            <p className="text-slate-400 text-sm">Change your password.</p>
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

            {/* Admin User Management - Only for Super Admin */}
            {isSuperAdmin && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                                <Users className="text-blue-500" size={24} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white">Admin User Management</h2>
                                <p className="text-slate-400 text-sm">Create and manage admin accounts.</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowNewUserForm(!showNewUserForm)}
                            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                        >
                            <UserPlus size={16} />
                            Add Admin
                        </button>
                    </div>

                    {/* New User Form */}
                    {showNewUserForm && (
                        <form onSubmit={handleCreateUser} className="mb-6 p-4 bg-slate-950 rounded-lg border border-slate-800">
                            <h3 className="text-sm font-bold text-white mb-4">Create New Admin</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Name</label>
                                    <input
                                        type="text"
                                        value={newUser.name}
                                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-blue-500 outline-none"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Email</label>
                                    <input
                                        type="email"
                                        value={newUser.email}
                                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-blue-500 outline-none"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Password</label>
                                    <input
                                        type="password"
                                        value={newUser.password}
                                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-blue-500 outline-none"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Role</label>
                                    <select
                                        value={newUser.role}
                                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-blue-500 outline-none"
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="super_admin">Super Admin</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-4 flex gap-2">
                                <button
                                    type="submit"
                                    disabled={isCreatingUser}
                                    className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                                >
                                    {isCreatingUser ? "Creating..." : "Create User"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowNewUserForm(false)}
                                    className="px-4 py-2 bg-slate-800 text-white font-medium rounded-lg hover:bg-slate-700 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Users List */}
                    {isLoadingUsers ? (
                        <div className="text-center py-8 text-slate-500">Loading users...</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-800">
                                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Name</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Email</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Role</th>
                                        <th className="text-right py-3 px-4 text-sm font-medium text-slate-400">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {adminUsers.map((user) => (
                                        <tr key={user.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                                            <td className="py-3 px-4 text-white">{user.name || "—"}</td>
                                            <td className="py-3 px-4 text-slate-400">{user.email}</td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-1 text-xs rounded-full ${user.role === "super_admin"
                                                        ? "bg-amber-500/20 text-amber-400"
                                                        : "bg-slate-700 text-slate-300"
                                                    }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-right">
                                                {user.email !== profile.email && (
                                                    <button
                                                        onClick={() => handleDeleteUser(user.id, user.email)}
                                                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                        title="Delete User"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
