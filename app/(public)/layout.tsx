import Footer from "@/components/shared/Footer";
import Providers from "./providers";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <div className="flex flex-col min-h-[calc(100vh-64px)]">
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
            </div>
        </Providers>
    );
}
