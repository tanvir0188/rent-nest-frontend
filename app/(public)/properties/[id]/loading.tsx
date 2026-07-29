import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
    return (
        <div className="container mx-auto py-8 max-w-4xl mt-6">
            <div className="text-blue-500 mb-6 inline-block font-medium">&larr; Back to properties</div>

            <div className="flex justify-between items-start mb-6">
                <div className="w-2/3">
                    <Skeleton className="h-10 w-3/4 mb-2" />
                    <Skeleton className="h-6 w-1/2 mt-2" />
                </div>
                <Skeleton className="h-8 w-24 rounded-full" />
            </div>

            <Card className="mb-8 bg-zinc-50/50">
                <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                        <Skeleton className="h-6 w-1/3" />
                        <Skeleton className="h-6 w-1/3" />
                    </div>
                </CardContent>
            </Card>

            <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Description</h2>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
            </div>

            <div className="flex gap-4 p-6 border rounded-lg bg-zinc-100 items-center justify-between">
                <div>
                    <Skeleton className="h-6 w-64 mb-2" />
                    <Skeleton className="h-4 w-48" />
                </div>
                <Skeleton className="h-10 w-32" />
            </div>
        </div>
    );
}
