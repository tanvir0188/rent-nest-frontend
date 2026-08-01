import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
    return (
        <div className="space-y-6 max-w-3xl mx-auto w-full">
            <Skeleton className="h-9 w-36 rounded-xl" />
            <div className="flex justify-between items-start">
                <div className="space-y-2">
                    <Skeleton className="h-9 w-56" />
                    <Skeleton className="h-5 w-40" />
                </div>
                <Skeleton className="h-7 w-20 rounded-full" />
            </div>
            <Card className="rounded-2xl shadow-sm border border-zinc-200/80">
                <CardHeader>
                    <Skeleton className="h-6 w-40" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <Skeleton className="h-9 w-9 rounded-xl" />
                                <div className="space-y-1">
                                    <Skeleton className="h-3 w-16" />
                                    <Skeleton className="h-5 w-32" />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            <Card className="rounded-2xl shadow-sm border border-zinc-200/80">
                <CardHeader>
                    <Skeleton className="h-6 w-24" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-9 w-32 rounded-xl" />
                </CardContent>
            </Card>
        </div>
    );
}
