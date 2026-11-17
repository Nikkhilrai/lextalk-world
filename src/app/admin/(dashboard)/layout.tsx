import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminProfile } from "@/actions/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const { success, profile } = await getAdminProfile();
    const name = success && profile?.name ? profile.name : "Admin";
    const role = success && profile?.role ? profile.role : null;

    return <AdminShell name={name} role={role}>{children}</AdminShell>;
}
