import { getLandlordRequests, updateRequestStatus, completeRentalRequest } from "../_actions/landlordActions";
import { RentalRequestsTable } from "@/components/shared/RentalRequestsTable";
import { PaginationBlock } from "@/components/shared/PaginationBlock";

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function LandlordRequestsPage({ searchParams }: Props) {
    const sp = await searchParams;
    const page = typeof sp.page === "string" ? parseInt(sp.page, 10) : 1;
    const size = typeof sp.size === "string" ? parseInt(sp.size, 10) : 10;

    const { data: requests, meta } = await getLandlordRequests(page, size);

    return (
        <div className="space-y-6 max-w-6xl mx-auto w-full">
            <RentalRequestsTable 
                requests={requests || []} 
                onUpdateStatus={updateRequestStatus} 
                onCompleteRequest={completeRentalRequest}
                isLandlord={true}
            />
            <PaginationBlock meta={meta} />
        </div>
    );
}
