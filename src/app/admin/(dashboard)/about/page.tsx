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

interface AdvisoryMember {
    name: string;
    role: string;
    company: string;
    initials: string;
}

interface Speaker {
    name: string;
    role: string;
}

interface Partner {
    name: string;
    logo: string;
}

interface AboutImage {
    src: string;
    alt: string;
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
    advisoryBoard: AdvisoryMember[];
    pastSpeakers: Speaker[];
    partners: Partner[];
    aboutImages: AboutImage[];
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
                stats: typeof data.stats === "string" ? JSON.parse(data.stats) : data.stats || [],
                values: typeof data.values === "string" ? JSON.parse(data.values) : data.values || [],
                milestones: typeof data.milestones === "string" ? JSON.parse(data.milestones) : data.milestones || [],
                advisoryBoard: typeof data.advisoryBoard === "string" ? JSON.parse(data.advisoryBoard) : data.advisoryBoard || [],
                pastSpeakers: typeof data.pastSpeakers === "string" ? JSON.parse(data.pastSpeakers) : data.pastSpeakers || [],
                partners: typeof data.partners === "string" ? JSON.parse(data.partners) : data.partners || [],
                aboutImages: typeof data.aboutImages === "string" ? JSON.parse(data.aboutImages) : data.aboutImages || [],
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
                    advisoryBoard: JSON.stringify(content.advisoryBoard),
                    pastSpeakers: JSON.stringify(content.pastSpeakers),
                    partners: JSON.stringify(content.partners),
                    aboutImages: JSON.stringify(content.aboutImages),
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

    // Advisory Board handlers
    const addAdvisoryMember = () => {
        if (!content) return;
        setContent({
            ...content,
            advisoryBoard: [...content.advisoryBoard, { name: "New Member", role: "Role", company: "Company", initials: "NM" }],
        });
    };

    const removeAdvisoryMember = (index: number) => {
        if (!content) return;
        setContent({
            ...content,
            advisoryBoard: content.advisoryBoard.filter((_, i) => i !== index),
        });
    };

    const updateAdvisoryMember = (index: number, field: keyof AdvisoryMember, value: string) => {
        if (!content) return;
        const newMembers = [...content.advisoryBoard];
        newMembers[index] = { ...newMembers[index], [field]: value };
        setContent({ ...content, advisoryBoard: newMembers });
    };

    // Past Speakers handlers
    const addSpeaker = () => {
        if (!content) return;
        setContent({
            ...content,
            pastSpeakers: [...content.pastSpeakers, { name: "New Speaker", role: "Title / Organization" }],
        });
    };

    const removeSpeaker = (index: number) => {
        if (!content) return;
        setContent({
            ...content,
            pastSpeakers: content.pastSpeakers.filter((_, i) => i !== index),
        });
    };

    const updateSpeaker = (index: number, field: keyof Speaker, value: string) => {
        if (!content) return;
        const newSpeakers = [...content.pastSpeakers];
        newSpeakers[index] = { ...newSpeakers[index], [field]: value };
        setContent({ ...content, pastSpeakers: newSpeakers });
    };

    // Partners handlers
    const addPartner = () => {
        if (!content) return;
        setContent({
            ...content,
            partners: [...content.partners, { name: "New Partner", logo: "/placeholder.png" }],
        });
    };

    const removePartner = (index: number) => {
        if (!content) return;
        setContent({
            ...content,
            partners: content.partners.filter((_, i) => i !== index),
        });
    };

    const updatePartner = (index: number, field: keyof Partner, value: string) => {
        if (!content) return;
        const newPartners = [...content.partners];
        newPartners[index] = { ...newPartners[index], [field]: value };
        setContent({ ...content, partners: newPartners });
    };

