import { getRentalRequests } from "../_actions/tenantActions";
import { TenantRequestsTable } from "../_components/TenantRequestsTable";

export default async function TenantRequestsPage() {
    const requests = await getRentalRequests();

    if (!requests) {
        return <div className="text-red-500">Failed to load rental requests or unauthorized.</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Rental Requests</h1>
                <p className="text-muted-foreground mt-2">View and manage all your property rental requests.</p>
            </div>

            <TenantRequestsTable requests={requests} />
        </div>
    );
}
