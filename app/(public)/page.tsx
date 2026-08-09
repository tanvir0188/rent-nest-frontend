import Link from "next/link";
import { Button } from "@/components/ui/button";

import { PropertyCard } from "./_components/PropertyCard";
import { FeaturedCarousel } from "./_components/FeaturedCarousel";
import { getPublicProperties } from "./_acitons/propertyActions";

export default async function LandingPage() {
    // Fetch some featured properties (e.g. top 6)
    const properties = await getPublicProperties({ size: 6 });

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative w-full h-[600px] flex items-center justify-center bg-zinc-900 text-white overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop')" }}
                />
                <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center gap-6">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                        Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Perfect Home</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-zinc-300 max-w-2xl">
                        Discover the best properties to rent in your area with Rent Nest. We make finding your dream home simple and secure.
                    </p>
                    <div className="flex gap-4 mt-4">
                        <Link href="/properties">
                            <Button size="lg" className="bg-white text-zinc-900 hover:bg-zinc-200 text-lg px-8 py-6 rounded-full font-semibold">
                                Browse Properties
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Decorative fade at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
            </section>

            {/* Featured Properties Section */}
            <section className="py-24 container mx-auto px-4">
                <div className="flex flex-col items-center text-center mb-16 gap-4">
                    <h2 className="text-3xl md:text-5xl font-bold">Featured Properties</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        Explore our hand-picked selection of premium rental properties tailored for your comfort.
                    </p>
                </div>

                {properties.data && properties.data.length > 0 ? (
                    <div className="px-12 relative max-w-6xl mx-auto">
                        <FeaturedCarousel properties={properties.data} />
                    </div>
                ) : (
                    <div className="text-center text-muted-foreground">
                        <p>No featured properties available right now.</p>
                    </div>
                )}

                <div className="mt-16 text-center">
                    <Link href="/properties">
                        <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg">
                            View All Properties
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
