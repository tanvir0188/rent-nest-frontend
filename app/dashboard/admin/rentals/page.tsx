import { getAdminRentalRequests, adminUpdateRentalRequestStatus } from "../_actions/adminActions";
import { RentalRequestsTable } from "@/components/shared/RentalRequestsTable";
import { Card } from "@/components/ui/card";
import { PaginationBlock } from "@/components/shared/PaginationBlock";

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function AdminRentalsPage({ searchParams }: Props) {
    const sp = await searchParams;
    const page = typeof sp.page === "string" ? parseInt(sp.page, 10) : 1;
    const size = typeof sp.size === "string" ? parseInt(sp.size, 10) : 10;

    const { data: requests, meta } = await getAdminRentalRequests(page, size);

    return (
        <div className="space-y-6 max-w-6xl mx-auto w-full">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">System Rentals</h1>
                <p className="text-muted-foreground mt-1">Manage and moderate all rental requests.</p>
            </div>

            <Card className="p-6 border-zinc-200/80 shadow-sm rounded-2xl bg-white">
                <RentalRequestsTable 
                    requests={requests || []} 
                    onUpdateStatus={adminUpdateRentalRequestStatus} 
                    isAdmin={true}
                />
                <PaginationBlock meta={meta} />
            </Card>
        </div>
    );
}
