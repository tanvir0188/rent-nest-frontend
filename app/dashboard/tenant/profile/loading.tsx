import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";

export default function ProfileLoading() {
    return (
        <div className="space-y-6">
            <div>
                <Skeleton className="h-9 w-48 mb-2" />
                <Skeleton className="h-5 w-80" />
            </div>
            
            <Card className="max-w-xl mx-auto shadow-sm border border-zinc-200">
                <CardHeader className="space-y-2">
                    <Skeleton className="h-7 w-40" />
                    <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                        <Skeleton className="h-20 w-20 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-4 w-48" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-10 w-full rounded-2xl" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-full rounded-2xl" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-10 w-full rounded-2xl" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-24 w-full rounded-2xl" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end pt-2">
                    <Skeleton className="h-10 w-32 rounded-4xl" />
                </CardFooter>
            </Card>
        </div>
    );
}
