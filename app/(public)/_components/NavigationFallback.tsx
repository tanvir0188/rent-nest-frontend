"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";

export default function NavigationFallback({ children, serverKey }: { children: ReactNode, serverKey: string }) {
    const searchParams = useSearchParams();
    const currentParams: Record<string, string> = {};
    searchParams.forEach((value, key) => {
        currentParams[key] = value;
    });
    const currentKey = JSON.stringify(currentParams);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentKey !== serverKey) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [currentKey, serverKey]);

    if (loading) {
        return <div className="p-6 bg-zinc-50 border rounded-xl h-64 flex-1 flex items-center justify-center font-bold text-muted-foreground">Loading properties...</div>;
    }

    return <>{children}</>;
}
