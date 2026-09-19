"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSearch() {
    const router = useRouter();
    const [location, setLocation] = useState("");
    const [type, setType] = useState("");
    const [title, setTitle] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (location.trim()) params.set("location", location.trim());
        if (type.trim()) params.set("type", type.trim());
        if (title.trim()) params.set("title", title.trim());

        router.push(`/properties?${params.toString()}`);
    };

    return (
        <form 
            onSubmit={handleSearch}
            className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 text-zinc-800"
        >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Location */}
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200/80 focus-within:border-zinc-900 focus-within:bg-white transition-all">
                    <MapPin className="h-5 w-5 text-emerald-600 shrink-0" />
                    <div className="flex flex-col text-left flex-1 min-w-0">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Location</span>
                        <input
                            type="text"
                            placeholder="e.g. Uttara, Dhanmondi"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full bg-transparent text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Property Type */}
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200/80 focus-within:border-zinc-900 focus-within:bg-white transition-all">
                    <Home className="h-5 w-5 text-emerald-600 shrink-0" />
                    <div className="flex flex-col text-left flex-1 min-w-0">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Property Type</span>
                        <input
                            type="text"
                            placeholder="e.g. Apartment, House"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full bg-transparent text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Keyword & Submit */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200/80 focus-within:border-zinc-900 focus-within:bg-white transition-all flex-1 min-w-0">
                        <Search className="h-5 w-5 text-zinc-400 shrink-0" />
                        <div className="flex flex-col text-left flex-1 min-w-0">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Keyword</span>
                            <input
                                type="text"
                                placeholder="e.g. Modern, Studio"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-transparent text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
                            />
                        </div>
                    </div>

                    <Button 
                        type="submit" 
                        className="h-full px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-semibold flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                        <Search className="h-4 w-4" />
                        <span className="hidden lg:inline">Search</span>
                    </Button>
                </div>
            </div>
        </form>
    );
}
