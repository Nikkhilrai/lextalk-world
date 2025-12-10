import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import { Trophy, Award as AwardIcon, Sparkles, Star } from "lucide-react";

// Awardee Data - CORRECTED mapping based on HTML analysis
// Images appear in REVERSE order in HTML, so mapping from bottom sections first
const AWARDEES_2024 = {
    inspiring: [
        { name: "Bhanu Rasputra", role: "Solicitor & Property Law Expert", company: "Mumbai", image: "https://static.wixstatic.com/media/a3d965_9b56e1f2a68444c39afd2d576382b3d7~mv2.png/v1/fill/w_400,h_600,al_c,q_85/a3d965_9b56e1f2a68444c39afd2d576382b3d7~mv2.png" },
        { name: "Rajeevan Nair", role: "Group General Counsel & Company Secretary", company: "Malabar Gold & Diamonds", image: "https://static.wixstatic.com/media/a3d965_3d8266bb32264f7b8523a4dc2144017c~mv2.png/v1/fill/w_400,h_600,al_c,q_85/a3d965_3d8266bb32264f7b8523a4dc2144017c~mv2.png" },
        { name: "Shruti Desai", role: "Founder", company: "M/s Shruti Desai & Co.", image: "https://static.wixstatic.com/media/a3d965_d093c7f795994a79b5bd61f02cae5576~mv2.jpg/v1/fill/w_400,h_600,al_c,q_80/a3d965_d093c7f795994a79b5bd61f02cae5576~mv2.jpg" },
        { name: "Subramaniam Yadav Daraboina", role: "Senior Advocate", company: "Supreme Court of India", image: "https://static.wixstatic.com/media/a3d965_6bf537ae9d1f45e7b1f2cd31fa059408~mv2.png/v1/fill/w_400,h_600,al_c,q_85/a3d965_6bf537ae9d1f45e7b1f2cd31fa059408~mv2.png" },
        { name: "Sumit Attri", role: "Partner & Advocate on Record", company: "Cyril Amarchand Mangaldas", image: "https://static.wixstatic.com/media/a3d965_0d121724fc1940afb3ad26c85c0c95e8~mv2.png/v1/fill/w_400,h_600,al_c,q_85/a3d965_0d121724fc1940afb3ad26c85c0c95e8~mv2.png" },
        { name: "Dr. Yehia El Husseiny", role: "Senior Adviser", company: "EBRD", image: "https://static.wixstatic.com/media/a3d965_cef7b041b71442a9b8a04174a48bd7bc~mv2.jpg/v1/fill/w_400,h_600,al_c,q_80/a3d965_cef7b041b71442a9b8a04174a48bd7bc~mv2.jpg" },
        { name: "NKB Legal", role: "Law Firm", company: "India", image: "https://static.wixstatic.com/media/a3d965_fb410c78a702489dbccc903a809973b9~mv2.png/v1/fill/w_400,h_600,al_c,q_85/a3d965_fb410c78a702489dbccc903a809973b9~mv2.png" },
        { name: "Maynard Menon Govender Inc.", role: "Law Firm", company: "South Africa", image: "https://static.wixstatic.com/media/a3d965_359e3df0d0514debb43f1f6574f1ba7f~mv2.png/v1/fill/w_400,h_600,al_c,q_85/a3d965_359e3df0d0514debb43f1f6574f1ba7f~mv2.png" },
        { name: "Rakesh Pandey", role: "Chairman", company: "District Consumer Commission", image: "https://static.wixstatic.com/media/a3d965_15fc99a9800942219e19a908c35d7f95~mv2.jpg/v1/fill/w_400,h_600,al_c,q_80/a3d965_15fc99a9800942219e19a908c35d7f95~mv2.jpg" },
    ],
    leading: [
        { name: "Kunal Antani", role: "AVP - Legal", company: "Man Industries (India) Limited", image: "https://static.wixstatic.com/media/a3d965_4e5827eae33849f4b5fd7a9689629894~mv2.png/v1/fill/w_400,h_600,al_c,q_85/a3d965_4e5827eae33849f4b5fd7a9689629894~mv2.png" },
        { name: "Sezin Kargili", role: "Legal & Compliance Counsel", company: "Istanbul", image: "https://static.wixstatic.com/media/a3d965_8e87483b45dd4fa4bb51267916cffd35~mv2.png/v1/fill/w_400,h_600,al_c,q_85/a3d965_8e87483b45dd4fa4bb51267916cffd35~mv2.png" },
        { name: "Kajori Deb", role: "Founder", company: "Klexcasa", image: "https://static.wixstatic.com/media/a3d965_78a831e0557c48d5bc417c211c490170~mv2.png/v1/fill/w_400,h_600,al_c,q_85/a3d965_78a831e0557c48d5bc417c211c490170~mv2.png" },
        { name: "Rahul Anil Khanna", role: "Senior Manager (Legal)", company: "Godfrey Philips India Limited", image: "https://static.wixstatic.com/media/a3d965_2cd87c92d4a048e3a3968e20c08760b0~mv2.png/v1/fill/w_400,h_600,al_c,q_85/a3d965_2cd87c92d4a048e3a3968e20c08760b0~mv2.png" },
        { name: "Maristela Oliveira", role: "CEO", company: "MO Brazilian Advisory", image: "https://static.wixstatic.com/media/a3d965_6d3656f97d9f4b5b8c1141343e2043b5~mv2.png/v1/fill/w_400,h_600,al_c,q_85/a3d965_6d3656f97d9f4b5b8c1141343e2043b5~mv2.png" },
        { name: "Nuha Al Abri", role: "Senior Investment Auditor", company: "Oman Investment Authority", image: "https://static.wixstatic.com/media/a3d965_0b92094419224ece8b11fb7c7f431a98~mv2.png/v1/fill/w_400,h_600,al_c,q_85/a3d965_0b92094419224ece8b11fb7c7f431a98~mv2.png" },
        { name: "Manish Shukla", role: "Founder", company: "MSA Law Chambers", image: "https://static.wixstatic.com/media/a3d965_f5d5ad2dbbf34ce3a46fae9ef50b05cb~mv2.png/v1/fill/w_400,h_600,al_c,q_85/a3d965_f5d5ad2dbbf34ce3a46fae9ef50b05cb~mv2.png" },
        { name: "Shekhar Raj Sharma", role: "Deputy Advocate General", company: "Haryana", image: "https://static.wixstatic.com/media/a3d965_af388f9d7e2046ebb3c5bb04538109a8~mv2.jpg/v1/fill/w_400,h_600,al_c,q_80/a3d965_af388f9d7e2046ebb3c5bb04538109a8~mv2.jpg" },
        { name: "Avantika Parthe", role: "Legal Head", company: "Mumbai", image: "https://static.wixstatic.com/media/a3d965_cdeca5ecd9d04ad1ad64d1ac72066473~mv2.jpg/v1/fill/w_400,h_600,al_c,q_80/a3d965_cdeca5ecd9d04ad1ad64d1ac72066473~mv2.jpg" },
        { name: "Charles Hearn", role: "Group General Counsel", company: "The Premium Group Limited", image: "https://static.wixstatic.com/media/a3d965_f0693fbdd2b041ec910fa56bee0d5840~mv2.png/v1/fill/w_400,h_600,al_c,q_85/a3d965_f0693fbdd2b041ec910fa56bee0d5840~mv2.png" },
        { name: "Varun Chablani", role: "Senior Associate", company: "emltc, Dubai", image: "https://static.wixstatic.com/media/a3d965_ee332addde324bf39cdd48aacc1c758a~mv2.jpg/v1/fill/w_400,h_600,al_c,q_80/a3d965_ee332addde324bf39cdd48aacc1c758a~mv2.jpg" },
        { name: "Unnati Divecha Patel", role: "Group General Counsel", company: "Parksons Packaging Limited", image: "https://static.wixstatic.com/media/a3d965_64678770236f40baacec68e11090b8e4~mv2.png/v1/fill/w_400,h_600,al_c,q_85/a3d965_64678770236f40baacec68e11090b8e4~mv2.png" },
        { name: "Babita Kumari", role: "Legal Counsel", company: "Delhi", image: "https://static.wixstatic.com/media/a3d965_f27f0ae5cf154defa3366f7a9b86081d~mv2.png/v1/fill/w_400,h_600,al_c,q_85/a3d965_f27f0ae5cf154defa3366f7a9b86081d~mv2.png" },
        { name: "Shivandini Liyanage", role: "Head of Legal", company: "Hemas Holdings PLC", image: "https://static.wixstatic.com/media/a3d965_f68813ec84fe4a31b92219bdf993222c~mv2.jpg/v1/fill/w_400,h_600,al_c,q_80/a3d965_f68813ec84fe4a31b92219bdf993222c~mv2.jpg" },
        { name: "Kishondra Kumar", role: "In-house Legal Counsel", company: "Malaysia", image: "https://static.wixstatic.com/media/a3d965_0099777c5bbc453c82d3a5ca052f2fa9~mv2.png/v1/fill/w_400,h_600,al_c,q_85/a3d965_0099777c5bbc453c82d3a5ca052f2fa9~mv2.png" },
        { name: "Daksh Kumar", role: "Partner (IPR Practice)", company: "Kochhar & Co.", image: "https://static.wixstatic.com/media/a3d965_22ac7f21d0d7463987d2f6e880e62e34~mv2.png/v1/fill/w_400,h_600,al_c,q_85/a3d965_22ac7f21d0d7463987d2f6e880e62e34~mv2.png" },
        { name: "Hemant Shah", role: "Founder", company: "Chambers of Hemant Shah", image: "https://static.wixstatic.com/media/a3d965_bb8eb1eb2b4b46b581f18924281e4d04~mv2.png/v1/fill/w_400,h_600,al_c,q_85/a3d965_bb8eb1eb2b4b46b581f18924281e4d04~mv2.png" },
        { name: "Ravi I. Sharma", role: "Legal & Financial Counsellor", company: "Dubai", image: "https://static.wixstatic.com/media/a3d965_37e9d6889c4445d6af60c17416656234~mv2.jpg/v1/fill/w_400,h_600,al_c,q_80/a3d965_37e9d6889c4445d6af60c17416656234~mv2.jpg" },
        { name: "Juliana Pupo", role: "Compliance Assistant Director", company: "Dar Global PLC", image: "https://static.wixstatic.com/media/a3d965_c067fce6d86e493fa0eb27a9c0ebc33d~mv2.jpg/v1/fill/w_400,h_600,al_c,q_80/a3d965_c067fce6d86e493fa0eb27a9c0ebc33d~mv2.jpg" },
        { name: "Sachin Nair", role: "In-house Legal Advisor", company: "Multinational Corporations", image: "https://static.wixstatic.com/media/a3d965_4e93ff358721432fb8046e961409e3d6~mv2.jpg/v1/fill/w_400,h_600,al_c,q_80/a3d965_4e93ff358721432fb8046e961409e3d6~mv2.jpg" },
        { name: "Hetay Vora", role: "Compliance Head", company: "NBFC India", image: "https://static.wixstatic.com/media/a3d965_d8d99cad21e346fb9624a3c42d061ccd~mv2.png/v1/fill/w_400,h_600,al_c,q_85/a3d965_d8d99cad21e346fb9624a3c42d061ccd~mv2.png" },
        { name: "Nitika Sud", role: "Advocate", company: "Rajasthan High Court", image: "https://static.wixstatic.com/media/a3d965_55d16506ee3f40d9aa37a699809c9dc7~mv2.jpg/v1/fill/w_400,h_600,al_c,q_80/a3d965_55d16506ee3f40d9aa37a699809c9dc7~mv2.jpg" },
    ],
    emerging: [
        { name: "Rakesh Karela", role: "Advocate", company: "Bar Council of Rajasthan", image: "https://static.wixstatic.com/media/a3d965_01e247e907e44eb2ab07e9b96bc0c599~mv2.png/v1/fill/w_400,h_600,al_c,q_85/a3d965_01e247e907e44eb2ab07e9b96bc0c599~mv2.png" },
        { name: "Hasibe Idil Cirpili", role: "Legal Consultant", company: "Turkey", image: "https://static.wixstatic.com/media/a3d965_1fb402b08c8740aaa22baf304918494c~mv2.png/v1/fill/w_400,h_600,al_c,q_85/a3d965_1fb402b08c8740aaa22baf304918494c~mv2.png" },
        { name: "Advocate Garima Kumar", role: "Co-founder", company: "K&K Legal", image: "https://static.wixstatic.com/media/a3d965_a16dd538bf284458a186d47220d5c4c6~mv2.jpg/v1/fill/w_400,h_600,al_c,q_80/a3d965_a16dd538bf284458a186d47220d5c4c6~mv2.jpg" },
        { name: "Sumpi Bala", role: "In-House Legal Counsel", company: "Northern Tools & Equipment", image: "https://static.wixstatic.com/media/a3d965_64f7e57fe7014e1c8d06a5ecc65fd022~mv2.png/v1/fill/w_400,h_600,al_c,q_85/a3d965_64f7e57fe7014e1c8d06a5ecc65fd022~mv2.png" },
        { name: "Nadeesha Mendis", role: "Senior Manager - Legal", company: "R I L Property PLC", image: "https://static.wixstatic.com/media/a3d965_c60f0df28ab14b16b83885db888a8ed6~mv2.png/v1/fill/w_400,h_600,al_c,q_85/a3d965_c60f0df28ab14b16b83885db888a8ed6~mv2.png" },
        { name: "Mohd Saif Abbasi", role: "Legal Professional", company: "TerraPay", image: "https://static.wixstatic.com/media/a3d965_3f601b65f570486a9e1625c938c307d6~mv2.jpg/v1/fill/w_400,h_600,al_c,q_80/a3d965_3f601b65f570486a9e1625c938c307d6~mv2.jpg" },
    ],
    rising: [
        { name: "Yazan Jaber", role: "Legal Manager", company: "Zoomlion Middle East", image: "https://static.wixstatic.com/media/a3d965_f8d199fc814048d88095e5cd9086e1ec~mv2.png/v1/fill/w_400,h_600,al_c,q_85/a3d965_f8d199fc814048d88095e5cd9086e1ec~mv2.png" },
        { name: "Maulik Kesariya", role: "Consultant", company: "Corporate & Insolvency Law", image: "https://static.wixstatic.com/media/a3d965_07aded66a270467399d81483c73939f2~mv2.png/v1/fill/w_400,h_600,al_c,q_85/a3d965_07aded66a270467399d81483c73939f2~mv2.png" },
        { name: "Mukta Gupta", role: "Lawyer", company: "Strides Pharma Science Limited", image: "https://static.wixstatic.com/media/a3d965_f85a347d90744782b2454705a0f95515~mv2.png/v1/fill/w_400,h_600,al_c,q_85/a3d965_f85a347d90744782b2454705a0f95515~mv2.png" },
        { name: "Avyay Legal LLP", role: "Law Firm", company: "Delhi", image: "https://static.wixstatic.com/media/a3d965_7747f882182a4741a03cc5bebe739384~mv2.png/v1/fill/w_400,h_600,al_c,q_85/a3d965_7747f882182a4741a03cc5bebe739384~mv2.png" },
        { name: "Shepherd Law & Associates", role: "Law Firm", company: "New Delhi", image: "https://static.wixstatic.com/media/a3d965_32947ebc471945f38c25cf418d475567~mv2.png/v1/fill/w_400,h_600,al_c,q_85/a3d965_32947ebc471945f38c25cf418d475567~mv2.png" },
    ],
};

