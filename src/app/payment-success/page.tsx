import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccessPage() {
    return (
        <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 max-w-md w-full text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-green-600" />
                </div>
                <h1 className="text-3xl font-serif font-bold text-slate-900 mb-4">Payment Successful!</h1>
                <p className="text-slate-600 mb-8 leading-relaxed">
                    Thank you for your purchase. A confirmation email has been sent to you with your pass details.
                </p>
                <Link
                    href="/dubai-awardee-confirmation-2026"
                    className="block w-full py-3.5 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors"
                >
                    Return to Event Page
                </Link>
            </div>
        </main>
    );
}