    // About Images handlers
    const updateAboutImage = (index: number, field: keyof AboutImage, value: string) => {
        if (!content) return;
        const newImages = [...content.aboutImages];
        newImages[index] = { ...newImages[index], [field]: value };
        setContent({ ...content, aboutImages: newImages });
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

            {/* Advisory Board Section */}
            <Section id="advisory" title="🧠 Advisory Board">
                <div className="space-y-3">
                    {content.advisoryBoard?.map((member, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-[#1a1f36] rounded-lg">
                            <input
                                type="text"
                                value={member.initials}
                                onChange={(e) => updateAdvisoryMember(index, "initials", e.target.value)}
                                className="w-14 px-2 py-1 bg-[#0f1322] border border-white/10 rounded text-white text-sm text-center"
                                placeholder="XX"
                            />
                            <input
                                type="text"
                                value={member.name}
                                onChange={(e) => updateAdvisoryMember(index, "name", e.target.value)}
                                className="flex-1 px-2 py-1 bg-[#0f1322] border border-white/10 rounded text-white text-sm"
                                placeholder="Name"
                            />
                            <input
                                type="text"
                                value={member.role}
                                onChange={(e) => updateAdvisoryMember(index, "role", e.target.value)}
                                className="w-40 px-2 py-1 bg-[#0f1322] border border-white/10 rounded text-white text-sm"
                                placeholder="Role"
                            />
                            <input
                                type="text"
                                value={member.company}
                                onChange={(e) => updateAdvisoryMember(index, "company", e.target.value)}
                                className="w-48 px-2 py-1 bg-[#0f1322] border border-white/10 rounded text-white text-sm"
                                placeholder="Company"
                            />
                            <button
                                onClick={() => removeAdvisoryMember(index)}
                                className="p-1 text-red-400 hover:text-red-300"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={addAdvisoryMember}
                        className="flex items-center gap-2 px-3 py-2 text-amber-400 hover:text-amber-300 text-sm"
                    >
                        <Plus size={16} />
                        Add Board Member
                    </button>
                </div>
            </Section>

            {/* Past Speakers Section */}
            <Section id="speakers" title="🎤 Past Speakers">
                <div className="space-y-3">
                    {content.pastSpeakers?.map((speaker, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-[#1a1f36] rounded-lg">
                            <input
                                type="text"
                                value={speaker.name}
                                onChange={(e) => updateSpeaker(index, "name", e.target.value)}
                                className="flex-1 px-2 py-1 bg-[#0f1322] border border-white/10 rounded text-white text-sm"
                                placeholder="Speaker Name"
                            />
                            <input
                                type="text"
                                value={speaker.role}
                                onChange={(e) => updateSpeaker(index, "role", e.target.value)}
                                className="flex-1 px-2 py-1 bg-[#0f1322] border border-white/10 rounded text-white text-sm"
                                placeholder="Title / Organization"
                            />
                            <button
                                onClick={() => removeSpeaker(index)}
                                className="p-1 text-red-400 hover:text-red-300"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={addSpeaker}
                        className="flex items-center gap-2 px-3 py-2 text-amber-400 hover:text-amber-300 text-sm"
                    >
                        <Plus size={16} />
                        Add Speaker
                    </button>
                </div>
            </Section>

            {/* Partners Section */}
            <Section id="partners" title="🤝 Partners">
                <div className="space-y-3">
                    {content.partners?.map((partner, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-[#1a1f36] rounded-lg">
                            <input
                                type="text"
                                value={partner.name}
                                onChange={(e) => updatePartner(index, "name", e.target.value)}
                                className="flex-1 px-2 py-1 bg-[#0f1322] border border-white/10 rounded text-white text-sm"
                                placeholder="Partner Name"
                            />
                            <input
                                type="text"
                                value={partner.logo}
                                onChange={(e) => updatePartner(index, "logo", e.target.value)}
                                className="flex-1 px-2 py-1 bg-[#0f1322] border border-white/10 rounded text-white text-sm"
                                placeholder="Logo URL (e.g., /logo/partner.avif)"
                            />
                            <button
                                onClick={() => removePartner(index)}
                                className="p-1 text-red-400 hover:text-red-300"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={addPartner}
                        className="flex items-center gap-2 px-3 py-2 text-amber-400 hover:text-amber-300 text-sm"
                    >
                        <Plus size={16} />
                        Add Partner
                    </button>
                </div>
            </Section>

            {/* About Section Images */}
            <Section id="aboutImages" title="📷 About Section Images">
                <div className="space-y-4">
                    <p className="text-xs text-[#878a99] mb-4">These 4 images appear in the About Story section gallery. Enter the image URL path (e.g., /about/image.avif)</p>
                    {content.aboutImages?.map((image, index) => (
                        <div key={index} className="p-3 bg-[#1a1f36] rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-white text-sm font-medium">Image {index + 1}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs text-[#878a99] mb-1">Image URL</label>
                                    <input
                                        type="text"
                                        value={image.src}
                                        onChange={(e) => updateAboutImage(index, "src", e.target.value)}
                                        className="w-full px-2 py-1 bg-[#0f1322] border border-white/10 rounded text-white text-sm"
                                        placeholder="/about/image.avif"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-[#878a99] mb-1">Alt Text</label>
                                    <input
                                        type="text"
                                        value={image.alt}
                                        onChange={(e) => updateAboutImage(index, "alt", e.target.value)}
                                        className="w-full px-2 py-1 bg-[#0f1322] border border-white/10 rounded text-white text-sm"
                                        placeholder="Image description"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

        </div>
    );
}
