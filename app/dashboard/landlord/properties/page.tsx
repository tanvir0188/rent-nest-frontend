import { getLandlordProperties } from "../_actions/landlordActions";
import { PropertiesTable } from "@/components/shared/PropertiesTable";
import { PaginationBlock } from "@/components/shared/PaginationBlock";
import { getFilters } from "@/app/(public)/_acitons/propertyActions";

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function LandlordPropertiesPage({ searchParams }: Props) {
    const sp = await searchParams;
    const page = typeof sp.page === "string" ? parseInt(sp.page, 10) : 1;
    const size = typeof sp.size === "string" ? parseInt(sp.size, 10) : 10;

    const [propertiesData, filters] = await Promise.all([
        getLandlordProperties(page, size),
        getFilters()
    ]);

    const properties = propertiesData?.data || [];
    const meta = propertiesData?.meta || null;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">My Properties</h1>
                <p className="text-muted-foreground mt-1">Manage and update all your active property listings.</p>
            </div>

            <PropertiesTable 
                properties={properties} 
                categories={filters?.categories || []} 
                amenities={filters?.amenities || []} 
            />
            <PaginationBlock meta={meta} />
        </div>
    );
}
