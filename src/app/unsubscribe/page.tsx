import { Suspense } from "react";
import UnsubscribeContent from "./UnsubscribeContent";

export default function UnsubscribePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#0f172a] flex items-center justify-center" />}>
            <UnsubscribeContent />
        </Suspense>
    );
}
