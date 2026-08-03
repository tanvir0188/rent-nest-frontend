import { getPublicProperties } from "../_acitons/propertyActions";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PropertyImage } from "@/components/shared/PropertyImage";
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
                        <Card key={prop.id} className="flex flex-col overflow-hidden">
                            {prop.image && (
                                <div className="h-48 w-full bg-zinc-100 relative">
                                    <PropertyImage
                                        src={prop.image}
                                        alt={prop.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            )}
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle>{prop.title}</CardTitle>
                                    <Badge variant={prop.isAvailable ? "default" : "secondary"}>
                                        {prop.isAvailable ? "AVAILABLE" : "UNAVAILABLE"}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <p className="text-2xl font-bold mb-2">BDT {prop.price}</p>
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

            {properties.meta && properties.data && properties.data.length > 0 && (
                <div className="mt-8">
                    <PublicPagination meta={properties.meta} />
                </div>
            )}
        </div>
    );
}
