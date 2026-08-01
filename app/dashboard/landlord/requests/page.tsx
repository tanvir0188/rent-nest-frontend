import { getLandlordRequests, updateRequestStatus } from "../_actions/landlordActions";
import { RentalRequestsTable } from "@/components/shared/RentalRequestsTable";

export default async function LandlordRequestsPage() {
    const requests = await getLandlordRequests() || [];

    return (
        <div className="space-y-6 max-w-6xl mx-auto w-full">
            <RentalRequestsTable requests={requests} onUpdateStatus={updateRequestStatus} />
        </div>
    );
}
