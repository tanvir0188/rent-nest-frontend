"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldBan, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { toggleUserStatus } from "../_actions/adminActions";
import { useRouter } from "next/navigation";

export function ToggleStatusButton({ userId, activeStatus }: { userId: string; activeStatus: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const isBanned = activeStatus !== "ACTIVE";

    const handleToggle = async () => {
        const action = isBanned ? "unban" : "ban";
        if (!confirm(`Are you sure you want to ${action} this user?`)) return;
        setLoading(true);
        try {
            const res = await toggleUserStatus(userId);
            if (res.success) {
                toast.success(res.message);
                router.refresh();
            } else {
                toast.error(res.message);
            }
        } catch {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            onClick={handleToggle}
            disabled={loading}
            variant={isBanned ? "default" : "destructive"}
            className="rounded-xl gap-2"
        >
            {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : isBanned ? (
                <ShieldCheck className="w-4 h-4" />
            ) : (
                <ShieldBan className="w-4 h-4" />
            )}
            <span>{isBanned ? "Unban User" : "Ban User"}</span>
        </Button>
    );
}
