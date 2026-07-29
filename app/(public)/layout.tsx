import Navbar from "@/components/shared/Navbar";
import { Suspense } from "react";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>

            <Suspense fallback={<div>Loading...</div>}>
                <Navbar />
            </Suspense>

            <main className="px-4">{children}</main>
        </div>
    );
}
