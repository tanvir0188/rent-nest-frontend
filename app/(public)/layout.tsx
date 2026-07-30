import Navbar from "@/components/shared/Navbar";
import { Suspense } from "react";
import Providers from "./providers";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>

            <Navbar />

            <Providers>
                <main className="px-4">{children}</main>
            </Providers>
        </div>
    );
}
