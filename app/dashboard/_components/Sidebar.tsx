import { NavPathLink as Link } from "@/components/shared/NavPathLink";
import { getMe } from "@/service/getMe";
import { Home, List, User } from "lucide-react";

export default async function Sidebar() {
    const session = await getMe();
    const user = session?.success ? session.data : null;
    
    if (!user) return null;

    const role = user.profile.role;

    return (
        <aside className="w-64 bg-zinc-50 border-r min-h-full p-4 flex flex-col gap-4">
            <h2 className="text-lg font-bold mb-4 px-2">Dashboard</h2>
            
            <nav className="flex flex-col gap-2">
                {role === "TENANT" && (
                    <>
                        <Link href="/dashboard/tenant" className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-200 rounded-md">
                            <Home className="w-5 h-5" />
                            <span>Overview</span>
                        </Link>
                        <Link href="/dashboard/tenant/requests" className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-200 rounded-md">
                            <List className="w-5 h-5" />
                            <span>Rental Requests</span>
                        </Link>
                        <Link href="/dashboard/tenant/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-200 rounded-md">
                            <User className="w-5 h-5" />
                            <span>My Profile</span>
                        </Link>
                    </>
                )}
                {/* Add LANDLORD and ADMIN later */}
                {role !== "TENANT" && (
                    <div className="px-4 py-2 text-muted-foreground italic">
                        No links configured for {role}.
                    </div>
                )}
            </nav>
        </aside>
    );
}
