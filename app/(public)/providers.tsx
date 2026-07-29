"use client";

import { FilterLoadingProvider } from "./_components/FilterLoadingContext";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <FilterLoadingProvider>
            {children}
        </FilterLoadingProvider>
    );
}
