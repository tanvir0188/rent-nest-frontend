import { getPublicProperties } from "../_acitons/propertyActions";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PropertyCard } from "./PropertyCard";
import { PublicPagination } from "./PublicPagination";

export default async function PropertyList({ searchParams }: { searchParams: { type?: string, location?: string, price?: string, categoryId?: string, amenity?: string, title?: string, page?: string, size?: string } }) {
    const properties = await getPublicProperties(searchParams);

    return (
        <div className="flex-1">
            {properties.meta?.totalItem === 0 || !properties.data || properties.data.length === 0 ? (
                <p>No properties found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {properties.data.map((prop) => (
                        <PropertyCard key={prop.id} prop={prop as any} />
                    ))}
                </div>
            )}

            {properties.meta && properties.data && properties.data.length > 0 && (
                <div className="mt-8">
                    <PublicPagination meta={properties.meta} />
                </div>
            )}
        </div>
    );
}
