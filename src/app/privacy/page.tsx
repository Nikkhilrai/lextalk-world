import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mail } from "lucide-react";

export const metadata = {
    title: "Privacy Policy | LexTalk World",
    description: "LexTalk World Privacy Policy - How we handle and protect your personal information.",
};

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-slate-950">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-16 bg-gradient-to-b from-slate-900 to-slate-950">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                            Privacy Policy
                        </h1>
                        <p className="text-lg text-slate-400">
                            Keeping Your Information Safe
                        </p>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="prose prose-invert prose-amber max-w-none">

                            {/* Introduction */}
                            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 mb-8">
                                <p className="text-slate-300 text-lg leading-relaxed">
                                    Welcome to LexTalk World! We believe in keeping things transparent—especially when it comes to your personal information. This policy is designed to be easy to understand, explaining how we handle the data you share with us when you use our website, <a href="https://www.lextalkworld.in" className="text-amber-500 hover:text-amber-400">www.lextalkworld.in</a>.
                                </p>
                            </div>

                            {/* Site Content Note */}
                            <div className="mb-12">
                                <h2 className="text-2xl font-serif font-bold text-white mb-4">
                                    A Note on Site Content and Updates
                                </h2>
                                <p className="text-slate-400 mb-4">
                                    LexTalk World APAC & ME strives to keep the information on this site accurate and timely. However, please be aware of two important points:
                                </p>
                                <ul className="space-y-4 text-slate-400">
                                    <li className="flex items-start gap-3">
                                        <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                                        <div>
                                            <strong className="text-white">Proprietary Content:</strong> Our website contains materials (like logos, text, and images) that are owned by us or our partners. These are protected by copyright and other proprietary notices, and by using the site, you agree to respect those rights and follow the terms that govern their use.
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                                        <div>
                                            <strong className="text-white">Accuracy and Changes:</strong> While we try our best, sometimes the content on our website might have small technical errors or typos. More importantly, we reserve the right, in our sole discretion and without notice, to update, change, or modify this Privacy Policy and other terms at any time by posting the revised version here. Therefore, we encourage you to check back occasionally to stay informed.
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Section 1 */}
                            <div className="mb-12">
                                <h2 className="text-2xl font-serif font-bold text-white mb-4">
                                    1. The Information We Collect (And Why)
                                </h2>
                                <p className="text-slate-400 mb-6">
                                    When you interact with LexTalk World APAC & ME, you might share some details with us. We only collect information necessary to provide you with the best experience, whether you are nominating for an award, registering for an event, or just browsing.
                                </p>

                                <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6 mb-6">
                                    <h3 className="text-lg font-semibold text-amber-500 mb-3">Details You Give Us Directly</h3>
                                    <p className="text-slate-400 mb-4">This is the information you actively provide when you:</p>
                                    <ul className="space-y-2 text-slate-400">
                                        <li className="flex items-start gap-2">
                                            <span className="text-amber-500">•</span>
                                            <span><strong className="text-white">Register for an event or service:</strong> This includes your name, email address, phone number, company/organization name, and professional designation.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-amber-500">•</span>
                                            <span><strong className="text-white">Nominate for an Award:</strong> This includes similar contact and professional details, plus any specific information required for the nomination process.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-amber-500">•</span>
                                            <span><strong className="text-white">Contact Us:</strong> If you send us an email or use a contact form, we will keep a record of that correspondence.</span>
                                        </li>
                                    </ul>
                                    <p className="text-slate-500 mt-4 text-sm italic">
                                        Purpose: We use this to process your registrations, manage your nominations, send you essential service updates, and respond to your inquiries.
                                    </p>
                                </div>

                                <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6">
                                    <h3 className="text-lg font-semibold text-amber-500 mb-3">Automatic Information</h3>
                                    <p className="text-slate-400 mb-4">
                                        When you browse our site, we automatically collect basic data about your visit. This may include your IP address, the type of device and browser you are using, and which pages you visit on LexTalk World APAC & ME.
                                    </p>
                                    <p className="text-slate-500 text-sm italic">
                                        Purpose: This helps us understand how our website is performing, what content is popular, and how we can improve the site's functionality. We often use Cookies (small text files stored on your device) to collect this—you can manage or disable cookies through your browser settings.
                                    </p>
                                </div>
                            </div>

                            {/* Section 2 */}
                            <div className="mb-12">
                                <h2 className="text-2xl font-serif font-bold text-white mb-4">
                                    2. How We Use Your Information
                                </h2>
                                <p className="text-slate-400 mb-4">
                                    We promise to use your information responsibly and for legitimate reasons only. Specifically, we use it to:
                                </p>
                                <ul className="space-y-3 text-slate-400">
                                    <li className="flex items-start gap-3">
                                        <span className="w-6 h-6 bg-amber-500/20 text-amber-500 rounded-full flex items-center justify-center text-sm flex-shrink-0">✓</span>
                                        <span><strong className="text-white">Operate and Improve Our Services:</strong> To process your requests (like event attendance or award nominations) and continually enhance your experience on our website.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-6 h-6 bg-amber-500/20 text-amber-500 rounded-full flex items-center justify-center text-sm flex-shrink-0">✓</span>
                                        <span><strong className="text-white">Communicate with You:</strong> To send you confirmations, updates about events you've registered for, and important announcements.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-6 h-6 bg-amber-500/20 text-amber-500 rounded-full flex items-center justify-center text-sm flex-shrink-0">✓</span>
                                        <span><strong className="text-white">Provide Promotional Content (Only with your Consent):</strong> If you opt-in, we might send you newsletters or marketing materials about future LexTalk World APAC & ME events or related services from our parent company, ClickAway Creators LLP.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-6 h-6 bg-amber-500/20 text-amber-500 rounded-full flex items-center justify-center text-sm flex-shrink-0">✓</span>
                                        <span><strong className="text-white">Ensure Security:</strong> To protect our website and users from fraud and unauthorized access.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Section 3 */}
                            <div className="mb-12">
                                <h2 className="text-2xl font-serif font-bold text-white mb-4">
                                    3. Sharing Your Data (The Limited Exceptions)
                                </h2>
                                <p className="text-slate-400 mb-6">
                                    We do not sell, trade, or rent your personal information to third parties for their independent marketing purposes. We keep your data within the LexTalk World APAC & ME family unless one of the following exceptions applies:
                                </p>
                                <div className="grid gap-4">
                                    <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-5">
                                        <h4 className="text-white font-semibold mb-2">Service Providers</h4>
                                        <p className="text-slate-400 text-sm">We may share information with trusted third parties who help us run our business (e.g., payment processors, email communication platforms). These partners are required to keep your information confidential and use it only to perform their specific services for us.</p>
                                    </div>
                                    <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-5">
                                        <h4 className="text-white font-semibold mb-2">Legal Necessity</h4>
                                        <p className="text-slate-400 text-sm">If required by law, court order, or government regulation, we may disclose your information to comply with legal processes.</p>
                                    </div>
                                    <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-5">
                                        <h4 className="text-white font-semibold mb-2">Business Transfers</h4>
                                        <p className="text-slate-400 text-sm">In the event of a merger, acquisition, or sale of assets, your data may be transferred as part of that transaction. We will notify you if this happens.</p>
                                    </div>
                                    <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-5">
                                        <h4 className="text-white font-semibold mb-2">User Submissions</h4>
                                        <p className="text-slate-400 text-sm">As noted in our Terms, any content you choose to post or submit to the website (like comments, testimonials, or public profiles) is owned by us and may be used publicly. Please be mindful of what you share in public areas.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Section 4 */}
                            <div className="mb-12">
                                <h2 className="text-2xl font-serif font-bold text-white mb-4">
                                    4. Links to Other Websites
                                </h2>
                                <p className="text-slate-400">
                                    LexTalk World APAC & ME may contain links to other websites that are not operated by us. Once you click on a link and leave our site, please remember that we have no control over the content, security, or privacy practices of that external site. We strongly recommend reading the Privacy Policy of every site you visit.
                                </p>
                            </div>

                            {/* Section 5 */}
                            <div className="mb-12">
                                <h2 className="text-2xl font-serif font-bold text-white mb-4">
                                    5. Your Rights & Choices
                                </h2>
                                <p className="text-slate-400 mb-4">You have control over your data.</p>
                                <ul className="space-y-3 text-slate-400">
                                    <li className="flex items-start gap-3">
                                        <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                                        <span><strong className="text-white">Opting Out:</strong> If you no longer wish to receive marketing communications from us, you can unsubscribe at any time using the link provided in the email or by contacting us directly.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                                        <span><strong className="text-white">Access/Correction:</strong> You can contact us to inquire about the personal data we hold about you and request that we correct any inaccuracies.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Section 6 */}
                            <div className="mb-12">
                                <h2 className="text-2xl font-serif font-bold text-white mb-4">
                                    6. Consequences of Breaking the Agreement
                                </h2>
                                <p className="text-slate-400">
                                    If any of the rules in this agreement are broken, we reserve the right to immediately cancel your permission to download anything from our websites. This immediate cancellation is just one action we can take; it does not stop us from pursuing all other legal actions, remedies, or compensation available to us under the relevant Indian laws, such as the Indian Contract Act, 1872 and the Copyright Act, 1957.
                                </p>
                            </div>

                            {/* Contact Section */}
                            <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-2xl p-8">
                                <h2 className="text-2xl font-serif font-bold text-white mb-4">
                                    Get In Touch
                                </h2>
                                <p className="text-slate-400 mb-6">
                                    If you have any questions or concerns about this Privacy Policy or how we handle your data, please do not hesitate to reach out to us at:
                                </p>
                                <a
                                    href="mailto:abhishek@clickawaycreators.com"
                                    className="inline-flex items-center gap-3 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-amber-500/20"
                                >
                                    <Mail className="w-5 h-5" />
                                    abhishek@clickawaycreators.com
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
