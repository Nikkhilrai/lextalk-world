import { Check, ShieldCheck, Star, Trophy } from "lucide-react";

/*
 * Terms for The Medal of Excellence 2027 nomination form. Eligibility,
 * evaluation and review wording is taken from /singapore-2027/awards; the fee
 * and awardee pass match what the LexTalk team confirmed (USD 50 refundable
 * nomination fee, USD 1200 Standard In-Person Awardee Pass incl. taxes).
 */
export function SingaporeTerms() {
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
                <p className="text-sm text-slate-700">Every eligible nomination is independently reviewed by <strong>subject-matter experts</strong> against published criteria, moderated by an awards chair. All fields marked with <span className="text-amber-600 font-bold">*</span> are required.</p>
            </div>

            <div className="max-h-[480px] overflow-y-auto pr-2 -mr-2 space-y-7 [scrollbar-width:thin]">
                <Item n={1} title="Terms and conditions">
                    <ul className="space-y-2 list-disc pl-4 marker:text-amber-500">
                        <li><strong className="text-slate-900">Eligibility period:</strong> the achievement, deployment, leadership or material outcome must have been active between 1 January 2025 and 31 December 2026.</li>
                        <li><strong className="text-slate-900">Geography:</strong> Singapore-based organisations and individuals, plus APAC entrants with a material Singapore or regional deployment, client base, team, leadership remit or impact.</li>
                        <li><strong className="text-slate-900">Category fit:</strong> the entry must address one category&apos;s defined criteria and cannot rely on future intent or unimplemented ideas.</li>
                        <li>Self-nominations and third-party nominations are both welcome. Nominating a colleague or client requires their knowledge and consent.</li>
                        <li>Nominees consent to LexTalk verifying the stated facts and to the use of approved recognition material.</li>
                        <li>Submitting a nomination does not guarantee recognition. Categories may be withheld where the evaluation standard is not met.</li>
                        <li>If the nominee is not recognised, the nomination fee of <strong className="text-slate-900">USD 50</strong> is fully refundable.</li>
                        <li>Recognised awardees should attend in Singapore or nominate a senior representative, and will need to book the Awardee pass to attend the conference and receive their recognition.</li>
                        <li>LexTalk may decline, suspend or withdraw recognition where materially misleading information or serious integrity concerns emerge. The decision of the awards panel is final.</li>
                        <li>LexTalk World is brought to you by Canada-based firm ClickAway Creators (a division of CAC Media &amp; Events) and managed by MantranexVista, which reserves the right to make any changes to the event, as it deems necessary.</li>
                    </ul>
                </Item>
                <Item n={2} title="Evaluation">
                    <p className="mb-3">Each eligible submission is scored out of 100:</p>
                    <div className="grid sm:grid-cols-2 gap-2.5">
                        {[
                            [30, "Impact and outcomes", "Measurable business, customer, risk, legal or market result."],
                            [25, "Innovation and implementation", "Originality plus real deployment, adoption and operational viability."],
                            [25, "Leadership, governance and integrity", "Accountability, responsible practice, controls, influence and ethics."],
                            [20, "Relevance and future contribution", "Importance to AI, legal innovation, risk or digital trust in Singapore and APAC."],
                        ].map(([pts, title, text]) => (
                            <div key={title as string} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                                <p className="text-sm font-semibold text-slate-900"><span className="text-amber-600">{pts} pts</span> · {title}</p>
                                <p className="text-[13px] mt-1">{text}</p>
                            </div>
                        ))}
                    </div>
                </Item>
                <Item n={3} title="Review and confidentiality">
                    Reviewers declare conflicts and do not assess connected organisations or individuals. Each submission is scored independently, with a third reviewer used where scores diverge materially. Reviewers receive submissions only for assessment and treat all material as confidential; publication of any details requires nominee approval.
                </Item>
                <Item n={4} title="Outcome">
                    <div className="grid sm:grid-cols-2 gap-3 mt-1">
                        <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200">
                            <p className="font-semibold text-emerald-800 flex items-center gap-1.5 mb-1"><Trophy className="w-4 h-4" /> Recognised</p>
                            <p className="text-sm">You are notified with confirmation details and announced at the ceremony on 4 February 2027, and we sign you up for the Awardee pass.</p>
                            <p className="text-sm mt-2 text-slate-800">Singapore Conference — Standard In-Person Awardee Pass: <strong>USD 1200</strong> (inclusive of taxes)</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                            <p className="font-semibold text-slate-800 mb-1">Not recognised</p>
                            <p className="text-sm">You receive a concise result note and a full refund of the nomination fee (USD 50).</p>
                        </div>
                    </div>
                </Item>

                <div className="rounded-2xl border border-slate-200 p-5">
                    <p className="font-semibold text-slate-900 flex items-center gap-2 mb-4"><Star className="w-4 h-4 text-amber-500" /> What recognition includes</p>
                    <ul className="grid md:grid-cols-2 gap-3 text-[13px] text-slate-600">
                        {[
                            "Recognition during the closing ceremony of LexTalk World Singapore before a senior executive audience",
                            "A Medal of Excellence recognition asset and citation approved for use in your own communications",
                            "Inclusion in official event communications, the awards listing and selected post-event features",
                            "Conversations with peers, partners, clients and the wider APAC legal, risk and technology ecosystem",
                        ].map(i => (
                            <li key={i} className="flex gap-2"><Check className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" strokeWidth={3} />{i}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
