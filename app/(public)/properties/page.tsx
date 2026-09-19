import { Suspense } from "react";
import { getFilters } from "../_acitons/propertyActions";
import FilterSidebar from "../_components/FilterSidebar";
import PropertyListWrapper from "../_components/PropertyListWrapper";
import PropertyList from "../_components/PropertyList";



export default async function PropertiesPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const resolvedParams = await searchParams;

    const type = typeof resolvedParams.type === 'string' ? resolvedParams.type : undefined;
    const location = typeof resolvedParams.location === 'string' ? resolvedParams.location : undefined;
    const price = typeof resolvedParams.price === 'string' ? resolvedParams.price : undefined;
    const categoryId = typeof resolvedParams.categoryId === 'string' ? resolvedParams.categoryId : undefined;
    const amenity = typeof resolvedParams.amenity === 'string' ? resolvedParams.amenity : undefined;
    const title = typeof resolvedParams.title === 'string' ? resolvedParams.title : undefined;
    const page = typeof resolvedParams.page === 'string' ? resolvedParams.page : "1";
    const size = typeof resolvedParams.size === 'string' ? resolvedParams.size : "9";

    const filters = await getFilters();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
            {/* Page Header */}
            <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1 block">Rental Marketplace</span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">Available Properties</h1>
                <p className="text-muted-foreground text-sm sm:text-base mt-1 max-w-2xl">
                    Discover and filter through verified homes, apartments, and sublets across popular neighborhoods.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
                <aside className="w-full md:w-[280px] lg:w-[320px] shrink-0">
                    <Suspense fallback={<div className="p-6 bg-zinc-50 border rounded-2xl h-80 animate-pulse" />}>
                        <FilterSidebar
                            categories={filters?.categories || []}
                            amenities={filters?.amenities || []}
                            minPrice={filters?.LowestPropertyPrice ?? 0}
                            maxPrice={filters?.HighestPropertyPrice ?? 50000}
                        />
                    </Suspense>
                </aside>
                
                <div className="flex-1 min-w-0 w-full">
                    <PropertyListWrapper serverKey={JSON.stringify(resolvedParams)}>
                        <Suspense fallback={
                            <div className="flex-1">
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <div key={i} className="flex flex-col gap-3 p-4 border rounded-2xl bg-white animate-pulse">
                                            <div className="h-48 w-full bg-zinc-200 rounded-xl" />
                                            <div className="h-5 w-3/4 bg-zinc-200 rounded" />
                                            <div className="h-4 w-1/2 bg-zinc-200 rounded" />
                                            <div className="h-8 w-full bg-zinc-200 rounded-xl mt-2" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }>
                            <PropertyList searchParams={{ type, location, price, categoryId, amenity, title, page, size }} />
                        </Suspense>
                    </PropertyListWrapper>
                </div>
            </div>
        </div>
    );
}

