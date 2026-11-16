import { Check, ShieldCheck, Star, Trophy } from "lucide-react";

/* Terms text from the Zoho "Legal Honor Global Awards - 2026 Mumbai" form. */
export function MumbaiTerms() {
    const Item = ({ n, title, children }: { n: number; title: string; children: React.ReactNode }) => (
        <div className="relative pl-12">
            <span className="absolute left-0 top-0 w-8 h-8 rounded-full bg-slate-900 text-amber-400 text-sm font-bold flex items-center justify-center">{n}</span>
            <h3 className="font-semibold text-slate-900 pt-1">{title}</h3>
            <div className="mt-2 text-[14.5px] text-slate-600 leading-relaxed">{children}</div>
        </div>
    );
    return (
        <div className="space-y-6">
            <div className="flex gap-3 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70">
                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">All nominations undergo an independent screening and evaluation process by the <strong>Legal Honor Global Awards Jury Panel</strong>. All fields marked with <span className="text-amber-600 font-bold">*</span> are required.</p>
            </div>

            <div className="max-h-[480px] overflow-y-auto pr-2 -mr-2 space-y-7 [scrollbar-width:thin]">
                <Item n={1} title="Terms and conditions">
                    <ul className="space-y-2 list-disc pl-4 marker:text-amber-500">
                        <li>All awardees are required to be physically or virtually present at the event to receive the Award. In case the Awardee is not able to attend, they can send a person on their behalf.</li>
                        <li>Filling in the nomination form only does not ensure that you will be selected for the Award.</li>
                        <li>The Awardees will be selected on the basis of parameters set by our Awards Committee and will be intimated accordingly.</li>
                        <li>In case you do not win the award nomination, the nomination fee <strong className="text-slate-900">USD 50</strong> is completely refundable.</li>
                        <li>All Awardees will need to book the Awardee pass to attend the conference and receive their award.</li>
                        <li>The decision of the Awards Committee will be final and binding.</li>
                        <li>LexTalk World and Legal Honor are brought to you by Canada-based firm ClickAway Creators (a division of CAC Media &amp; Events) and managed by MantranexVista, which reserves the right to make any changes to the event, as it deems necessary.</li>
                    </ul>
                </Item>
                <Item n={2} title="Evaluation">
                    Based on your answers and our own research, our Awards Committee rates you on different parameters such as the overall reach, impact on the legal industry, knowledge and market demand, innovative ideas and suggestions, futuristic spirit and approach, etc.
                </Item>
                <Item n={3} title="Scorecard">
                    Once the Awards Committee completes the evaluation, they will share a detailed scorecard with each nominee via email. They give you a score out of 100 in each of your answers; the cut-off to qualify is <strong className="text-slate-900">80 points out of 100</strong>.
                </Item>
                <Item n={4} title="Outcome">
                    <div className="grid sm:grid-cols-2 gap-3 mt-1">
                        <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200">
                            <p className="font-semibold text-emerald-800 flex items-center gap-1.5 mb-1"><Trophy className="w-4 h-4" /> Winner</p>
                            <p className="text-sm">We will confirm you as a winner at the LexTalk World conference and sign you up for the Awardee pass.</p>
                            <p className="text-sm mt-2 text-slate-800">India Conference — Standard In-Person Awardee Pass: <strong>USD 1000</strong> (inclusive of taxes)</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                            <p className="font-semibold text-slate-800 mb-1">Fail to make the cut</p>
                            <p className="text-sm">We will issue a full refund of the nomination fee (USD 50).</p>
                        </div>
                    </div>
                </Item>
                <Item n={5} title="The event">
                    You attend the event, accept the award, and are part of great sessions while networking with your peers. As an awardee you are entitled to all of the benefits below in the Standard Awardee Pass.
                </Item>

                <div className="rounded-2xl border border-slate-200 p-5">
                    <p className="font-semibold text-slate-900 flex items-center gap-2 mb-4"><Star className="w-4 h-4 text-amber-500" /> Standard Awardee Pass benefits</p>
                    <div className="grid md:grid-cols-3 gap-5 text-[13px] text-slate-600">
                        {[
                            ["Pre-Conference", ["Opportunity to write an article, promoted on social media and website", "Article in the upcoming editions of the Jurisprudence e-Magazine published by Global Lawyers Association"]],
                            ["During Conference", ["Announcement of Awardees for each category", "Full event participation with networking opportunities", "Awardees listing in the event show guide", "Mic time on the stage", "Award plaque from the Guest of Honor"]],
                            ["Post-Conference", ["Social media announcement for Awardees", "Dedicated section in the Awardees List on our website", "E-certificate and e-badge of Honor", "PR announcements in 200+ international digital publications and news sites"]],
                        ].map(([title, items]) => (
                            <div key={title as string}>
                                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-amber-700 mb-2">{title as string}</p>
                                <ul className="space-y-1.5">
                                    {(items as string[]).map(i => (
                                        <li key={i} className="flex gap-2"><Check className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" strokeWidth={3} />{i}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
