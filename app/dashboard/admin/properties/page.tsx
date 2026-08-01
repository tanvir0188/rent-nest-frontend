import { PropertiesTable } from "@/components/shared/PropertiesTable";
import { getPublicProperties, getFilters } from "@/app/(public)/_acitons/propertyActions";
import { Card } from "@/components/ui/card";

export default async function AdminPropertiesPage() {
    const [properties, filters] = await Promise.all([
        getPublicProperties(),
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
            </Card>
        </div>
    );
}
