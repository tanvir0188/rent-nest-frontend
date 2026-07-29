"use client";

import { useFilterLoading } from "./FilterLoadingContext";
import { useEffect, ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyListWrapper({ children, serverKey }: { children: ReactNode, serverKey: string }) {
    const { isLoading, setLoading } = useFilterLoading();

    // When server re-renders with new params, serverKey changes, reset loading
    useEffect(() => {
        setLoading(false);
    }, [serverKey, setLoading]);

    if (isLoading) {
        return (
            <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex flex-col gap-3 p-4 border rounded-xl">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-20 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
