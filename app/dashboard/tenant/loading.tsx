import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TenantDashboardLoading() {
    return (
        <div className="space-y-6">
            <div>
                <Skeleton className="h-9 w-64 mb-2" />
                <Skeleton className="h-5 w-96" />
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-6">
                {[...Array(5)].map((_, i) => (
                    <Card key={i} className="shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <Skeleton className="h-4 w-24" />
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <Skeleton className="h-9 w-12" />
                            <Skeleton className="h-10 w-10 rounded-full" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
