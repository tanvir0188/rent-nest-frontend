import { PropertiesTable } from "@/components/shared/PropertiesTable";
import { getPublicProperties, getFilters } from "@/app/(public)/_acitons/propertyActions";
import { Card } from "@/components/ui/card";
import { PaginationBlock } from "@/components/shared/PaginationBlock";

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function AdminPropertiesPage({ searchParams }: Props) {
    const sp = await searchParams;
    const page = typeof sp.page === "string" ? sp.page : "1";
    const size = typeof sp.size === "string" ? sp.size : "9";

    const [{ data: properties, meta }, filters] = await Promise.all([
        getPublicProperties({ page, size }),
        getFilters()
    ]);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">System Properties</h1>
                <p className="text-muted-foreground mt-1">
                    Manage all properties across the platform. You can edit property details and reassign landlord IDs.
                </p>
            </div>

            <Card className="p-6 border-zinc-200/80 shadow-sm rounded-2xl bg-white">
                <PropertiesTable
                    properties={properties}
                    categories={filters.categories}
                    amenities={filters.amenities}
                    isAdmin={true}
                />
                {meta && <PaginationBlock meta={meta} />}
            </Card>
        </div>
    );
}
