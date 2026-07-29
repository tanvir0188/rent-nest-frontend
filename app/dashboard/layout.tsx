import Navbar from "@/components/shared/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex flex-1">
                {/* <Sidebar /> will go here later */}
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
