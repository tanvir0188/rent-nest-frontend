import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPublicProperties, getFilters } from "./_acitons/propertyActions";
import FilterSidebar from "./_components/FilterSidebar";
import PropertyListWrapper from "./_components/PropertyListWrapper";
import { PaginationBlock } from "@/components/shared/PaginationBlock";
import { Suspense } from "react";

import PropertyList from "./_components/PropertyList";

export default async function PropertiesPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const resolvedParams = await searchParams;

    const type = typeof resolvedParams.type === 'string' ? resolvedParams.type : undefined;
    const location = typeof resolvedParams.location === 'string' ? resolvedParams.location : undefined;
    const price = typeof resolvedParams.price === 'string' ? resolvedParams.price : undefined;
    const categoryId = typeof resolvedParams.categoryId === 'string' ? resolvedParams.categoryId : undefined;
    const amenity = typeof resolvedParams.amenity === 'string' ? resolvedParams.amenity : undefined;
    const title = typeof resolvedParams.title === 'string' ? resolvedParams.title : undefined;
    const page = typeof resolvedParams.page === 'string' ? resolvedParams.page : "1";
    const size = typeof resolvedParams.size === 'string' ? resolvedParams.size : "10";

    const filters = await getFilters();

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">Available Properties</h1>

            <div className="flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-1/4">
                    <Suspense fallback={<div className="p-6 bg-zinc-50 border rounded-xl h-64" />}>
                        <FilterSidebar categories={filters?.categories || []} amenities={filters?.amenities || []} />
                    </Suspense>
                </aside>
                <PropertyListWrapper serverKey={JSON.stringify(resolvedParams)}>
                    <PropertyList searchParams={{ type, location, price, categoryId, amenity, title, page, size }} />
                </PropertyListWrapper>
            </div>
        </div>
    );
}
