import config from "@/config/config";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

interface Property {
    id: string;
    title: string;
    price: number;
    location: string;
    type: string;
    status: string;
}

export default async function PropertiesPage() {
    // Fetch from backend
    const res = await fetch(`${config.base_url}/api/properties`, {
        next: { revalidate: 60 }
    });
    const result = await res.json();
    const properties: Property[] = result.data || [];

    return (
        <Suspense fallback={<div className="text-center h-screen flex items-center justify-center">Loading properties ...</div>}>


            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6">Available Properties</h1>

                {properties.length === 0 ? (
                    <p>No properties found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {properties.map((prop) => (
                            <Card key={prop.id} className="flex flex-col">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <CardTitle>{prop.title}</CardTitle>
                                        <Badge variant={prop.status === "AVAILABLE" ? "default" : "secondary"}>
                                            {prop.status}
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
        </Suspense>
    );
}
