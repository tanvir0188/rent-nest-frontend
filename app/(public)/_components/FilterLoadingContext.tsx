"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface FilterLoadingContextType {
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
}

const FilterLoadingContext = createContext<FilterLoadingContextType>({
    isLoading: false,
    setLoading: () => {},
});

export function useFilterLoading() {
    return useContext(FilterLoadingContext);
}

export function FilterLoadingProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);
    const setLoading = useCallback((loading: boolean) => setIsLoading(loading), []);
    return (
        <FilterLoadingContext.Provider value={{ isLoading, setLoading }}>
            {children}
        </FilterLoadingContext.Provider>
    );
}
