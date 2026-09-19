import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PropertyImage } from "@/components/shared/PropertyImage";
import { Property } from "../_acitons/propertyActions";
import { MapPin, ArrowUpRight, Heart } from "lucide-react";

export function PropertyCard({ prop }: { prop: Property }) {
    const formattedPrice = typeof prop.price === "number" ? prop.price.toLocaleString() : prop.price;

    return (
        <Card className="group flex flex-col overflow-hidden h-full rounded-2xl border border-zinc-200/90 hover:border-zinc-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white">
            {/* Image Container with Badges */}
            <div className="h-52 w-full bg-zinc-100 relative overflow-hidden">
                <PropertyImage
                    src={prop.image}
                    alt={prop.title || "Property"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Availability Badge */}
                <div className="absolute top-3 left-3 z-10">
                    <span
                        className={`text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full backdrop-blur-md flex items-center gap-1.5 shadow-sm ${prop.isAvailable
                                ? "bg-emerald-600/90 text-white"
                                : "bg-zinc-800/85 text-zinc-200"
                            }`}
                    >
                        <span className={`h-1.5 w-1.5 rounded-full ${prop.isAvailable ? "bg-white animate-pulse" : "bg-zinc-400"}`} />
                        {prop.isAvailable ? "Available" : "Rented"}
                    </span>
                </div>

                {/* Wishlist Button */}
                {/* <div className="absolute top-3 right-3 z-10">
                    <button 
                        type="button" 
                        aria-label="Save to favorites"
                        className="h-8 w-8 rounded-full bg-white/90 hover:bg-white text-zinc-600 hover:text-red-500 backdrop-blur-md flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                    >
                        <Heart className="h-4 w-4" />
                    </button>
                </div> */}

                {/* Property Type Badge */}
                {prop.type && (
                    <div className="absolute bottom-3 left-3 z-10">
                        <span className="px-2.5 py-0.5 text-[11px] font-semibold bg-zinc-900/80 text-white backdrop-blur-md rounded-md shadow-xs">
                            {prop.type}
                        </span>
                    </div>
                )}
            </div>

            {/* Content Details */}
            <CardHeader className="p-4 pb-2">
                <Link href={`/properties/${prop.id}`} className="group/title">
                    <h3 className="text-base font-bold text-zinc-900 line-clamp-1 group-hover/title:text-emerald-600 transition-colors">
                        {prop.title}
                    </h3>
                </Link>
                <p className="text-xs text-muted-foreground flex items-center gap-1 line-clamp-1 mt-1">
                    <MapPin className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>{prop.location || "Location unlisted"}</span>
                </p>
            </CardHeader>

            <CardContent className="px-4 py-2 flex-1 flex flex-col justify-end">
                <div className="pt-3 flex items-baseline justify-between border-t border-zinc-100">
                    <div>
                        <span className="text-lg font-black text-zinc-900">BDT {formattedPrice}</span>
                        <span className="text-xs font-normal text-muted-foreground"> / month</span>
                    </div>
                    {prop.category?.title && (
                        <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                            {prop.category.title}
                        </span>
                    )}
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-2">
                <Link href={`/properties/${prop.id}`} className="w-full">
                    <Button
                        variant="outline"
                        className="w-full rounded-xl font-semibold border-zinc-200 group-hover:bg-zinc-900 group-hover:text-white group-hover:border-zinc-900 transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                    >
                        <span>View Details</span>
                        <ArrowUpRight className="h-4 w-4" />
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}

