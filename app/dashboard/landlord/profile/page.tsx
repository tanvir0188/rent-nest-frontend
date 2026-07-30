import { ProfileForm } from "@/components/shared/ProfileForm";
import { getMe } from "@/service/getMe";

export default async function LandlordProfilePage() {
    const session = await getMe();
    const user = session?.success ? session.data : null;

    if (!user) {
        return <div className="text-red-500">Failed to load profile.</div>;
    }
    const initialData = {
        name: user?.name || user?.profile?.name || "",
        email: user?.email || user?.profile?.email || "",
        bio: user?.profile?.profile?.bio || user?.profile?.bio || "",
        profilePhoto: user?.profile?.profile?.profilePhoto || user?.profile?.profilePhoto || ""
    };

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
                <p className="text-muted-foreground mt-1">Manage your landlord account settings and profile details.</p>
            </div>

            <ProfileForm initialData={initialData} />
        </div>
    );
}
