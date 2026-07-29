"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { useFilterLoading } from "./FilterLoadingContext";

export default function FilterSidebar() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { setLoading } = useFilterLoading();

    const [type, setType] = useState(searchParams.get("type") || "");
    const [location, setLocation] = useState(searchParams.get("location") || "");
    const [price, setPrice] = useState(searchParams.get("price") || "");

    const handleApply = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());

        if (type) params.set("type", type);
        else params.delete("type");

        if (location) params.set("location", location);
        else params.delete("location");

        if (price) params.set("price", price);
        else params.delete("price");

        setLoading(true);
        router.push(`/?${params.toString()}`);
    };

    const handleClear = () => {
        setType("");
        setLocation("");
        setPrice("");
        const params = new URLSearchParams(searchParams.toString());
        params.delete("type");
        params.delete("location");
        params.delete("price");
        setLoading(true);
        router.push(`/?${params.toString()}`);
    }

    return (
        <form onSubmit={handleApply} className="bg-zinc-50 border p-6 rounded-xl flex flex-col gap-4">
            <h2 className="font-bold text-lg mb-2">Filters</h2>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Type</label>
                <Input
                    placeholder="e.g. Sublet"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />
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
                <b>BDT: {price}</b>

                <div className="flex gap-2">

                    0<Slider defaultValue={[100]} min={0} max={500000} step={1} onValueChange={(value) => setPrice(value[0].toString())} />
                </div>
            </div>

            <div className="flex gap-2 mt-4">
                <Button type="button" variant="outline" className="flex-1" onClick={handleClear}>Clear</Button>
                <Button type="submit" className="flex-1">Apply</Button>
            </div>
        </form>
    );
}
