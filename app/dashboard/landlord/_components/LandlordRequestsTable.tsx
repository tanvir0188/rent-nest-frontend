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
import { Check, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { updateRequestStatus } from "../_actions/landlordActions";
import { useRouter } from "next/navigation";

export function LandlordRequestsTable({ requests = [] }: { requests: any[] }) {
    const router = useRouter();
    const [processingId, setProcessingId] = useState<string | null>(null);

    const handleAction = async (id: string, status: "APPROVED" | "REJECTED") => {
        if (!confirm(`Are you sure you want to ${status.toLowerCase()} this request?`)) return;
        setProcessingId(id);
        try {
            const res = await updateRequestStatus(id, status);
            if (res.success) {
                toast.success(res.message);
                router.refresh();
            } else {
                toast.error(res.message);
            }
        } catch (err) {
            toast.error("Failed to update request");
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold tracking-tight">Rental Requests</h2>
                    <p className="text-xs text-muted-foreground">Manage incoming rental requests from tenants.</p>
                </div>
            </div>

            <div className="border rounded-2xl overflow-hidden bg-white shadow-sm">
                <Table>
                    <TableHeader className="bg-zinc-50/80">
                        <TableRow>
                            <TableHead>Property</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Tenant ID</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {!requests || requests.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                                    No rental requests found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            requests.map((req: any) => (
                                <TableRow key={req.id} className="hover:bg-zinc-50/50 transition-colors">
                                    <TableCell className="font-medium text-zinc-900">
                                        {req.property?.title || "Unknown Property"}
                                    </TableCell>
                                    <TableCell className="text-zinc-600">
                                        {req.property?.location || "Unknown"}
                                    </TableCell>
                                    <TableCell className="font-semibold text-zinc-900">
                                        ${req.property?.price?.toLocaleString() || 0}
                                    </TableCell>
                                    <TableCell className="text-zinc-600 truncate max-w-[150px]">
                                        {req.userId}
                                    </TableCell>
                                    <TableCell>
                                        <Badge 
                                            variant={req.status === "APPROVED" ? "default" : req.status === "REJECTED" ? "destructive" : "secondary"}
                                            className={req.status === "APPROVED" ? "bg-green-100 text-green-800 border-green-200" : ""}
                                        >
                                            {req.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right space-x-1">
                                        {req.status === "PENDING" && (
                                            <>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    disabled={processingId === req.id}
                                                    onClick={() => handleAction(req.id, "APPROVED")}
                                                    className="rounded-xl hover:bg-green-50 text-green-600"
                                                >
                                                    {processingId === req.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    disabled={processingId === req.id}
                                                    onClick={() => handleAction(req.id, "REJECTED")}
                                                    className="rounded-xl hover:bg-red-50 text-red-600"
                                                >
                                                    {processingId === req.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
                                                </Button>
                                            </>
                                        )}
                                        {req.status !== "PENDING" && (
                                            <span className="text-xs text-muted-foreground mr-2">Actioned</span>
                                        )}
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
