import { getLandlordRequests } from "../_actions/landlordActions";
import { LandlordRequestsTable } from "../_components/LandlordRequestsTable";

export default async function LandlordRequestsPage() {
    const requests = await getLandlordRequests() || [];

    return (
        <div className="space-y-6 max-w-6xl mx-auto w-full">
            <LandlordRequestsTable requests={requests} />
        </div>
    );
}