const CATEGORIES = [
    { key: "inspiring" as const, title: "Inspiring Individuals", icon: Sparkles, color: "from-amber-500 to-orange-600", bgGlow: "bg-amber-500/20" },
    { key: "leading" as const, title: "Leading Individuals", icon: Trophy, color: "from-blue-500 to-indigo-600", bgGlow: "bg-blue-500/20" },
    { key: "emerging" as const, title: "Emerging Individuals", icon: Star, color: "from-emerald-500 to-teal-600", bgGlow: "bg-emerald-500/20" },
    { key: "rising" as const, title: "Rising Individuals", icon: AwardIcon, color: "from-purple-500 to-pink-600", bgGlow: "bg-purple-500/20" },
];

export default function AwardeesDubai2024Page() {
    return (
        <main className="min-h-screen bg-slate-950">
            <Navbar />

            {/* Hero Section - Luxury Gold */}
            <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-slate-950 to-slate-950" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-amber-500/10 to-transparent blur-3xl" />

                {/* Animated Gold Particles */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-1/4 w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                    <div className="absolute top-40 right-1/3 w-1 h-1 bg-amber-300 rounded-full animate-ping" />
                    <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse delay-150" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    {/* Event Badge */}
                    <div className="inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/30 rounded-full mb-8 backdrop-blur-sm">
                        <Trophy className="text-amber-400" size={18} />
                        <span className="text-sm font-bold text-amber-400 uppercase tracking-[0.2em]">Dubai 2024</span>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-[0.9] tracking-tight">
                        <span className="block">Lex-Falcon</span>
                        <span className="block bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
                            Global Awardees
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        Celebrating excellence and innovation in the legal industry. Honoring outstanding achievements
                        across individuals and organizations who have made significant contributions to the legal profession.
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12">
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-black text-white">42</div>
                            <div className="text-sm text-slate-500 uppercase tracking-wider mt-1">Awardees</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-black text-white">15+</div>
                            <div className="text-sm text-slate-500 uppercase tracking-wider mt-1">Countries</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-black text-white">4</div>
                            <div className="text-sm text-slate-500 uppercase tracking-wider mt-1">Categories</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Awardees Sections */}
            {CATEGORIES.map((category) => {
                const CategoryIcon = category.icon;
                const awardees = AWARDEES_2024[category.key];

                return (
                    <section key={category.key} className="py-20 relative">
                        {/* Section Glow */}
                        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] ${category.bgGlow} blur-[150px] opacity-30`} />

                        <div className="container mx-auto px-4 relative z-10">
                            {/* Category Header */}
                            <div className="flex items-center gap-4 mb-12">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}>
                                    <CategoryIcon className="text-white" size={28} />
                                </div>
                                <div>
                                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">{category.title}</h2>
                                    <p className="text-slate-500">{awardees.length} Recognized Professionals</p>
                                </div>
                                <div className="hidden md:block h-px bg-slate-800 flex-1 ml-8" />
                            </div>

                            {/* Awardee Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {awardees.map((awardee) => (
                                    <div
                                        key={awardee.name}
                                        className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/5"
                                    >
                                        {/* Hover Gradient Overlay */}
                                        <div className={`absolute inset-0 bg-gradient-to-b ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                                        {/* Image */}
                                        <div className="relative aspect-[4/5] bg-slate-800 overflow-hidden">
                                            <Image
                                                src={awardee.image}
                                                alt={awardee.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                unoptimized
                                            />

                                            {/* Award Badge */}
                                            <div className="absolute top-4 right-4 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                                                <Trophy className="text-white" size={18} />
                                            </div>

                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 relative -mt-8">
                                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                                                {awardee.name}
                                            </h3>
                                            <p className="text-sm text-slate-400 mb-2">{awardee.role}</p>
                                            <p className="text-xs text-slate-500 uppercase tracking-wider">{awardee.company}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                );
            })}

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-amber-950/20 to-slate-950" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[100px]" />

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <Trophy className="mx-auto text-amber-500 mb-6" size={48} />
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
                        Be Part of the Next Celebration
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
                        Nominate yourself or a legal professional who deserves recognition at our upcoming Global Awards Ceremony.
                    </p>
                    <a
                        href="https://form.jotform.com/ClickAway/Lexfalcon-prequalification-2024"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-amber-500/30 hover:-translate-y-1"
                    >
                        Check Your Eligibility
                        <Sparkles size={18} />
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    );
}
