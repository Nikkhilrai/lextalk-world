"use client";

import { useState, useEffect } from "react";
import {
    Save, RefreshCw, Eye, EyeOff, Plus, Trash2, ChevronDown, ChevronUp,
    Globe, Users, Calendar, Building, Lightbulb, Award, Heart, CheckCircle
} from "lucide-react";

interface Stat {
    number: number;
    suffix: string;
    label: string;
    icon: string;
}

interface Value {
    icon: string;
    title: string;
    description: string;
    color: string;
}

interface Milestone {
    year: string;
    title: string;
    description: string;
}

interface AboutContent {
    id?: string;
    heroTagline: string;
    heroTitle: string;
    heroSubtitle: string;
    stats: Stat[];
    storyTitle: string;
    storyContent: string;
    missionTitle: string;
    missionContent: string;
    visionTitle: string;
    visionContent: string;
    values: Value[];
    milestones: Milestone[];
    isPublished: boolean;
    showInNavbar: boolean;
}

const iconOptions = [
    "Globe", "Users", "Calendar", "Building", "Lightbulb", "Award", "Heart", "Target", "Zap", "Shield"
];

const colorOptions = [
    { value: "from-amber-500 to-orange-600", label: "Amber → Orange" },
    { value: "from-blue-500 to-indigo-600", label: "Blue → Indigo" },
    { value: "from-emerald-500 to-teal-600", label: "Emerald → Teal" },
    { value: "from-rose-500 to-pink-600", label: "Rose → Pink" },
    { value: "from-purple-500 to-violet-600", label: "Purple → Violet" },
];

