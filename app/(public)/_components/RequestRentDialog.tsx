"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { requestRental } from "../_acitons/propertyActions";
import { useRouter } from "next/navigation";

export function RequestRentDialog({ propertyId }: { propertyId: string }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRequest = async () => {
        setLoading(true);
        try {
            const res = await requestRental(propertyId);
            if (res.success) {
                toast.success(res.message || "Request sent successfully!");
                router.refresh();
                setOpen(false);
            } else {
                toast.error(res.message || "Failed to send request.");
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="lg">Request to Rent</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Request to Rent</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to send a rental request for this property? The landlord will be notified.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end mt-4">
                    <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                        Cancel
                    </Button>
                    <Button onClick={handleRequest} disabled={loading}>
                        {loading ? "Sending..." : "Confirm Request"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
