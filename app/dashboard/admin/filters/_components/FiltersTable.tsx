"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Loader2, Plus, Pencil } from "lucide-react";
import { toast } from "sonner";
import { deleteCategory, deleteAmenity, createCategory, createAmenity, editCategory, editAmenity } from "../../_actions/adminActions";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    
    // Create state
    const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
    const [isAmenityDialogOpen, setIsAmenityDialogOpen] = useState(false);
    const [categoryTitle, setCategoryTitle] = useState("");
    const [amenityTitle, setAmenityTitle] = useState("");
    const [isCreatingCategory, setIsCreatingCategory] = useState(false);
    const [isCreatingAmenity, setIsCreatingAmenity] = useState(false);

    // Edit state
    const [editingCategory, setEditingCategory] = useState<FilterItem | null>(null);
    const [editingAmenity, setEditingAmenity] = useState<FilterItem | null>(null);
    const [editCategoryTitle, setEditCategoryTitle] = useState("");
    const [editAmenityTitle, setEditAmenityTitle] = useState("");
    const [isUpdatingCategory, setIsUpdatingCategory] = useState(false);
    const [isUpdatingAmenity, setIsUpdatingAmenity] = useState(false);

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

    const handleCreateCategory = async () => {
        if (!categoryTitle.trim()) {
            toast.error("Category title is required");
            return;
        }

        setIsCreatingCategory(true);
        const res = await createCategory(categoryTitle.trim());
        setIsCreatingCategory(false);

        if (res.success) {
            toast.success(res.message);
            setIsCategoryDialogOpen(false);
            setCategoryTitle("");
            router.refresh();
        } else {
            toast.error(res.message);
        }
    };

    const handleCreateAmenity = async () => {
        if (!amenityTitle.trim()) {
            toast.error("Amenity title is required");
            return;
        }

        setIsCreatingAmenity(true);
        const res = await createAmenity(amenityTitle.trim());
        setIsCreatingAmenity(false);

        if (res.success) {
            toast.success(res.message);
            setIsAmenityDialogOpen(false);
            setAmenityTitle("");
            router.refresh();
        } else {
            toast.error(res.message);
        }
    };

    const openEditCategory = (cat: FilterItem) => {
        setEditingCategory(cat);
        setEditCategoryTitle(cat.title);
    };

    const openEditAmenity = (amenity: FilterItem) => {
        setEditingAmenity(amenity);
        setEditAmenityTitle(amenity.title);
    };

    const handleUpdateCategory = async () => {
        if (!editingCategory) return;
        if (!editCategoryTitle.trim()) {
            toast.error("Category title is required");
            return;
        }

        setIsUpdatingCategory(true);
        const res = await editCategory(editingCategory.id, editCategoryTitle.trim());
        setIsUpdatingCategory(false);

        if (res.success) {
            toast.success(res.message);
            setEditingCategory(null);
            router.refresh();
        } else {
            toast.error(res.message);
        }
    };

    const handleUpdateAmenity = async () => {
        if (!editingAmenity) return;
        if (!editAmenityTitle.trim()) {
            toast.error("Amenity title is required");
            return;
        }

        setIsUpdatingAmenity(true);
        const res = await editAmenity(editingAmenity.id, editAmenityTitle.trim());
        setIsUpdatingAmenity(false);

        if (res.success) {
            toast.success(res.message);
            setEditingAmenity(null);
            router.refresh();
        } else {
            toast.error(res.message);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-4 border-zinc-200/80 shadow-sm rounded-2xl bg-white">
                <div className="flex items-center justify-between mb-4 px-2">
                    <h2 className="text-xl font-bold">Categories</h2>
                    <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                        <DialogTrigger asChild>
                            <Button size="sm" className="rounded-xl h-9">
                                <Plus className="w-4 h-4 mr-1" /> Add Category
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Category</DialogTitle>
                            </DialogHeader>
                            <div className="py-4">
                                <Label htmlFor="categoryTitle" className="mb-2 inline-block">Title</Label>
                                <Input
                                    id="categoryTitle"
                                    value={categoryTitle}
                                    onChange={(e) => setCategoryTitle(e.target.value)}
                                    placeholder="e.g. Apartment, House"
                                />
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsCategoryDialogOpen(false)} className="rounded-xl">Cancel</Button>
                                <Button onClick={handleCreateCategory} disabled={isCreatingCategory} className="rounded-xl">
                                    {isCreatingCategory && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                    Create Category
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
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
                                        <TableCell className="text-right space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => openEditCategory(cat)}
                                                className="rounded-xl hover:bg-blue-50 text-blue-600"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
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

                <Dialog open={!!editingCategory} onOpenChange={(open) => !open && setEditingCategory(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Category</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                            <Label htmlFor="editCategoryTitle" className="mb-2 inline-block">Title</Label>
                            <Input
                                id="editCategoryTitle"
                                value={editCategoryTitle}
                                onChange={(e) => setEditCategoryTitle(e.target.value)}
                                placeholder="e.g. Apartment, House"
                            />
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setEditingCategory(null)} className="rounded-xl">Cancel</Button>
                            <Button onClick={handleUpdateCategory} disabled={isUpdatingCategory} className="rounded-xl">
                                {isUpdatingCategory && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </Card>

            <Card className="p-4 border-zinc-200/80 shadow-sm rounded-2xl bg-white">
                <div className="flex items-center justify-between mb-4 px-2">
                    <h2 className="text-xl font-bold">Amenities</h2>
                    <Dialog open={isAmenityDialogOpen} onOpenChange={setIsAmenityDialogOpen}>
                        <DialogTrigger asChild>
                            <Button size="sm" className="rounded-xl h-9">
                                <Plus className="w-4 h-4 mr-1" /> Add Amenity
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Amenity</DialogTitle>
                            </DialogHeader>
                            <div className="py-4">
                                <Label htmlFor="amenityTitle" className="mb-2 inline-block">Title</Label>
                                <Input
                                    id="amenityTitle"
                                    value={amenityTitle}
                                    onChange={(e) => setAmenityTitle(e.target.value)}
                                    placeholder="e.g. WiFi, Pool"
                                />
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsAmenityDialogOpen(false)} className="rounded-xl">Cancel</Button>
                                <Button onClick={handleCreateAmenity} disabled={isCreatingAmenity} className="rounded-xl">
                                    {isCreatingAmenity && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                    Create Amenity
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
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
                                        <TableCell className="text-right space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => openEditAmenity(amenity)}
                                                className="rounded-xl hover:bg-blue-50 text-blue-600"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
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

                <Dialog open={!!editingAmenity} onOpenChange={(open) => !open && setEditingAmenity(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Amenity</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                            <Label htmlFor="editAmenityTitle" className="mb-2 inline-block">Title</Label>
                            <Input
                                id="editAmenityTitle"
                                value={editAmenityTitle}
                                onChange={(e) => setEditAmenityTitle(e.target.value)}
                                placeholder="e.g. WiFi, Pool"
                            />
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setEditingAmenity(null)} className="rounded-xl">Cancel</Button>
                            <Button onClick={handleUpdateAmenity} disabled={isUpdatingAmenity} className="rounded-xl">
                                {isUpdatingAmenity && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </Card>
        </div>
    );
}

