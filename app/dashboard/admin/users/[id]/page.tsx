import { getUserDetails } from "../../_actions/adminActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Calendar, User, Shield } from "lucide-react";
import { ToggleStatusButton } from "../../_components/ToggleStatusButton";

export default async function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const user = await getUserDetails(id);

    if (!user) {
        return (
            <div className="text-center py-12 text-red-500 text-xl font-bold">
                User not found.
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-3xl mx-auto w-full">
            <Link href="/dashboard/admin/users">
                <Button variant="ghost" className="rounded-xl gap-2 mb-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Users
                </Button>
            </Link>

            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
                    <p className="text-muted-foreground mt-1">{user.email}</p>
                </div>
                <Badge
                    variant={user.activeStatus === "ACTIVE" ? "default" : "destructive"}
                    className={user.activeStatus === "ACTIVE" ? "bg-green-100 text-green-800 border-green-200 text-sm py-1 px-3" : "text-sm py-1 px-3"}
                >
                    {user.activeStatus === "ACTIVE" ? "Active" : "Banned"}
                </Badge>
            </div>

            <Card className="rounded-2xl shadow-sm border border-zinc-200/80">
                <CardHeader>
                    <CardTitle className="text-lg">User Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-blue-50">
                                <User className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Name</p>
                                <p className="font-medium">{user.name}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-indigo-50">
                                <Mail className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Email</p>
                                <p className="font-medium">{user.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-purple-50">
                                <Shield className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Role</p>
                                <p className="font-medium capitalize">{user.role?.toLowerCase()}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-amber-50">
                                <Calendar className="h-5 w-5 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Joined</p>
                                <p className="font-medium">{new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                            </div>
                        </div>
                    </div>

                    {user.profile && (
                        <div className="pt-4 border-t">
                            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Profile Details</h3>
                            <div className="space-y-2 text-sm">
                                <p><span className="text-muted-foreground">Bio:</span> {user.profile.bio || "Not provided"}</p>
                                <p><span className="text-muted-foreground">Profile Photo:</span> {user.profile.profilePhoto || "Not set"}</p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm border border-zinc-200/80">
                <CardHeader>
                    <CardTitle className="text-lg">Actions</CardTitle>
                </CardHeader>
                <CardContent>
                    <ToggleStatusButton userId={user.id} activeStatus={user.activeStatus} />
                </CardContent>
            </Card>
        </div>
    );
}
