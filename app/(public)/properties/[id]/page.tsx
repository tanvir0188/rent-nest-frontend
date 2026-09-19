import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { getMe } from "@/service/getMe";
import { getPropertyDetails } from "../../_acitons/propertyActions";
import { RequestRentDialog } from "../../_components/RequestRentDialog";
import { 
    Star, 
    MapPin, 
    ArrowLeft, 
    Home, 
    Tag, 
    Calendar, 
    ShieldCheck, 
    CheckCircle2, 
    BadgeCheck, 
    User as UserIcon, 
    Mail, 
    Sparkles,
    Lock
} from "lucide-react";
import { PropertyImage } from "@/components/shared/PropertyImage";

export default async function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    // Fetch user session to check auth
    const session = await getMe();
    const user = session?.success ? session.data : null;

    // Fetch details
    const property = await getPropertyDetails(id);

    if (!property) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <div className="h-16 w-16 mx-auto rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-4">
                    <Home className="h-8 w-8 stroke-[1.5]" />
                </div>
                <h1 className="text-2xl font-bold text-zinc-900 mb-2">Property Not Found</h1>
                <p className="text-muted-foreground mb-6">The listing you are looking for may have been removed or rented out.</p>
                <Link href="/properties">
                    <Button variant="outline" className="rounded-xl">Browse Available Properties</Button>
                </Link>
            </div>
        );
    }

    const formattedPrice = typeof property.price === "number" ? property.price.toLocaleString() : property.price;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-24 lg:pb-12">
            {/* Back Navigation */}
            <Link 
                href="/properties" 
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-500 hover:text-zinc-900 transition-colors mb-6 group cursor-pointer"
            >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to all properties</span>
            </Link>

            {/* Title & Location Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight">
                        {property.title}
                    </h1>
                    <p className="text-sm sm:text-base text-muted-foreground flex items-center gap-1.5 mt-2">
                        <MapPin className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>{property.location || "Location not specified"}</span>
                    </p>
                </div>

                <div>
                    {property.isAvailable ? (
                        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/80 shadow-2xs">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            Available for Rent
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 text-zinc-600 text-xs font-bold border border-zinc-200">
                            <span className="h-2 w-2 rounded-full bg-zinc-400" />
                            Currently Occupied
                        </span>
                    )}
                </div>
            </div>

            {/* Main Featured Photo */}
            <div className="mb-10 rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-200/90 shadow-md h-[320px] sm:h-[460px] lg:h-[500px] w-full bg-zinc-100 relative">
                <PropertyImage 
                    src={property.image} 
                    alt={property.title || "Property listing"} 
                    fill
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    priority
                    className="object-cover"
                />
            </div>

            {/* Two Column Layout: Main Content (Left) + Sticky Booking Card (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                
                {/* Left Column (Content) */}
                <div className="lg:col-span-8 space-y-8">
                    
                    {/* Key Specifications Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                        <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/70">
                            <span className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground block mb-1">Monthly Rent</span>
                            <span className="text-base font-bold text-zinc-900">BDT {formattedPrice}</span>
                        </div>

                        <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/70">
                            <span className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground block mb-1">Property Type</span>
                            <span className="text-base font-bold text-zinc-900">{property.type || "Apartment"}</span>
                        </div>

                        <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/70">
                            <span className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground block mb-1">Category</span>
                            <span className="text-base font-bold text-zinc-900">{property.category?.title || "Residential"}</span>
                        </div>

                        <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/70">
                            <span className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground block mb-1">Status</span>
                            <span className="text-base font-bold text-emerald-700">{property.isAvailable ? "Ready to Move" : "Rented"}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-zinc-200/90 shadow-2xs">
                        <h2 className="text-xl font-bold text-zinc-900 mb-4 flex items-center gap-2">
                            <span>About this property</span>
                        </h2>
                        <p className="text-base leading-relaxed text-zinc-700 whitespace-pre-wrap">
                            {property.description || "No specific description has been provided by the landlord for this property listing."}
                        </p>
                    </div>

                    {/* Amenities */}
                    {property.amenities && property.amenities.length > 0 && (
                        <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-zinc-200/90 shadow-2xs">
                            <h2 className="text-xl font-bold text-zinc-900 mb-4 flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-emerald-600" />
                                <span>Amenities & Features</span>
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {property.amenities.map((amenity: any, idx: number) => (
                                    <div 
                                        key={amenity.id || idx}
                                        className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-50 border border-zinc-200/60 text-sm font-medium text-zinc-800"
                                    >
                                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                                        <span className="truncate">{amenity.title || amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Reviews */}
                    {property.reviews && property.reviews.length > 0 && (
                        <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-zinc-200/90 shadow-2xs">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                                    <span>Tenant Reviews</span>
                                </h2>
                                <span className="text-xs text-muted-foreground font-semibold">
                                    {property.reviews.length} {property.reviews.length === 1 ? "review" : "reviews"}
                                </span>
                            </div>

                            <div className="space-y-4">
                                {property.reviews.map((review: any) => (
                                    <div key={review.id} className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/70">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2.5">
                                                <div className="h-8 w-8 rounded-full bg-zinc-200 text-zinc-700 font-bold text-xs flex items-center justify-center">
                                                    {(review.user?.name || "U")[0].toUpperCase()}
                                                </div>
                                                <h3 className="font-semibold text-zinc-900 text-sm">{review.user?.name || "Verified Tenant"}</h3>
                                            </div>
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star 
                                                        key={i} 
                                                        className={`w-3.5 h-3.5 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-zinc-200"}`} 
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-sm text-zinc-600 leading-relaxed pl-10.5">
                                            {review.comment}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column (Sticky Booking Card) */}
                <div className="lg:col-span-4">
                    <div className="sticky top-24 rounded-2xl sm:rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-7 shadow-xl space-y-6">
                        {/* Price Display */}
                        <div className="pb-5 border-b border-zinc-100">
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">Rent Price</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-black text-zinc-900">BDT {formattedPrice}</span>
                                <span className="text-sm font-medium text-muted-foreground">/ month</span>
                            </div>
                        </div>

                        {/* Landlord Information */}
                        <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/70 space-y-3">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">Property Owner</span>
                            <div className="flex items-center gap-3">
                                <div className="h-11 w-11 rounded-full bg-zinc-900 text-white font-bold flex items-center justify-center shrink-0">
                                    {(property.landLord?.name || "L")[0].toUpperCase()}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-1.5">
                                        <p className="font-bold text-sm text-zinc-900 truncate">
                                            {property.landLord?.name || "Verified Landlord"}
                                        </p>
                                        <BadgeCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                                    </div>
                                    <p className="text-xs text-muted-foreground truncate flex items-center gap-1 mt-0.5">
                                        <Mail className="h-3 w-3 text-zinc-400 shrink-0" />
                                        <span>{property.landLord?.email || "Contact via platform"}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Booking / Rental Request CTA */}
                        <div>
                            {user ? (
                                user.profile.role === "TENANT" ? (
                                    <RequestRentDialog 
                                        propertyId={id} 
                                        className="w-full py-6 rounded-xl text-base font-bold bg-zinc-900 hover:bg-zinc-800 text-white shadow-md cursor-pointer"
                                    />
                                ) : (
                                    <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 font-medium text-center">
                                        Logged in as {user.profile.role}. Only tenants can submit rental requests.
                                    </div>
                                )
                            ) : (
                                <Link href={`/auth/login?redirectTo=/properties/${id}`} className="w-full block">
                                    <Button size="lg" className="w-full py-6 rounded-xl text-base font-bold bg-zinc-900 hover:bg-zinc-800 text-white shadow-md cursor-pointer">
                                        Login to Request Rent
                                    </Button>
                                </Link>
                            )}
                        </div>

                        {/* Trust & Guarantee Notes */}
                        <div className="pt-2 border-t border-zinc-100 space-y-2.5 text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                                <span>Zero booking fees on initial inquiry</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Lock className="h-4 w-4 text-teal-600 shrink-0" />
                                <span>Direct tenant-landlord communication</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Mobile Fixed Bottom Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-zinc-200 p-3.5 shadow-2xl flex items-center justify-between gap-4">
                <div>
                    <span className="text-[11px] text-muted-foreground block font-medium">Monthly Rent</span>
                    <span className="text-lg font-black text-zinc-900">BDT {formattedPrice}</span>
                </div>
                <div className="flex-1 max-w-[200px]">
                    {user ? (
                        user.profile.role === "TENANT" ? (
                            <RequestRentDialog 
                                propertyId={id} 
                                className="w-full py-4 rounded-xl text-sm font-bold bg-zinc-900 hover:bg-zinc-800 text-white shadow-sm"
                            />
                        ) : (
                            <span className="text-xs text-muted-foreground italic block text-right">Tenant only</span>
                        )
                    ) : (
                        <Link href={`/auth/login?redirectTo=/properties/${id}`} className="w-full block">
                            <Button size="sm" className="w-full py-4 rounded-xl text-xs font-bold bg-zinc-900 text-white">
                                Login to Rent
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

