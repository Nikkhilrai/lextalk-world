"use client";

import { useState, useEffect, useRef } from "react";
import { Bell, X, Check, ExternalLink } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

type Notification = {
    id: string;
    type: string;
    message: string;
    referenceId: string | null;
    read: boolean;
    link: string | null;
    createdAt: string;
};

export function NotificationBell() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const fetchNotifications = async () => {
        try {
            const res = await fetch("/api/admin/notifications");
            if (res.ok) {
                const data = await res.json();
                setNotifications(data.notifications);
                setUnreadCount(data.unreadCount);
            }
        } catch (error) {
            console.error("Failed to fetch notifications", error);
        }
    };

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 60000 * 5); // Poll every 5 minutes
        return () => clearInterval(interval);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const markAsRead = async (id: string) => {
        try {
            await fetch(`/api/admin/notifications/${id}`, { method: "PATCH" });
            setNotifications(prev =>
                prev.map(n => (n.id === id ? { ...n, read: true } : n))
            );
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (error) {
            console.error("Failed to mark as read", error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await fetch(`/api/admin/notifications`, { method: "PATCH" });
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
            setUnreadCount(0);
        } catch (error) {
            console.error("Failed to mark all as read", error);
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case "CONTACT": return "bg-blue-500/20 text-blue-400";
            case "TICKET_PURCHASE": return "bg-emerald-500/20 text-emerald-400";
            case "SPONSORSHIP": return "bg-amber-500/20 text-amber-400";
            case "AGENDA_DOWNLOAD": return "bg-purple-500/20 text-purple-400";
            case "NEWSLETTER": return "bg-cyan-500/20 text-cyan-400";
            default: return "bg-slate-500/20 text-slate-400";
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-[#878a99] hover:text-[#ced4da] relative transition-colors"
                aria-label="Notifications"
            >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 ring-2 ring-[#13192f]"></span>
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-[#2a304d] border border-[#374063] rounded-lg shadow-xl z-50 overflow-hidden text-sm">
                    <div className="p-3 border-b border-[#374063] flex items-center justify-between bg-[#20253b]">
                        <h3 className="font-semibold text-slate-200">Notifications ({unreadCount})</h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                            >
                                <Check size={12} /> Mark all read
                            </button>
                        )}
                    </div>

                    <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
                        {notifications.length === 0 ? (
                            <div className="p-8 text-center text-slate-500">
                                <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p>No notifications yet</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-[#374063]">
                                {notifications.map((notif) => (
                                    <div
                                        key={notif.id}
                                        className={`p-4 hover:bg-[#323959] transition-colors relative group ${!notif.read ? 'bg-[#323959]/30' : ''}`}
                                    >
                                        <div className="flex gap-3">
                                            <div className="flex-1">
                                                <p className={`text-slate-300 mb-1 ${!notif.read ? 'font-medium text-white' : ''}`}>
                                                    {notif.message}
                                                </p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider ${getTypeColor(notif.type)}`}>
                                                        {notif.type.replace('_', ' ')}
                                                    </span>
                                                    <span className="text-xs text-slate-500">
                                                        {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                                                    </span>
                                                </div>
                                            </div>
                                            {!notif.read && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        markAsRead(notif.id);
                                                    }}
                                                    className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"
                                                    title="Mark as read"
                                                />
                                            )}
                                        </div>
                                        {notif.link && (
                                            <Link
                                                href={notif.link}
                                                className="absolute inset-0 z-0"
                                                onClick={() => setIsOpen(false)}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
