"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Loader2, ChevronLeft, ChevronRight, Download, X } from "lucide-react";

// react-pageflip manipulates DOM nodes directly for the flip animation and
// isn't SSR-safe — must be loaded client-side only.
const HTMLFlipBook = dynamic(() => import("react-pageflip"), { ssr: false });

interface PageProps {
    src: string;
    pageNumber: number;
}

// react-pageflip clones this ref for its internal flip transform, so each
// page must forward a ref straight to its outer DOM node.
const Page = forwardRef<HTMLDivElement, PageProps>(({ src, pageNumber }, ref) => (
    <div ref={ref} className="bg-white shadow-inner overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element -- data: URLs rendered from a canvas, not a static asset next/image can optimize */}
        <img src={src} alt={`Page ${pageNumber}`} className="w-full h-full object-contain" draggable={false} />
    </div>
));
Page.displayName = "Page";

export function PdfFlipbook({ fileUrl, title, onClose }: { fileUrl: string; title: string; onClose: () => void }) {
    const [pages, setPages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [dims, setDims] = useState({ width: 480, height: 640 });
    const bookRef = useRef<any>(null);

    useEffect(() => {
        let cancelled = false;

        async function render() {
            try {
                const pdfjsLib = await import("pdfjs-dist");
                pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

                const pdf = await pdfjsLib.getDocument({ url: fileUrl }).promise;
                const rendered: string[] = [];

                // Size the book from the first page's aspect ratio, capped to a
                // reasonable reading width so it doesn't overflow small screens.
                const firstPage = await pdf.getPage(1);
                const baseViewport = firstPage.getViewport({ scale: 1 });
                const targetWidth = Math.min(520, window.innerWidth * 0.42);
                const scale = (targetWidth / baseViewport.width) * 2; // 2x for crisp rendering
                if (!cancelled) {
                    setDims({
                        width: Math.round(targetWidth),
                        height: Math.round(targetWidth * (baseViewport.height / baseViewport.width)),
                    });
                }

                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const viewport = page.getViewport({ scale });
                    const canvas = document.createElement("canvas");
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    const ctx = canvas.getContext("2d");
                    if (!ctx) continue;
                    await page.render({ canvasContext: ctx, viewport, canvas }).promise;
                    rendered.push(canvas.toDataURL("image/jpeg", 0.85));
                    if (!cancelled) setPages([...rendered]);
                }
            } catch (err) {
                console.error("PDF render failed", err);
                if (!cancelled) setError("Couldn't load this document. Try downloading it instead.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        render();
        return () => { cancelled = true; };
    }, [fileUrl]);

    return (
        <div className="fixed inset-0 z-[100000] bg-slate-950/95 backdrop-blur-sm flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-white/10 shrink-0">
                <h2 className="text-white font-serif font-semibold text-sm md:text-base truncate pr-4">{title}</h2>
                <div className="flex items-center gap-2 shrink-0">
                    <a
                        href={fileUrl}
                        download
                        className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-white/60 hover:text-amber-400 text-xs font-semibold uppercase tracking-wide transition-colors"
                    >
                        <Download size={13} />
                        Download
                    </a>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                        aria-label="Close"
                    >
                        <X size={16} className="text-white/70" />
                    </button>
                </div>
            </div>

            {/* Reader */}
            <div className="flex-1 flex items-center justify-center overflow-hidden relative px-2">
                {loading && pages.length === 0 && (
                    <div className="flex flex-col items-center gap-3 text-white/50">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <p className="text-xs uppercase tracking-widest">Opening book…</p>
                    </div>
                )}

                {error && (
                    <div className="flex flex-col items-center gap-3 text-center max-w-sm px-4">
                        <p className="text-white/60 text-sm">{error}</p>
                        <a
                            href={fileUrl}
                            download
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-widest rounded-lg"
                        >
                            <Download size={14} />
                            Download PDF
                        </a>
                    </div>
                )}

                {pages.length > 0 && (
                    <>
                        <button
                            onClick={() => bookRef.current?.pageFlip()?.flipPrev()}
                            className="hidden md:flex absolute left-3 z-10 w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 items-center justify-center transition-colors disabled:opacity-20"
                            disabled={currentPage === 0}
                            aria-label="Previous page"
                        >
                            <ChevronLeft className="text-white" size={20} />
                        </button>

                        <HTMLFlipBook
                            ref={bookRef}
                            width={dims.width}
                            height={dims.height}
                            size="fixed"
                            minWidth={280}
                            maxWidth={800}
                            minHeight={400}
                            maxHeight={1100}
                            showCover={true}
                            drawShadow={true}
                            flippingTime={600}
                            usePortrait={true}
                            startZIndex={0}
                            autoSize={false}
                            maxShadowOpacity={0.4}
                            mobileScrollSupport={true}
                            clickEventForward={true}
                            useMouseEvents={true}
                            swipeDistance={30}
                            showPageCorners={true}
                            disableFlipByClick={false}
                            className="pdf-flipbook"
                            style={{}}
                            startPage={0}
                            onFlip={(e: any) => setCurrentPage(e.data)}
                        >
                            {pages.map((src, i) => (
                                <Page key={i} src={src} pageNumber={i + 1} />
                            ))}
                        </HTMLFlipBook>

                        <button
                            onClick={() => bookRef.current?.pageFlip()?.flipNext()}
                            className="hidden md:flex absolute right-3 z-10 w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 items-center justify-center transition-colors disabled:opacity-20"
                            disabled={currentPage >= pages.length - 1}
                            aria-label="Next page"
                        >
                            <ChevronRight className="text-white" size={20} />
                        </button>
                    </>
                )}
            </div>

            {/* Footer / page indicator */}
            {pages.length > 0 && (
                <div className="flex items-center justify-center gap-4 py-3 border-t border-white/10 shrink-0">
                    <button
                        onClick={() => bookRef.current?.pageFlip()?.flipPrev()}
                        className="md:hidden text-white/60 disabled:opacity-20"
                        disabled={currentPage === 0}
                        aria-label="Previous page"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <p className="text-white/40 text-xs uppercase tracking-widest">
                        Page {currentPage + 1} of {pages.length}
                        {loading && " · loading…"}
                    </p>
                    <button
                        onClick={() => bookRef.current?.pageFlip()?.flipNext()}
                        className="md:hidden text-white/60 disabled:opacity-20"
                        disabled={currentPage >= pages.length - 1}
                        aria-label="Next page"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}
        </div>
    );
}
