"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { deleteCategory, deleteAmenity } from "../../_actions/adminActions";
import { useRouter } from "next/navigation";

export interface FilterItem {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
}

interface FiltersTableProps {
    categories: FilterItem[];
    amenities: FilterItem[];
}

export function FiltersTable({ categories, amenities }: FiltersTableProps) {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = async (id: string, type: "category" | "amenity") => {
        if (!confirm(`Are you sure you want to delete this ${type}?`)) return;

        setDeletingId(id);
        
        let res;
        if (type === "category") {
            res = await deleteCategory(id);
        } else {
            res = await deleteAmenity(id);
        }

        setDeletingId(null);

        if (res.success) {
            toast.success(res.message);
            router.refresh();
        } else {
            toast.error(res.message);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-4 border-zinc-200/80 shadow-sm rounded-2xl bg-white">
                <h2 className="text-xl font-bold mb-4 px-2">Categories</h2>
                <div className="rounded-xl border overflow-hidden">
                    <Table>
                        <TableHeader className="bg-zinc-50">
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={2} className="text-center text-zinc-500 py-6">
                                        No categories found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                categories.map((cat) => (
                                    <TableRow key={cat.id}>
                                        <TableCell className="font-medium">{cat.title}</TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                disabled={deletingId === cat.id}
                                                onClick={() => handleDelete(cat.id, "category")}
                                                className="rounded-xl hover:bg-red-50 text-red-600"
                                            >
                                                {deletingId === cat.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </Card>

            <Card className="p-4 border-zinc-200/80 shadow-sm rounded-2xl bg-white">
                <h2 className="text-xl font-bold mb-4 px-2">Amenities</h2>
                <div className="rounded-xl border overflow-hidden">
                    <Table>
                        <TableHeader className="bg-zinc-50">
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {amenities.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={2} className="text-center text-zinc-500 py-6">
                                        No amenities found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                amenities.map((amenity) => (
                                    <TableRow key={amenity.id}>
                                        <TableCell className="font-medium">{amenity.title}</TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                disabled={deletingId === amenity.id}
                                                onClick={() => handleDelete(amenity.id, "amenity")}
                                                className="rounded-xl hover:bg-red-50 text-red-600"
                                            >
                                                {deletingId === amenity.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    );
}
