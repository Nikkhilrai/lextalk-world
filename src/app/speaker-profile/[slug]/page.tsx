import Image from "next/image";
import { notFound } from "next/navigation";
import { speakers } from "@/app/dubai-2026/dubai-speakers-data";
import { slugifySpeakerName } from "@/lib/speaker-slug";

export const dynamic = "force-dynamic";

export default async function SpeakerProfilePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const speaker = speakers.find((s) => slugifySpeakerName(s.name) === slug);

    if (!speaker) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#F7F6F3] flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] ring-1 ring-slate-200 overflow-hidden">
                <div className="bg-slate-900 px-6 py-5 text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-400">
                        LexTalk World · Dubai 2026
                    </p>
                    <p className="text-white text-sm font-semibold mt-1">Conference Speaker</p>
                </div>

                <div className="p-6 flex flex-col items-center text-center">
                    {speaker.image && (
                        <div className="relative w-28 h-28 rounded-full overflow-hidden ring-4 ring-amber-100 shadow-md mb-4">
                            <Image
                                src={speaker.image}
                                alt={speaker.name}
                                fill
                                sizes="112px"
                                className="object-cover object-center"
                            />
                        </div>
                    )}
                    <h1 className="text-xl font-serif font-bold text-slate-900 leading-snug">
                        {speaker.name}
                    </h1>
                    {speaker.title && (
                        <p className="mt-1.5 text-[12px] font-semibold text-slate-500 uppercase tracking-[0.1em] leading-relaxed whitespace-pre-line">
                            {speaker.title}
                        </p>
                    )}

                    {speaker.bio && (
                        <div className="mt-5 pt-5 border-t border-slate-100 text-left">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mb-2">
                                Biography
                            </p>
                            <p className="text-[13px] text-slate-600 leading-relaxed whitespace-pre-line max-h-72 overflow-y-auto">
                                {speaker.bio}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
