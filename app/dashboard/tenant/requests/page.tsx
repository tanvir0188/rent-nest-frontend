import { getRentalRequests } from "../_actions/tenantActions";
import { TenantRequestsTable } from "../_components/TenantRequestsTable";
import { PaginationBlock } from "@/components/shared/PaginationBlock";

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function TenantRequestsPage({ searchParams }: Props) {
    const sp = await searchParams;
    const page = typeof sp.page === "string" ? parseInt(sp.page, 10) : 1;
    const size = typeof sp.size === "string" ? parseInt(sp.size, 10) : 10;

    const { data: requests, meta } = await getRentalRequests(page, size);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Rental Requests</h1>
                <p className="text-muted-foreground mt-2">View and manage all your property rental requests.</p>
            </div>

            <TenantRequestsTable requests={requests || []} />
            <PaginationBlock meta={meta} />
        </div>
    );
}
