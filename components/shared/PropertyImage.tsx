"use client";

import { useState } from "react";
import Image from "next/image";

interface PropertyImageProps {
    src: string;
    alt: string;
    fill?: boolean;
    sizes?: string;
    priority?: boolean;
    className?: string;
}

export function PropertyImage({ src, alt, fill, sizes, priority, className }: PropertyImageProps) {
    const [error, setError] = useState(false);

    if (error) {
        return null;
    }

    return (
        <Image
            src={src}
            alt={alt}
            fill={fill}
            sizes={sizes}
            priority={priority}
            className={className}
            onError={() => setError(true)}
        />
    );
}
