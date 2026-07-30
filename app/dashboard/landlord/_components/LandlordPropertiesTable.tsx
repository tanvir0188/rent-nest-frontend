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
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PropertyFormModal } from "./PropertyFormModal";
import { deleteProperty } from "../_actions/landlordActions";

export function LandlordPropertiesTable({ properties = [] }: { properties: any[] }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState<any | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleEdit = (prop: any) => {
        setSelectedProperty(prop);
        setModalOpen(true);
    };

    const handleAdd = () => {
        setSelectedProperty(null);
        setModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this property?")) return;
        setDeletingId(id);
        try {
            const res = await deleteProperty(id);
            if (res.success) {
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        } catch (err) {
            toast.error("Failed to delete property");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold tracking-tight">Property Listings</h2>
                    <p className="text-xs text-muted-foreground">Manage your properties and active rentals.</p>
                </div>
                <Button onClick={handleAdd} className="rounded-xl gap-2 shadow-sm">
                    <Plus className="w-4 h-4" />
                    <span>Add Property</span>
                </Button>
            </div>

            <div className="border rounded-2xl overflow-hidden bg-white shadow-sm">
                <Table>
                    <TableHeader className="bg-zinc-50/80">
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {!properties || properties.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                                    No properties found. Click "Add Property" to create your first listing.
                                </TableCell>
                            </TableRow>
                        ) : (
                            properties.map((prop: any) => (
                                <TableRow key={prop.id} className="hover:bg-zinc-50/50 transition-colors">
                                    <TableCell className="font-medium text-zinc-900">{prop.title}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="text-zinc-600 bg-zinc-50">
                                            {prop.category?.title || "Regular"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-zinc-600 capitalize">{prop.type}</TableCell>
                                    <TableCell className="text-zinc-600">{prop.location}</TableCell>
                                    <TableCell className="font-semibold text-zinc-900">
                                        ${prop.price?.toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        {prop.isAvailable ? (
                                            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                                                Available
                                            </Badge>
                                        ) : (
                                            <Badge variant="secondary" className="bg-zinc-100 text-zinc-700 border-zinc-200">
                                                Occupied
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right space-x-1">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleEdit(prop)}
                                            className="rounded-xl hover:bg-zinc-100"
                                        >
                                            <Edit className="w-4 h-4 text-zinc-600" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            disabled={deletingId === prop.id}
                                            onClick={() => handleDelete(prop.id)}
                                            className="rounded-xl hover:bg-red-50 text-red-600"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <PropertyFormModal
                open={modalOpen}
                initialData={selectedProperty}
                onClose={() => {
                    setModalOpen(false);
                    setSelectedProperty(null);
                }}
            />
        </div>
    );
}
