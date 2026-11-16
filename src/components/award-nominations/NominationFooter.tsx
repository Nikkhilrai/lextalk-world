import Link from "next/link";

/** Slim footer for the standalone nomination pages: trust and policy links only, nothing to wander off to. */
export function NominationFooter() {
    return (
        <footer className="bg-[#faf8f4] border-t border-slate-200/70 px-4 py-6">
            <p className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-center text-xs text-slate-500">
                <span>© {new Date().getFullYear()} LexTalk World</span>
                <span aria-hidden className="text-slate-300">·</span>
                <Link href="/privacy" target="_blank" className="hover:text-amber-700 hover:underline">Privacy Policy</Link>
                <span aria-hidden className="text-slate-300">·</span>
                <Link href="/terms" target="_blank" className="hover:text-amber-700 hover:underline">Terms</Link>
                <span aria-hidden className="text-slate-300">·</span>
                <a href="mailto:info@lextalkworld.in" className="hover:text-amber-700 hover:underline">info@lextalkworld.in</a>
            </p>
        </footer>
    );
}
