import { Sidebar } from "@/components/admin/Sidebar";
import { NotificationBell } from "@/components/admin/NotificationBell";
import { getAdminProfile } from "@/actions/auth";
import { Bell, Search, Settings } from "lucide-react";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { success, profile } = await getAdminProfile();
    const displayName = success && profile?.name ? profile.name : "Admin User";

    return (
        <div className="min-h-screen admin-bg text-slate-200 font-sans selection:bg-neon-blue/30">
            {/* Background Ambient Mesh */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 center w-full h-[500px] bg-gradient-to-b from-blue-900/10 to-transparent blur-3xl" />
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[128px]" />
            </div>

            <Sidebar />

            <main className="relative z-10 lg:ml-[250px] min-h-screen flex flex-col transition-all duration-300">
                {/* Standard Sticky Header */}
                <header className="sticky top-0 right-0 z-30 bg-[#13192f]/90 backdrop-blur border-b border-[#1b213b] px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                        <button className="lg:hidden text-[#878a99]">
                            {/* Mobile triggers handled by Sidebar component, but we keep spacer */}
                        </button>
                        <div className="relative w-full max-w-md hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#878a99] w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full bg-[#2a304d]/50 border-none rounded-sm pl-10 pr-4 py-2 text-sm text-[#ced4da] placeholder:text-[#878a99] focus:outline-none focus:ring-1 focus:ring-[#405189]"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <NotificationBell />

                        <div className="h-8 w-px bg-[#1b213b] mx-1" />

                        <div className="flex items-center gap-3 cursor-pointer">
                            <div className="text-right hidden sm:block">
                                <div className="text-[13px] font-semibold text-[#ced4da] leading-tight mb-0.5">{displayName}</div>
                                <div className="text-[11px] text-[#878a99] leading-tight">Admin</div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-[#2a304d] flex items-center justify-center text-[#ced4da] text-xs font-bold ring-2 ring-[#1b213b]">
                                {displayName.charAt(0)}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-6 lg:p-8 flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
}
