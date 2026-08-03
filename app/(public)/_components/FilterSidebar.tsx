"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Slider } from "@/components/ui/slider";
import { useFilterLoading } from "./FilterLoadingContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface FilterSidebarProps {
    categories?: any[];
    amenities?: any[];
    minPrice?: number;
    maxPrice?: number;
}

export default function FilterSidebar({ categories = [], amenities = [], minPrice = 0, maxPrice = 50000 }: FilterSidebarProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { setLoading } = useFilterLoading();
    const [isPending, startTransition] = useTransition();

    const [type, setType] = useState(searchParams.get("type") || "");
    const [location, setLocation] = useState(searchParams.get("location") || "");
    const [price, setPrice] = useState(searchParams.get("price") || "");
    const [categoryId, setCategoryId] = useState(searchParams.get("categoryId") || "");
    const [amenity, setAmenity] = useState(searchParams.get("amenity") || "");
    const [title, setTitle] = useState(searchParams.get("title") || "");

    const handleApply = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());

        if (type) params.set("type", type);
        else params.delete("type");

        if (location) params.set("location", location);
        else params.delete("location");

        if (price) params.set("price", price);
        else params.delete("price");

        if (categoryId) params.set("categoryId", categoryId);
        else params.delete("categoryId");

        if (amenity) params.set("amenity", amenity);
        else params.delete("amenity");

        if (title) params.set("title", title);
        else params.delete("title");

        setLoading(true);
        startTransition(() => {
            router.push(`/?${params.toString()}`);
        });
    };

    const handleClear = () => {
        setType("");
        setLocation("");
        setPrice("");
        setCategoryId("");
        setAmenity("");
        setTitle("");
        const params = new URLSearchParams(searchParams.toString());
        params.delete("type");
        params.delete("location");
        params.delete("price");
        params.delete("categoryId");
        params.delete("amenity");
        params.delete("title");
        setLoading(true);
        startTransition(() => {
            router.push(`/?${params.toString()}`);
        });
    }

    return (
        <form onSubmit={handleApply} className="bg-zinc-50 border p-6 rounded-xl flex flex-col gap-4">
            <h2 className="font-bold text-lg mb-2">Filters</h2>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Search Title</label>
                <Input
                    placeholder="e.g. Modern Apartment"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Type</label>
                <Input
                    placeholder="e.g. Sublet"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={categoryId} onValueChange={(val) => setCategoryId(val === "all" ? "" : val)}>
                    <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((cat: any) => (
                            <SelectItem key={cat.id} value={cat.id}>
                                {cat.title}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Amenity</label>
                <Select value={amenity} onValueChange={(val) => setAmenity(val === "all" ? "" : val)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Any Amenity" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Any Amenity</SelectItem>
                        {amenities.map((am: any) => (
                            <SelectItem key={am.id} value={am.id}>
                                {am.title}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Location</label>
                <Input
                    placeholder="e.g. Dhanmondi"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Max Price:</label>
                <b>BDT: {price || minPrice}</b>

                <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{minPrice}</span>
                    <Slider
                        defaultValue={[price ? Number(price) : maxPrice]}
                        min={minPrice}
                        max={maxPrice}
                        step={1}
                        onValueChange={(value) => setPrice(value[0].toString())}
                    />
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{maxPrice}</span>
                </div>
            </div>

            <div className="flex gap-2 mt-4">
                <Button type="button" variant="outline" className="flex-1" onClick={handleClear} disabled={isPending}>Clear</Button>
                <Button type="submit" className="flex-1" disabled={isPending}>
                    {isPending ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Applying...</>
                    ) : (
                        "Apply"
                    )}
                </Button>
            </div>
        </form>
    );
}
