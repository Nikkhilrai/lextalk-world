/**
 * The admin sidebar, in one place. The header's quick search and page title
 * read from the same list, so a tab only needs adding here.
 */
import {
    LayoutDashboard, CalendarDays, Users, ScanLine, Download, FileCheck2, Tag, Mic, Award, Trophy,
    BadgeCheck, MessageCircle, HeartHandshake, Lock, Bot, MessagesSquare, Ticket, Layers, ShoppingCart,
    Receipt, BookOpen, MessageSquareText, UsersRound, Mail, Map as MapIcon, Armchair, Settings, Target,
    type LucideIcon,
} from "lucide-react";

export type NavItem = { label: string; href: string; icon: LucideIcon; hint?: string };
export type NavGroup = { title: string; items: NavItem[]; collapsed?: boolean };

export const NAV_GROUPS: NavGroup[] = [
    {
        title: "Overview",
        items: [
            { label: "Dashboard", href: "/admin", icon: LayoutDashboard, hint: "Events, activity and website traffic" },
            { label: "Leads", href: "/admin/leads", icon: Target, hint: "Enquiries from the website forms" },
        ],
    },
    {
        title: "Events",
        items: [
            { label: "Delegates", href: "/admin/delegate-registrations", icon: Users, hint: "Delegate registrations and passes" },
            { label: "Check-In", href: "/admin/check-in", icon: ScanLine, hint: "Scan passes at the venue" },
            { label: "Agenda Downloads", href: "/admin/agenda-downloads", icon: Download, hint: "Agenda and show-guide leads" },
            { label: "Delegate Consent", href: "/admin/delegate-consent", icon: FileCheck2 },
            { label: "Delegate Coupons", href: "/admin/delegate-coupons", icon: Tag },
            { label: "Conferences", href: "/admin/conferences", icon: CalendarDays },
        ],
    },
    {
        title: "Speakers & Awards",
        items: [
            { label: "Speaker Applications", href: "/admin/speaker-applications", icon: Mic },
            { label: "Award Nominations", href: "/admin/nominations", icon: Award },
            { label: "Awards Eligibility", href: "/admin/awards-eligibility", icon: BadgeCheck },
            { label: "Awardees", href: "/admin/awardees", icon: Trophy, hint: "Public awardee profiles" },
        ],
    },
    {
        title: "Inbox",
        items: [
            { label: "Contact Messages", href: "/admin/contact-messages", icon: MessageCircle },
            { label: "Sponsorship Inquiries", href: "/admin/sponsorship-inquiries", icon: HeartHandshake },
            { label: "Counsel Exchange", href: "/admin/counsel-exchange-access", icon: Lock },
            { label: "Chatbot Leads", href: "/admin/chatbot-leads", icon: Bot },
            { label: "Chat Conversations", href: "/admin/chat-conversations", icon: MessagesSquare },
        ],
    },
    {
        title: "Payments",
        items: [
            { label: "Tickets", href: "/admin/tickets", icon: Ticket },
            { label: "Ticket Types", href: "/admin/ticket-types", icon: Layers },
            { label: "Awardee Orders", href: "/admin/awardee-orders", icon: Receipt },
            { label: "Checkout Leads", href: "/admin/checkout-leads", icon: ShoppingCart, hint: "Started checkout but didn't pay" },
        ],
    },
    {
        title: "Content",
        items: [
            { label: "Blog / News", href: "/admin/blog", icon: BookOpen },
            { label: "Comments", href: "/admin/comments", icon: MessageSquareText },
            { label: "Newsletter", href: "/admin/newsletter", icon: Mail },
            { label: "Advisory Board", href: "/admin/advisors", icon: UsersRound },
        ],
    },
    {
        title: "Past events",
        collapsed: true,
        items: [
            { label: "Dubai 2026", href: "/admin/dubai-2026", icon: MapIcon, hint: "10 September 2026" },
            { label: "Seat Reservations", href: "/admin/seat-reservations", icon: Armchair, hint: "Dubai reserve-your-seat form" },
        ],
    },
    {
        title: "Account",
        items: [
            { label: "Settings", href: "/admin/settings", icon: Settings, hint: "Profile, password and team access" },
        ],
    },
];

// Must match the allow-lists in src/middleware.ts.
const BLOG_EDITOR_ALLOWED = ["/admin/blog", "/admin/comments"];
const LEAD_MANAGER_ALLOWED = [
    "/admin/leads", "/admin/agenda-downloads", "/admin/delegate-registrations", "/admin/seat-reservations",
    "/admin/newsletter", "/admin/contact-messages", "/admin/sponsorship-inquiries",
];

/** The sidebar a role can actually use (no links the middleware would bounce). */
export function navForRole(role: string | null): NavGroup[] {
    const allowed = role === "blog_editor" ? BLOG_EDITOR_ALLOWED : role === "lead_manager" ? LEAD_MANAGER_ALLOWED : null;
    if (!allowed) return NAV_GROUPS;
    return NAV_GROUPS
        .map(g => ({ ...g, collapsed: false, items: g.items.filter(i => allowed.includes(i.href)) }))
        .filter(g => g.items.length > 0);
}

export function homeForRole(role: string | null) {
    return role === "blog_editor" ? "/admin/blog" : role === "lead_manager" ? "/admin/leads" : "/admin";
}

export function roleLabel(role: string | null) {
    if (role === "blog_editor") return "Blog Editor";
    if (role === "lead_manager") return "Lead Manager";
    if (role === "super_admin" || role === "superadmin") return "Super Admin";
    return "Admin";
}

/** The nav item for a path (longest matching href wins, so /admin doesn't swallow everything). */
export function activeItem(pathname: string): { group: NavGroup; item: NavItem } | null {
    let best: { group: NavGroup; item: NavItem } | null = null;
    for (const group of NAV_GROUPS) {
        for (const item of group.items) {
            const hit = item.href === "/admin" ? pathname === "/admin" : pathname === item.href || pathname.startsWith(item.href + "/");
            if (hit && (!best || item.href.length > best.item.href.length)) best = { group, item };
        }
    }
    return best;
}
