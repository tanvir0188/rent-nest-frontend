"use client";

import * as React from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { PropertyCard } from "./PropertyCard";

export function FeaturedCarousel({ properties }: { properties: any[] }) {
    const plugin = React.useRef(
        AutoScroll({ speed: 1, stopOnInteraction: false })
    );

    return (
        <Carousel
            plugins={[plugin.current]}
            opts={{
                align: "start",
                loop: true,
            }}
            className="w-full"
            onMouseEnter={() => plugin.current.stop()}
            onMouseLeave={() => plugin.current.play()}
        >
            <CarouselContent className="-ml-4">
                {properties.map((prop) => (
                    <CarouselItem key={prop.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                        <div className="p-1 h-full">
                            <PropertyCard prop={prop} />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
        </Carousel>
    );
}
