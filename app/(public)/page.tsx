import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPublicProperties } from "./_acitons/propertyActions";
import FilterSidebar from "./_components/FilterSidebar";
import PropertyListWrapper from "./_components/PropertyListWrapper";
import { Suspense } from "react";

export default async function PropertiesPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {

    const resolvedParams = await searchParams;

    const type = typeof resolvedParams.type === 'string' ? resolvedParams.type : undefined;
    const location = typeof resolvedParams.location === 'string' ? resolvedParams.location : undefined;
    const price = typeof resolvedParams.price === 'string' ? resolvedParams.price : undefined;

    return (

        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">Available Properties</h1>

            <div className="flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-1/4">
                    <Suspense fallback={<div className="p-6 bg-zinc-50 border rounded-xl h-64" />}>
                        <FilterSidebar />
                    </Suspense>
                </aside>
                <PropertyListWrapper serverKey={JSON.stringify(resolvedParams)}>
                    <PropertyList params={{ type, location, price }} />
                </PropertyListWrapper>
            </div>
        </div>
    );
}

async function PropertyList({ params }: { params: { type?: string, location?: string, price?: string } }) {
    const properties = await getPublicProperties(params);
    return (
        <div className="flex-1">
            {properties.length === 0 ? (
                <p>No properties found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {properties.map((prop) => (
                        <Card key={prop.id} className="flex flex-col">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle>{prop.title}</CardTitle>
                                    <Badge variant={prop.isAvailable ? "default" : "secondary"}>
                                        {prop.isAvailable ? "AVAILABLE" : "UNAVAILABLE"}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <p className="text-2xl font-bold mb-2">${prop.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                                <p className="text-muted-foreground">{prop.location}</p>
                                <p className="text-sm mt-2 font-medium bg-secondary w-fit px-2 py-1 rounded">{prop.type}</p>
                            </CardContent>
                            <CardFooter>
                                <Link href={`/properties/${prop.id}`} className="w-full">
                                    <Button className="w-full">View Details</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
