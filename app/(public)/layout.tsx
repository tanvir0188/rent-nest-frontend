import Navbar from "@/components/shared/Navbar";
import { Suspense } from "react";
import Providers from "./providers";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>

            <Suspense fallback={<div>Loading...</div>}>
                <Navbar />
            </Suspense>

            <Providers>
                <main className="px-4">{children}</main>
            </Providers>
        </div>
    );
}
