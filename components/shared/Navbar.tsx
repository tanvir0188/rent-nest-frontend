import Link from "next/link";
import { Suspense } from "react";
import NavbarAuth from "./NavbarAuth";
import { Skeleton } from "@/components/ui/skeleton";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <nav className="flex justify-between items-center p-4">
                <div className="flex items-center gap-4 flex-1">
                    <Link href="/" className="font-bold text-xl mr-4">RentNest</Link>
                </div>

                <div className="flex gap-4 items-center">
                    <Suspense fallback={
                        <>
                            <Skeleton className="h-10 w-24" />
                            <Skeleton className="h-10 w-24" />
                        </>
                    }>
                        <NavbarAuth />
                    </Suspense>
                </div>
            </nav>
        </header>
    );
}
