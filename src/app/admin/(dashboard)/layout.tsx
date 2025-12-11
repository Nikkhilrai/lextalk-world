import { Sidebar } from "@/components/admin/Sidebar";
import { getAdminProfile } from "@/actions/auth";
import Image from "next/image";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { success, profile } = await getAdminProfile();
    const displayName = success && profile?.name ? profile.name : "Admin User";
    const displayRole = "Super Admin"; // Role is hardcoded for now, or can be fetched if added to DB

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200">
            <Sidebar />

            <main className="lg:ml-64 min-h-screen">
                {/* Top Header Placeholder - Can be its own component later */}
                <header className="h-16 border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-30 flex items-center justify-between px-6 lg:px-8">
                    <h1 className="text-lg font-semibold text-slate-100">Dashboard</h1>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
                            <div className="text-right hidden sm:block">
                                <div className="text-sm font-medium text-white">{displayName}</div>
                                <div className="text-xs text-slate-500">{displayRole}</div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 overflow-hidden relative">
                                {/* Placeholder Avatar */}
                                <div className="absolute inset-0 bg-amber-500/20 flex items-center justify-center text-amber-500 text-xs font-bold">A</div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-4 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
