import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PropertyImage } from "@/components/shared/PropertyImage";
import { Property } from "../_acitons/propertyActions";

export function PropertyCard({ prop }: { prop: Property }) {
    return (
        <Card className="flex flex-col overflow-hidden h-full">
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
                    <CardTitle className="text-lg line-clamp-1">{prop.title}</CardTitle>
                    <Badge variant={prop.isAvailable ? "default" : "secondary"}>
                        {prop.isAvailable ? "AVAILABLE" : "UNAVAILABLE"}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="text-2xl font-bold mb-2">BDT {prop.price}</p>
                <p className="text-muted-foreground line-clamp-1">{prop.location}</p>
                <p className="text-sm mt-2 font-medium bg-secondary w-fit px-2 py-1 rounded">{prop.type}</p>
            </CardContent>
            <CardFooter>
                <Link href={`/properties/${prop.id}`} className="w-full">
                    <Button className="w-full">View Details</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
