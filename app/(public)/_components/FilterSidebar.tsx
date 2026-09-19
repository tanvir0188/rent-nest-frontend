"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { useFilterLoading } from "./FilterLoadingContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Search, MapPin, Home, SlidersHorizontal, Sparkles, RotateCcw, ChevronDown, ChevronUp } from "lucide-react";

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
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const [type, setType] = useState(searchParams.get("type") || "");
    const [location, setLocation] = useState(searchParams.get("location") || "");
    const [price, setPrice] = useState(searchParams.get("price") || "");
    const [categoryId, setCategoryId] = useState(searchParams.get("categoryId") || "");
    const [amenity, setAmenity] = useState(searchParams.get("amenity") || "");
    const [title, setTitle] = useState(searchParams.get("title") || "");

    // Count active filters
    const activeFiltersCount = [type, location, price, categoryId, amenity, title].filter(Boolean).length;

    useEffect(() => {
        if (!isPending) {
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [isPending, setLoading]);

    // Keep form state in sync if URL searchParams change
    useEffect(() => {
        setType(searchParams.get("type") || "");
        setLocation(searchParams.get("location") || "");
        setPrice(searchParams.get("price") || "");
        setCategoryId(searchParams.get("categoryId") || "");
        setAmenity(searchParams.get("amenity") || "");
        setTitle(searchParams.get("title") || "");
    }, [searchParams]);

    const handleApply = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());

        if (type.trim()) params.set("type", type.trim());
        else params.delete("type");

        if (location.trim()) params.set("location", location.trim());
        else params.delete("location");

        if (price) params.set("price", price);
        else params.delete("price");

        if (categoryId) params.set("categoryId", categoryId);
        else params.delete("categoryId");

        if (amenity) params.set("amenity", amenity);
        else params.delete("amenity");

        if (title.trim()) params.set("title", title.trim());
        else params.delete("title");

        params.delete("page"); // reset to page 1 on new search

        startTransition(() => {
            router.push(`/properties?${params.toString()}`);
            setIsMobileOpen(false);
        });
    };

    const handleClear = () => {
        setType("");
        setLocation("");
        setPrice("");
        setCategoryId("");
        setAmenity("");
        setTitle("");
        const params = new URLSearchParams();
        startTransition(() => {
            router.push(`/properties`);
            setIsMobileOpen(false);
        });
    };

    return (
        <div className="w-full">
            {/* Mobile Filter Toggle */}
            <div className="md:hidden mb-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="w-full flex justify-between items-center py-5 rounded-xl border-zinc-200 shadow-2xs font-semibold cursor-pointer"
                >
                    <div className="flex items-center gap-2">
                        <SlidersHorizontal className="h-4 w-4 text-emerald-600" />
                        <span>Filter Properties</span>
                        {activeFiltersCount > 0 && (
                            <span className="bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                                {activeFiltersCount}
                            </span>
                        )}
                    </div>
                    {isMobileOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
            </div>

            {/* Filter Form Card */}
            <form 
                onSubmit={handleApply} 
                className={`${isMobileOpen ? 'flex' : 'hidden'} md:flex bg-white border border-zinc-200/90 shadow-xs p-5 sm:p-6 rounded-2xl flex-col gap-4.5`}
            >
                <div className="flex justify-between items-center pb-2 border-b border-zinc-100">
                    <div className="flex items-center gap-2">
                        <SlidersHorizontal className="h-4 w-4 text-emerald-600" />
                        <h2 className="font-bold text-base text-zinc-900">Filters</h2>
                    </div>
                    {activeFiltersCount > 0 && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="text-xs text-muted-foreground hover:text-red-600 flex items-center gap-1 transition-colors cursor-pointer"
                        >
                            <RotateCcw className="h-3 w-3" />
                            <span>Reset</span>
                        </button>
                    )}
                </div>

                {/* Search Title */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-zinc-700 flex items-center gap-1.5">
                        <Search className="h-3.5 w-3.5 text-zinc-400" />
                        Property Keyword
                    </label>
                    <Input
                        placeholder="e.g. Modern, Studio"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="rounded-xl border-zinc-200 text-sm h-10"
                    />
                </div>

                {/* Property Type */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-zinc-700 flex items-center gap-1.5">
                        <Home className="h-3.5 w-3.5 text-zinc-400" />
                        Property Type
                    </label>
                    <Input
                        placeholder="e.g. Apartment, Sublet"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="rounded-xl border-zinc-200 text-sm h-10"
                    />
                </div>

                {/* Category Dropdown */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-zinc-700 flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-zinc-400" />
                        Category
                    </label>
                    <Select value={categoryId} onValueChange={(val) => setCategoryId(val === "all" ? "" : val)}>
                        <SelectTrigger className="rounded-xl border-zinc-200 text-sm h-10">
                            <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories.map((cat: any) => (
                                <SelectItem key={cat.id} value={cat.id}>
                                    {cat.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Amenity Dropdown */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-zinc-700 flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-zinc-400" />
                        Key Amenity
                    </label>
                    <Select value={amenity} onValueChange={(val) => setAmenity(val === "all" ? "" : val)}>
                        <SelectTrigger className="rounded-xl border-zinc-200 text-sm h-10">
                            <SelectValue placeholder="Any Amenity" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="all">Any Amenity</SelectItem>
                            {amenities.map((am: any) => (
                                <SelectItem key={am.id} value={am.id}>
                                    {am.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Location */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-zinc-700 flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-zinc-400" />
                        Location / Area
                    </label>
                    <Input
                        placeholder="e.g. Dhanmondi, Uttara"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="rounded-xl border-zinc-200 text-sm h-10"
                    />
                </div>

                {/* Max Price Slider */}
                <div className="flex flex-col gap-2 pt-1">
                    <div className="flex justify-between items-baseline">
                        <label className="text-xs font-semibold text-zinc-700">Max Budget</label>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                            {price ? `BDT ${Number(price).toLocaleString()}` : `Up to BDT ${maxPrice.toLocaleString()}`}
                        </span>
                    </div>

                    <Slider
                        defaultValue={[price ? Number(price) : maxPrice]}
                        min={minPrice}
                        max={maxPrice}
                        step={500}
                        onValueChange={(value) => setPrice(value[0].toString())}
                        className="my-1"
                    />
                    <div className="flex justify-between text-[11px] text-muted-foreground">
                        <span>BDT {minPrice.toLocaleString()}</span>
                        <span>BDT {maxPrice.toLocaleString()}</span>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 pt-2 border-t border-zinc-100">
                    <Button 
                        type="button" 
                        variant="outline" 
                        className="flex-1 rounded-xl font-medium border-zinc-200 cursor-pointer" 
                        onClick={handleClear} 
                        disabled={isPending}
                    >
                        Clear
                    </Button>
                    <Button 
                        type="submit" 
                        className="flex-1 rounded-xl font-semibold bg-zinc-900 hover:bg-zinc-800 text-white shadow-xs cursor-pointer" 
                        disabled={isPending}
                    >
                        {isPending ? (
                            <><Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> Applying</>
                        ) : (
                            "Apply Filters"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}