export default function AboutManagement() {
    const [content, setContent] = useState<AboutContent | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [expandedSections, setExpandedSections] = useState<string[]>(["hero", "story"]);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const res = await fetch("/api/about");
            const data = await res.json();

            // Parse JSON fields
            setContent({
                ...data,
                stats: typeof data.stats === "string" ? JSON.parse(data.stats) : data.stats,
                values: typeof data.values === "string" ? JSON.parse(data.values) : data.values,
                milestones: typeof data.milestones === "string" ? JSON.parse(data.milestones) : data.milestones,
            });
        } catch (error) {
            console.error("Error fetching content:", error);
            setMessage({ type: "error", text: "Failed to load content" });
        } finally {
            setLoading(false);
        }
    };

    const saveContent = async () => {
        if (!content) return;
        setSaving(true);
        setMessage(null);

        try {
            const res = await fetch("/api/about", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...content,
                    stats: JSON.stringify(content.stats),
                    values: JSON.stringify(content.values),
                    milestones: JSON.stringify(content.milestones),
                }),
            });

            if (res.ok) {
                setMessage({ type: "success", text: "Content saved successfully!" });
            } else {
                throw new Error("Failed to save");
            }
        } catch (error) {
            setMessage({ type: "error", text: "Failed to save content" });
        } finally {
            setSaving(false);
        }
    };

    const toggleSection = (section: string) => {
        setExpandedSections(prev =>
            prev.includes(section)
                ? prev.filter(s => s !== section)
                : [...prev, section]
        );
    };

    const updateField = (field: keyof AboutContent, value: any) => {
        if (!content) return;
        setContent({ ...content, [field]: value });
    };

    const addStat = () => {
        if (!content) return;
        setContent({
            ...content,
            stats: [...content.stats, { number: 0, suffix: "+", label: "New Stat", icon: "Globe" }],
        });
    };

    const removeStat = (index: number) => {
        if (!content) return;
        setContent({
            ...content,
            stats: content.stats.filter((_, i) => i !== index),
        });
    };

    const updateStat = (index: number, field: keyof Stat, value: any) => {
        if (!content) return;
        const newStats = [...content.stats];
        newStats[index] = { ...newStats[index], [field]: value };
        setContent({ ...content, stats: newStats });
    };

    const addValue = () => {
        if (!content) return;
        setContent({
            ...content,
            values: [...content.values, { icon: "Lightbulb", title: "New Value", description: "", color: "from-amber-500 to-orange-600" }],
        });
    };

    const removeValue = (index: number) => {
        if (!content) return;
        setContent({
            ...content,
            values: content.values.filter((_, i) => i !== index),
        });
    };

    const updateValue = (index: number, field: keyof Value, value: string) => {
        if (!content) return;
        const newValues = [...content.values];
        newValues[index] = { ...newValues[index], [field]: value };
        setContent({ ...content, values: newValues });
    };

    const addMilestone = () => {
        if (!content) return;
        setContent({
            ...content,
            milestones: [...content.milestones, { year: new Date().getFullYear().toString(), title: "New Milestone", description: "" }],
        });
    };

    const removeMilestone = (index: number) => {
        if (!content) return;
        setContent({
            ...content,
            milestones: content.milestones.filter((_, i) => i !== index),
        });
    };

    const updateMilestone = (index: number, field: keyof Milestone, value: string) => {
        if (!content) return;
        const newMilestones = [...content.milestones];
        newMilestones[index] = { ...newMilestones[index], [field]: value };
        setContent({ ...content, milestones: newMilestones });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <RefreshCw className="w-8 h-8 animate-spin text-amber-500" />
            </div>
        );
    }

    if (!content) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500">Failed to load content</p>
            </div>
        );
    }

    const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
        <div className="vz-card rounded-lg overflow-hidden mb-4">
            <button
                onClick={() => toggleSection(id)}
                className="w-full flex items-center justify-between p-4 bg-[#1a1f36] hover:bg-[#1f2544] transition-colors"
            >
                <h3 className="text-white font-semibold">{title}</h3>
                {expandedSections.includes(id) ? (
                    <ChevronUp className="w-5 h-5 text-[#878a99]" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-[#878a99]" />
                )}
            </button>
            {expandedSections.includes(id) && (
                <div className="p-4 bg-[#212734] border-t border-white/5">
                    {children}
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen text-[#878a99] pb-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">About Page Management</h1>
                    <p className="text-sm text-[#878a99] mt-1">Edit content that appears on the About Us page</p>
                </div>
                <div className="flex items-center gap-3">
                    <a
                        href="/about"
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 bg-[#2a304d] text-white rounded-lg hover:bg-[#353b59] transition-colors text-sm"
                    >
                        <Eye size={16} />
                        Preview
                    </a>
                    <button
                        onClick={saveContent}
                        disabled={saving}
                        className="flex items-center gap-2 px-5 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold text-sm disabled:opacity-50"
                    >
                        {saving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>

            {/* Message */}
            {message && (
                <div className={`p-4 rounded-lg mb-4 flex items-center gap-2 ${message.type === "success" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                    }`}>
                    <CheckCircle size={18} />
                    {message.text}
                </div>
            )}

            {/* Publish Settings */}
            <div className="vz-card rounded-lg p-4 mb-6 flex items-center justify-between">
                <div>
                    <h3 className="text-white font-semibold">Publish Settings</h3>
                    <p className="text-xs text-[#878a99] mt-1">Control visibility of the About page</p>
                </div>
                <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={content.isPublished}
                            onChange={(e) => updateField("isPublished", e.target.checked)}
                            className="w-4 h-4 rounded border-white/20 bg-[#1a1f36] text-amber-500 focus:ring-amber-500"
                        />
                        <span className="text-sm text-white">Published</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={content.showInNavbar}
                            onChange={(e) => updateField("showInNavbar", e.target.checked)}
                            className="w-4 h-4 rounded border-white/20 bg-[#1a1f36] text-amber-500 focus:ring-amber-500"
                        />
                        <span className="text-sm text-white">Show in Navbar</span>
                    </label>
                </div>
            </div>

            {/* Hero Section */}
            <Section id="hero" title="🎯 Hero Section">
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs text-[#878a99] mb-1">Tagline Badge</label>
                        <input
                            type="text"
                            value={content.heroTagline}
                            onChange={(e) => updateField("heroTagline", e.target.value)}
                            className="w-full px-3 py-2 bg-[#1a1f36] border border-white/10 rounded-lg text-white text-sm focus:border-amber-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-[#878a99] mb-1">Main Title</label>
                        <input
                            type="text"
                            value={content.heroTitle}
                            onChange={(e) => updateField("heroTitle", e.target.value)}
                            className="w-full px-3 py-2 bg-[#1a1f36] border border-white/10 rounded-lg text-white text-sm focus:border-amber-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-[#878a99] mb-1">Subtitle</label>
                        <textarea
                            value={content.heroSubtitle}
                            onChange={(e) => updateField("heroSubtitle", e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 bg-[#1a1f36] border border-white/10 rounded-lg text-white text-sm focus:border-amber-500 focus:outline-none resize-none"
                        />
                    </div>
                </div>
            </Section>

            {/* Stats Section */}
            <Section id="stats" title="📊 Statistics">
                <div className="space-y-3">
                    {content.stats.map((stat, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-[#1a1f36] rounded-lg">
                            <input
                                type="number"
                                value={stat.number}
                                onChange={(e) => updateStat(index, "number", parseInt(e.target.value) || 0)}
                                className="w-20 px-2 py-1 bg-[#0f1322] border border-white/10 rounded text-white text-sm"
                                placeholder="Number"
                            />
                            <input
                                type="text"
                                value={stat.suffix}
                                onChange={(e) => updateStat(index, "suffix", e.target.value)}
                                className="w-14 px-2 py-1 bg-[#0f1322] border border-white/10 rounded text-white text-sm"
                                placeholder="+"
                            />
                            <input
                                type="text"
                                value={stat.label}
                                onChange={(e) => updateStat(index, "label", e.target.value)}
                                className="flex-1 px-2 py-1 bg-[#0f1322] border border-white/10 rounded text-white text-sm"
                                placeholder="Label"
                            />
                            <select
                                value={stat.icon}
                                onChange={(e) => updateStat(index, "icon", e.target.value)}
                                className="px-2 py-1 bg-[#0f1322] border border-white/10 rounded text-white text-sm"
                            >
                                {iconOptions.map(icon => (
                                    <option key={icon} value={icon}>{icon}</option>
                                ))}
                            </select>
                            <button
                                onClick={() => removeStat(index)}
                                className="p-1 text-red-400 hover:text-red-300"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={addStat}
                        className="flex items-center gap-2 px-3 py-2 text-amber-400 hover:text-amber-300 text-sm"
                    >
                        <Plus size={16} />
                        Add Stat
                    </button>
                </div>
            </Section>

            {/* Story Section */}
            <Section id="story" title="📖 Our Story">
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs text-[#878a99] mb-1">Section Title</label>
                        <input
                            type="text"
                            value={content.storyTitle}
                            onChange={(e) => updateField("storyTitle", e.target.value)}
                            className="w-full px-3 py-2 bg-[#1a1f36] border border-white/10 rounded-lg text-white text-sm focus:border-amber-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-[#878a99] mb-1">Story Content (use line breaks for paragraphs)</label>
                        <textarea
                            value={content.storyContent}
                            onChange={(e) => updateField("storyContent", e.target.value)}
                            rows={8}
                            className="w-full px-3 py-2 bg-[#1a1f36] border border-white/10 rounded-lg text-white text-sm focus:border-amber-500 focus:outline-none resize-none"
                        />
                    </div>
                </div>
            </Section>

            {/* Mission & Vision */}
            <Section id="mission" title="🎯 Mission & Vision">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs text-[#878a99] mb-1">Mission Title</label>
                            <input
                                type="text"
                                value={content.missionTitle}
                                onChange={(e) => updateField("missionTitle", e.target.value)}
                                className="w-full px-3 py-2 bg-[#1a1f36] border border-white/10 rounded-lg text-white text-sm focus:border-amber-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-[#878a99] mb-1">Mission Content</label>
                            <textarea
                                value={content.missionContent}
                                onChange={(e) => updateField("missionContent", e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 bg-[#1a1f36] border border-white/10 rounded-lg text-white text-sm focus:border-amber-500 focus:outline-none resize-none"
                            />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs text-[#878a99] mb-1">Vision Title</label>
                            <input
                                type="text"
                                value={content.visionTitle}
                                onChange={(e) => updateField("visionTitle", e.target.value)}
                                className="w-full px-3 py-2 bg-[#1a1f36] border border-white/10 rounded-lg text-white text-sm focus:border-amber-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-[#878a99] mb-1">Vision Content</label>
                            <textarea
                                value={content.visionContent}
                                onChange={(e) => updateField("visionContent", e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 bg-[#1a1f36] border border-white/10 rounded-lg text-white text-sm focus:border-amber-500 focus:outline-none resize-none"
                            />
                        </div>
                    </div>
                </div>
            </Section>

            {/* Core Values */}
            <Section id="values" title="💎 Core Values">
                <div className="space-y-3">
                    {content.values.map((value, index) => (
                        <div key={index} className="p-3 bg-[#1a1f36] rounded-lg space-y-2">
                            <div className="flex items-center gap-3">
                                <select
                                    value={value.icon}
                                    onChange={(e) => updateValue(index, "icon", e.target.value)}
                                    className="px-2 py-1 bg-[#0f1322] border border-white/10 rounded text-white text-sm"
                                >
                                    {iconOptions.map(icon => (
                                        <option key={icon} value={icon}>{icon}</option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    value={value.title}
                                    onChange={(e) => updateValue(index, "title", e.target.value)}
                                    className="flex-1 px-2 py-1 bg-[#0f1322] border border-white/10 rounded text-white text-sm"
                                    placeholder="Value Title"
                                />
                                <select
                                    value={value.color}
                                    onChange={(e) => updateValue(index, "color", e.target.value)}
                                    className="px-2 py-1 bg-[#0f1322] border border-white/10 rounded text-white text-sm"
                                >
                                    {colorOptions.map(color => (
                                        <option key={color.value} value={color.value}>{color.label}</option>
                                    ))}
                                </select>
                                <button
                                    onClick={() => removeValue(index)}
                                    className="p-1 text-red-400 hover:text-red-300"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <textarea
                                value={value.description}
                                onChange={(e) => updateValue(index, "description", e.target.value)}
                                rows={2}
                                className="w-full px-2 py-1 bg-[#0f1322] border border-white/10 rounded text-white text-sm resize-none"
                                placeholder="Description"
                            />
                        </div>
                    ))}
                    <button
                        onClick={addValue}
                        className="flex items-center gap-2 px-3 py-2 text-amber-400 hover:text-amber-300 text-sm"
                    >
                        <Plus size={16} />
                        Add Value
                    </button>
                </div>
            </Section>

            {/* Milestones */}
            <Section id="milestones" title="📅 Journey Milestones">
                <div className="space-y-3">
                    {content.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-[#1a1f36] rounded-lg">
                            <input
                                type="text"
                                value={milestone.year}
                                onChange={(e) => updateMilestone(index, "year", e.target.value)}
                                className="w-20 px-2 py-1 bg-[#0f1322] border border-white/10 rounded text-white text-sm"
                                placeholder="Year"
                            />
                            <div className="flex-1 space-y-2">
                                <input
                                    type="text"
                                    value={milestone.title}
                                    onChange={(e) => updateMilestone(index, "title", e.target.value)}
                                    className="w-full px-2 py-1 bg-[#0f1322] border border-white/10 rounded text-white text-sm"
                                    placeholder="Milestone Title"
                                />
                                <input
                                    type="text"
                                    value={milestone.description}
                                    onChange={(e) => updateMilestone(index, "description", e.target.value)}
                                    className="w-full px-2 py-1 bg-[#0f1322] border border-white/10 rounded text-white text-sm"
                                    placeholder="Description"
                                />
                            </div>
                            <button
                                onClick={() => removeMilestone(index)}
                                className="p-1 text-red-400 hover:text-red-300 mt-1"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={addMilestone}
                        className="flex items-center gap-2 px-3 py-2 text-amber-400 hover:text-amber-300 text-sm"
                    >
                        <Plus size={16} />
                        Add Milestone
                    </button>
                </div>
            </Section>
        </div>
    );
}
