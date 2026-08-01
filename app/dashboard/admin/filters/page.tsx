import { getFilters } from "@/app/(public)/_acitons/propertyActions";
import { FiltersTable } from "./_components/FiltersTable";

export default async function AdminFiltersPage() {
    const filters = await getFilters();

    const categories = filters?.categories || [];
    const amenities = filters?.amenities || [];

    return (
        <div className="space-y-6 max-w-6xl mx-auto w-full">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">System Filters</h1>
                <p className="text-muted-foreground mt-1">Manage categories and amenities for properties.</p>
            </div>

            <FiltersTable categories={categories} amenities={amenities} />
        </div>
    );
}
