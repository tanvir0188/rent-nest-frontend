"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, ShieldBan, ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { toggleUserStatus } from "../_actions/adminActions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function AdminUsersTable({ users = [] }: { users: any[] }) {
    const router = useRouter();
    const [processingId, setProcessingId] = useState<string | null>(null);

    const handleToggle = async (id: string, currentStatus: string) => {
        const action = currentStatus === "ACTIVE" ? "ban" : "unban";
        if (!confirm(`Are you sure you want to ${action} this user?`)) return;
        setProcessingId(id);
        try {
            const res = await toggleUserStatus(id);
            if (res.success) {
                toast.success(res.message);
                router.refresh();
            } else {
                toast.error(res.message);
            }
        } catch (err) {
            toast.error("Failed to update user status");
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold tracking-tight">User Management</h2>
                    <p className="text-xs text-muted-foreground">View, manage, and moderate all platform users.</p>
                </div>
            </div>

            <div className="border rounded-2xl overflow-hidden bg-white shadow-sm">
                <Table>
                    <TableHeader className="bg-zinc-50/80">
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {!users || users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                                    No users found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            users.map((user: any) => (
                                <TableRow key={user.id} className="hover:bg-zinc-50/50 transition-colors">
                                    <TableCell className="font-medium text-zinc-900">{user.name}</TableCell>
                                    <TableCell className="text-zinc-600">{user.email}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="text-zinc-600 bg-zinc-50 capitalize">
                                            {user.role?.toLowerCase()}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {user.activeStatus === "ACTIVE" ? (
                                            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                                                Active
                                            </Badge>
                                        ) : (
                                            <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">
                                                Banned
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-zinc-500 text-xs">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right space-x-1">
                                        <Link href={`/dashboard/admin/users/${user.id}`}>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="rounded-xl hover:bg-zinc-100"
                                            >
                                                <Eye className="w-4 h-4 text-zinc-600" />
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            disabled={processingId === user.id}
                                            onClick={() => handleToggle(user.id, user.activeStatus)}
                                            className={`rounded-xl ${user.activeStatus === "ACTIVE" ? "hover:bg-red-50 text-red-600" : "hover:bg-green-50 text-green-600"}`}
                                        >
                                            {processingId === user.id ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : user.activeStatus === "ACTIVE" ? (
                                                <ShieldBan className="w-4 h-4" />
                                            ) : (
                                                <ShieldCheck className="w-4 h-4" />
                                            )}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
