import { getLandlordProperties } from "../_actions/landlordActions";
import { LandlordPropertiesTable } from "../_components/LandlordPropertiesTable";
import { getFilters } from "@/app/(public)/_acitons/propertyActions";

export default async function LandlordPropertiesPage() {
    const [properties, filters] = await Promise.all([
        getLandlordProperties(),
        getFilters()
    ]);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">My Properties</h1>
                <p className="text-muted-foreground mt-1">Manage and update all your active property listings.</p>
            </div>

            <LandlordPropertiesTable 
                properties={properties || []} 
                categories={filters?.categories || []} 
                amenities={filters?.amenities || []} 
            />
        </div>
    );
}
