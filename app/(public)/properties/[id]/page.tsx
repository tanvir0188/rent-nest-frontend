import config from "@/config/config";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { getMe } from "@/service/getMe";
import { getPropertyDetails } from "../../_acitons/propertyActions";

export default async function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    // Fetch user session to check auth
    const session = await getMe();
    const user = session?.success ? session.data : null;

    // Fetch details
    const property = await getPropertyDetails(id);
    console.log(`Property detail: ${JSON.stringify(property)}`)


    if (!property) {
        return <div className="container py-8 text-center text-red-500 mt-20 text-xl font-bold">Property not found.</div>;
    }

    return (


        <div className="container mx-auto py-8 max-w-4xl mt-6">
            <Link href="/" className="text-blue-500 hover:underline mb-6 inline-block font-medium">&larr; Back to properties</Link>

            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-4xl font-bold">{property.title}</h1>
                    <p className="text-xl text-muted-foreground mt-2">{property.location}</p>
                </div>
                <Badge className="text-lg py-1 px-4" variant={property.status === "AVAILABLE" ? "default" : "secondary"}>
                    {property.status}
                </Badge>
            </div>

            <Card className="mb-8 bg-zinc-50/50">
                <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-4 text-lg">
                        <div><span className="font-bold text-muted-foreground mr-2">Price:</span> ${property.price}/mo</div>
                        <div><span className="font-bold text-muted-foreground mr-2">Type:</span> {property.type}</div>
                    </div>
                </CardContent>
            </Card>

            <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Description</h2>
                <p className="text-lg leading-relaxed text-zinc-700">{property.description || "No description provided."}</p>
            </div>

            <div className="flex gap-4 p-6 border rounded-lg bg-zinc-100 items-center justify-between">
                <div>
                    <h3 className="font-bold text-lg">Interested in this property?</h3>
                    <p className="text-muted-foreground">Send a request to the landlord.</p>
                </div>
                {user ? (
                    user.profile.role === "TENANT" ? (
                        <Button size="lg">Request to Rent</Button>
                    ) : (
                        <span className="text-muted-foreground italic">Only tenants can request to rent.</span>
                    )
                ) : (
                    // <Link href={`/auth/login?redirectTo=/properties/${id}`}>
                    <Link href={`/auth/login`}>
                        <Button size="lg" variant="default">Login to Request</Button>
                    </Link>
                )}
            </div>
        </div>

    );
}
