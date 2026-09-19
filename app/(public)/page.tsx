import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FeaturedCarousel } from "./_components/FeaturedCarousel";
import { HeroSearch } from "./_components/HeroSearch";
import { getPublicProperties } from "./_acitons/propertyActions";
import { ShieldCheck, MessageSquareCheck, KeyRound, ArrowRight, Sparkles } from "lucide-react";

export default async function LandingPage() {
    // Fetch top 6 featured properties
    const properties = await getPublicProperties({ size: 6 });

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative w-full min-h-[640px] lg:min-h-[700px] flex items-center justify-center bg-zinc-950 text-white overflow-hidden py-20 px-4">
                {/* Background Image with Dark Vignette */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')" }}
                />
                <div className="absolute inset-0 bg-radial from-transparent via-zinc-950/60 to-zinc-950" />

                <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center gap-6">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold tracking-wide text-zinc-200 shadow-sm">
                        <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                        <span>The Modern Way to Rent in Bangladesh</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1]">
                        Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Dream Home</span> With Confidence
                    </h1>

                    {/* Subtitle */}
                    <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl leading-relaxed font-normal">
                        Explore verified apartments, houses, and sublets. Direct landlord connections, transparent pricing, and zero middleman surprises.
                    </p>

                    {/* Hero Search Box */}
                    <div className="w-full mt-4">
                        <HeroSearch />
                    </div>

                    {/* Quick Badges / Stats */}
                    <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400 mt-2 font-medium">
                        <span className="flex items-center gap-1.5">
                            <ShieldCheck className="h-4 w-4 text-emerald-400" /> 100% Verified Properties
                        </span>
                        <span className="flex items-center gap-1.5">
                            <KeyRound className="h-4 w-4 text-teal-400" /> Instant Tour Requests
                        </span>
                        <span className="flex items-center gap-1.5">
                            <MessageSquareCheck className="h-4 w-4 text-cyan-400" /> Direct Landlord Chat
                        </span>
                    </div>
                </div>
            </section>

            {/* Trust / Value Props Section */}
            <section className="py-16 bg-zinc-50 border-b border-zinc-200/70">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-xs hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-zinc-900 text-base mb-1">Verified Listings</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Every house and apartment is curated with authentic photos, accurate locations, and genuine details.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-xs hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
                                <MessageSquareCheck className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-zinc-900 text-base mb-1">Direct Landlord Contact</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Connect directly with property owners, negotiate lease terms, and eliminate arbitrary broker fees.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-xs hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100">
                                <KeyRound className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-zinc-900 text-base mb-1">Hassle-Free Requests</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Submit rental requests directly through your dashboard and track approval status in real-time.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Properties Section */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1 block">Curated Picks</span>
                        <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">Featured Properties</h2>
                        <p className="text-muted-foreground text-sm sm:text-base mt-1.5 max-w-xl">
                            Explore our top-rated rental properties available right now for immediate move-in.
                        </p>
                    </div>

                    <Link href="/properties" className="hidden sm:inline-flex">
                        <Button variant="outline" className="rounded-xl font-semibold gap-1.5 hover:bg-zinc-900 hover:text-white transition-all cursor-pointer">
                            <span>Browse All Properties</span>
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                {properties.data && properties.data.length > 0 ? (
                    <div className="relative px-2 sm:px-0">
                        <FeaturedCarousel properties={properties.data} />
                    </div>
                ) : (
                    <div className="text-center py-16 px-4 bg-zinc-50 border border-zinc-200 rounded-2xl">
                        <p className="text-zinc-600 font-medium">No featured properties available right now.</p>
                        <Link href="/properties" className="inline-block mt-4">
                            <Button variant="outline">Explore All Properties</Button>
                        </Link>
                    </div>
                )}

                <div className="mt-10 text-center sm:hidden">
                    <Link href="/properties">
                        <Button className="w-full rounded-xl py-6 text-base font-semibold">
                            Browse All Properties
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}

