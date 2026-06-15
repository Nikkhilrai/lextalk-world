import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Scale } from "lucide-react";

export const metadata = {
    title: "Terms & Conditions | LexTalk World",
    description: "Terms and conditions governing the use of LexTalk World Services in Middle East & APAC Region.",
};

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Header */}
            <section className="bg-slate-900 border-b border-slate-800 pt-32 pb-12 md:pt-40 md:pb-16 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500 rounded-full blur-[80px]" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 text-amber-500 mb-4 font-semibold uppercase tracking-wider text-sm">
                            <Scale size={16} />
                            <span>Legal Documentation</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-sans font-bold text-white mb-6">
                            Terms & Conditions
                        </h1>
                        <p className="text-lg text-slate-400">
                            LexTalk World — Middle East & APAC Region
                        </p>
                        <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-400">
                            <p>Effective Date: <span className="font-semibold text-slate-300">15th December 2025</span></p>
                            <span className="hidden sm:inline opacity-50">•</span>
                            <p>Version: <span className="font-semibold text-slate-300">1.0</span></p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-8 md:p-12 font-sans">
                        <div className="prose prose-slate prose-lg max-w-none hover:prose-a:text-amber-600 prose-headings:font-sans">

                            <h3>1. Overview</h3>
                            <p>
                                These Terms & Conditions (“Agreement”) form a binding legal contract between you — as a visitor,
                                participant, sponsor, speaker, award nominee, delegate, or other user (“you”, “your”, “Participant”)
                                — and LexTalk World events and activities operating in the Middle East and Asia-Pacific (APAC)
                                region, including but not limited to conferences, workshops, content sharing platforms,
                                collaborations, and associated services (collectively “Services”).
                            </p>
                            <p>
                                By accessing or participating in any LexTalk World Services in these regions, whether online, in-person, or hybrid, you accept and agree to comply with all terms in this Agreement and all applicable
                                local, national, and international laws. If you do not agree to these Terms, do not use or access these
                                Services.
                            </p>
                            <p>
                                This Website may contain other proprietary notices and copyright information, the terms of which
                                must be observed and followed. Information on this Website may contain technical inaccuracies or
                                typographical errors.
                            </p>

                            <h3>2. Applicability and Acceptance</h3>
                            <ol>
                                <li>
                                    This Agreement applies to all forms of interactions and associations with LexTalk World in the
                                    Middle East and APAC — including attendance, speaking engagements, sponsorships, award
                                    nominations, exhibitor participation, content posting, networking, and digital platform
                                    access.
                                </li>
                                <li>
                                    By engaging with any LexTalk World Services, you acknowledge that you have read,
                                    understood, and agree to be legally bound by these Terms.
                                </li>
                                <li>
                                    These Terms apply in addition to any event-specific rules, policies, or codes of conduct that
                                    may be issued for specific conferences or programs.
                                </li>
                            </ol>

                            <h3>3. Changes to Terms</h3>
                            <p>
                                LexTalk World reserves the right to update, modify, suspend, or terminate this Agreement (in whole
                                or in part) at any time and for any reason without prior notice. The latest version will be posted at an
                                accessible location, and your continued use will signify acceptance of the updated Terms.
                            </p>

                            <h3>4. Intellectual Property</h3>
                            <ol>
                                <li>
                                    <strong>Ownership.</strong> All content made available through LexTalk World — including but not limited to
                                    text, images, graphics, logos, trademarks, event materials, recordings, speaker materials,
                                    promotional material, and digital content — is the intellectual property of LexTalk World, its
                                    affiliates, or its licensors.
                                </li>
                                <li>
                                    <strong>Usage.</strong> You may view and download material for personal or internal use only, provided you
                                    retain all copyright and proprietary notices.
                                </li>
                                <li>
                                    <strong>Restrictions.</strong> Except with express written permission, no material may be copied,
                                    reproduced, republished, distributed, displayed, transmitted, altered, or used commercially
                                    in any form or by any means.
                                </li>
                            </ol>

                            <h3>5. Trademarks</h3>
                            <ol>
                                <li>
                                    LexTalk World, associated logos and taglines, and other marks are registered and
                                    unregistered trademarks of their respective owners.
                                </li>
                                <li>
                                    Your use of any LexTalk World trademarks without prior written authorization is strictly
                                    prohibited.
                                </li>
                            </ol>

                            <h3>6. External Links</h3>
                            <p>
                                Some LexTalk World Services may contain links to third-party websites. LexTalk World does not
                                endorse or have control over these sites’ content, practices, or privacy methods, and shall not be
                                liable for any loss or damage arising from their use.
                            </p>

                            <h3>7. User Content and Submissions</h3>
                            <ol>
                                <li>
                                    <strong>Ownership and License.</strong> Any information, messages, materials, or content you submit
                                    (“Submissions”) via LexTalk World Services — such as comments, questions, ideas, bios,
                                    photos, videos, or documents — become LexTalk World’s property and may be used,
                                    modified, published, distributed, or otherwise processed for any purpose in any medium
                                    without compensation to you.
                                </li>
                                <li>
                                    You grant LexTalk World a worldwide, perpetual, royalty-free, non-exclusive, transferrable,
                                    sublicensable license to use your Submissions.
                                </li>
                                <li>
                                    You waive any moral rights or claims related to how LexTalk World uses your Submission.
                                </li>
                            </ol>

                            <h3>8. Participation and Conduct</h3>
                            <ol>
                                <li>
                                    Participants agree to behave professionally and respectfully in all interactions, whether in
                                    person or online.
                                </li>
                                <li>
                                    LexTalk World may in its discretion refuse access, terminate participation privileges, or take
                                    other actions if your conduct is unlawful, abusive, offensive or in violation of these Terms.
                                </li>
                                <li>
                                    You are responsible for your own equipment, internet access, travel arrangements, visas,
                                    accommodation, and any other costs unless otherwise expressly agreed.
                                </li>
                            </ol>

                            <h3>9. Fees, Registration, Cancellation & Refunds</h3>
                            <ol>
                                <li>
                                    Event registration, nomination, sponsorship, or participation fees must be paid at the
                                    published rates and in the manner specified.
                                </li>
                                <li>
                                    Refunds and cancellations are subject to the policies communicated at the time of
                                    registration — typically including administrative charges and time-based refund tiers.
                                </li>
                                <li>
                                    In case LexTalk World cancels an event, full refunds will be processed. No refunds are
                                    typically provided for postponements, travel issues, visa refusals, or personal circumstances
                                    unless otherwise stated.
                                </li>
                            </ol>

                            <h3>10. Liability and Disclaimers</h3>
                            <ol>
                                <li>
                                    LexTalk World makes no representations or warranties regarding the accuracy, completeness,
                                    reliability or suitability of materials or information provided through its Services.
                                </li>
                                <li>
                                    You agree that your use of the Services is at your own risk. LexTalk World and its affiliates,
                                    directors, officers, employees, agents, partners, sponsors and licensors are not liable for
                                    damages (direct, indirect, incidental, consequential or punitive), including loss of data, loss of
                                    profits, or personal injury arising from your participation.
                                </li>
                            </ol>

                            <h3>11. Governing Law and Jurisdiction</h3>
                            <p>
                                This Agreement and any disputes arising from it shall be governed by and interpreted in accordance
                                with the laws of the appropriate jurisdiction where LexTalk World is legally incorporated or operates,
                                subject to compulsory local laws in India, without regard to conflicts-of-law principles.
                            </p>

                            <h3>12. Severability</h3>
                            <p>
                                If any provision of this Agreement is held unenforceable or invalid under applicable law, that
                                provision will be struck, and the remaining provisions will remain in full force and effect.
                            </p>

                            <h3>13. Contact and Notices</h3>
                            <p>
                                For questions or notices concerning these Terms, please contact:
                            </p>
                            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 not-prose mt-4">
                                <p className="font-bold text-slate-900 mb-2">LexTalk World — Middle East & APAC Support</p>
                                <div className="space-y-2 text-sm text-slate-700">
                                    <p><span className="font-semibold w-20 inline-block">Email:</span> <a href="mailto:abhishek@clickawaycreators.com" className="text-amber-600 hover:underline">abhishek@clickawaycreators.com</a></p>
                                    <p><span className="font-semibold w-20 inline-block">Phone:</span> <a href="tel:+919811885302" className="hover:text-amber-600 transition-colors">+91 981 188 5302</a></p>
                                    <p className="flex items-start gap-1">
                                        <span className="font-semibold w-20 inline-block shrink-0">Address:</span>
                                        <span>101/48, EMAAR Palm Hills, Sector 77, Gurgaon 122004, Haryana, India</span>
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
