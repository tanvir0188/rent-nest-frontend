import { getMe } from "@/service/getMe";
import { ProfileForm } from "@/components/shared/ProfileForm";

export default async function TenantProfilePage() {
    const session = await getMe();
    const user = session?.success ? session.data : null;

    const initialData = {
        name: user?.name || user?.profile?.name || "",
        email: user?.email || user?.profile?.email || "",
        bio: user?.bio || user?.profile?.bio || "",
        profilePhoto: user?.profilePhoto || user?.profile?.profilePhoto || ""
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
                <p className="text-muted-foreground mt-1">Manage your account information and preferences.</p>
            </div>
            <ProfileForm initialData={initialData} />
        </div>
    );
}
