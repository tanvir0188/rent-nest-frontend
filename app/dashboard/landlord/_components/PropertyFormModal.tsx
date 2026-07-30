"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { createProperty, updateProperty } from "../_actions/landlordActions";

export interface PropertyFormModalProps {
    open: boolean;
    initialData?: any | null;
    onClose: () => void;
    onSuccess?: () => void;
}

export function PropertyFormModal({ open, initialData, onClose, onSuccess }: PropertyFormModalProps) {
    const isEdit = Boolean(initialData?.id);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        title: "",
        price: "",
        type: "Apartment",
        location: "",
        description: "",
        categoryId: "fb1d1bb0-aab8-4148-9f65-a5f920d225bc", // Default Category
        isAvailable: true
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                title: initialData.title || "",
                price: initialData.price ? String(initialData.price) : "",
                type: initialData.type || "Apartment",
                location: initialData.location || "",
                description: initialData.description || "",
                categoryId: initialData.categoryId || "fb1d1bb0-aab8-4148-9f65-a5f920d225bc",
                isAvailable: initialData.isAvailable ?? true
            });
        } else {
            setForm({
                title: "",
                price: "",
                type: "Apartment",
                location: "",
                description: "",
                categoryId: "fb1d1bb0-aab8-4148-9f65-a5f920d225bc",
                isAvailable: true
            });
        }
    }, [initialData, open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            title: form.title,
            price: Number(form.price),
            type: form.type,
            location: form.location,
            description: form.description,
            categoryId: form.categoryId,
            isAvailable: form.isAvailable
        };

        try {
            const res = isEdit
                ? await updateProperty(initialData.id, payload)
                : await createProperty(payload);

            if (res.success) {
                toast.success(res.message);
                onClose();
                if (onSuccess) onSuccess();
            } else {
                toast.error(res.message || "Failed to save property");
            }
        } catch (err) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent className="sm:max-w-md rounded-3xl p-6 bg-white">
                <DialogHeader className="text-left">
                    <DialogTitle className="text-xl font-bold">
                        {isEdit ? "Edit Property" : "Add New Property"}
                    </DialogTitle>
                    <DialogDescription className="text-xs text-zinc-500">
                        {isEdit ? "Update your property details below." : "Fill in the property details to list it for rent."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-2">
                    <div className="space-y-1.5">
                        <Label htmlFor="title" className="text-xs font-semibold">Title</Label>
                        <Input
                            id="title"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            placeholder="e.g. Modern 2 Bedroom Apartment"
                            required
                            className="rounded-xl"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <Label htmlFor="price" className="text-xs font-semibold">Rent Price ($)</Label>
                            <Input
                                id="price"
                                type="number"
                                value={form.price}
                                onChange={(e) => setForm({ ...form, price: e.target.value })}
                                placeholder="25000"
                                required
                                className="rounded-xl"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="type" className="text-xs font-semibold">Property Type</Label>
                            <select
                                id="type"
                                value={form.type}
                                onChange={(e) => setForm({ ...form, type: e.target.value })}
                                className="w-full h-10 px-3 rounded-xl border border-zinc-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-zinc-400"
                            >
                                <option value="Apartment">Apartment</option>
                                <option value="Sublet">Sublet</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="location" className="text-xs font-semibold">Location</Label>
                        <Input
                            id="location"
                            value={form.location}
                            onChange={(e) => setForm({ ...form, location: e.target.value })}
                            placeholder="e.g. Dhanmondi, Dhaka"
                            required
                            className="rounded-xl"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="description" className="text-xs font-semibold">Description</Label>
                        <Textarea
                            id="description"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            placeholder="Describe your property..."
                            rows={3}
                            className="rounded-xl text-xs"
                        />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                        <div className="space-y-0.5">
                            <Label className="text-xs font-semibold">Availability</Label>
                            <p className="text-[11px] text-zinc-500">Mark if property is currently available for rent</p>
                        </div>
                        <Switch
                            checked={form.isAvailable}
                            onCheckedChange={(val) => setForm({ ...form, isAvailable: val })}
                        />
                    </div>

                    <DialogFooter className="pt-2">
                        <Button type="button" variant="outline" onClick={onClose} className="rounded-xl">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading} className="rounded-xl gap-2">
                            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                            <span>{isEdit ? "Update Property" : "Create Property"}</span>
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
