import Navbar from "@/components/shared/Navbar";
import Sidebar from "./_components/Sidebar";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardLoadingProvider } from "@/components/shared/DashboardLoadingContext";
import DashboardContentWrapper from "./_components/DashboardContentWrapper";

function SidebarSkeleton() {
    return (
        <aside className="w-64 bg-zinc-50 border-r min-h-full p-4 flex flex-col gap-4">
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="flex flex-col gap-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
        </aside>
    );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <DashboardLoadingProvider>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex flex-1">
                    <Suspense fallback={<SidebarSkeleton />}>
                        <Sidebar />
                    </Suspense>
                    <main className="flex-1 p-6">
                        <DashboardContentWrapper>
                            {children}
                        </DashboardContentWrapper>
                    </main>
                </div>
            </div>
        </DashboardLoadingProvider>
    );
}
