import { getPublicProperties } from "../_acitons/propertyActions";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function PropertyList({ searchParams }: { searchParams: { title?: string, type?: string, location?: string, price?: string } }) {
    const properties = await getPublicProperties(searchParams);

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
