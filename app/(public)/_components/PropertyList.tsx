import { getPublicProperties } from "../_acitons/propertyActions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PropertyCard } from "./PropertyCard";
import { PublicPagination } from "./PublicPagination";
import { SearchX, Building2, RotateCcw } from "lucide-react";

export default async function PropertyList({ searchParams }: { searchParams: { type?: string, location?: string, price?: string, categoryId?: string, amenity?: string, title?: string, page?: string, size?: string } }) {
    const properties = await getPublicProperties(searchParams);
    const totalItems = properties.meta?.totalItem ?? properties.data?.length ?? 0;
    const hasActiveFilters = Boolean(searchParams.type || searchParams.location || searchParams.price || searchParams.categoryId || searchParams.amenity || searchParams.title);

    return (
        <div className="flex-1 w-full">
            {/* Header / Results bar */}
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-zinc-100">
                <div>
                    <p className="text-sm font-medium text-zinc-600">
                        Showing <span className="font-bold text-zinc-900">{totalItems}</span> {totalItems === 1 ? "property" : "properties"}
                    </p>
                </div>
                {hasActiveFilters && (
                    <Link href="/properties">
                        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-red-600 flex items-center gap-1.5 h-8 cursor-pointer">
                            <RotateCcw className="h-3 w-3" />
                            <span>Clear all filters</span>
                        </Button>
                    </Link>
                )}
            </div>

            {totalItems === 0 ? (
                <div className="flex flex-col items-center justify-center text-center p-12 bg-zinc-50/80 rounded-2xl border border-zinc-200/80 my-4">
                    <div className="h-16 w-16 rounded-2xl bg-zinc-100 text-zinc-400 flex items-center justify-center mb-4">
                        <SearchX className="h-8 w-8 stroke-[1.5]" />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 mb-1">No matching properties found</h3>
                    <p className="text-sm text-muted-foreground max-w-md mb-6 leading-relaxed">
                        We couldn't find any rentals matching your exact filter criteria. Try expanding your price range, searching another location, or resetting your filters.
                    </p>
                    <Link href="/properties">
                        <Button className="rounded-xl font-semibold bg-zinc-900 hover:bg-zinc-800 text-white cursor-pointer">
                            Reset All Filters
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {properties.data.map((prop) => (
                        <PropertyCard key={prop.id} prop={prop as any} />
                    ))}
                </div>
            )}

            {properties.meta && properties.data && properties.data.length > 0 && (
                <div className="mt-10 flex justify-center">
                    <PublicPagination meta={properties.meta} />
                </div>
            )}
        </div>
    );
}

