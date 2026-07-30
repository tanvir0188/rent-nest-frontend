import { cookies } from "next/headers";
import config from "@/config/config";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getRentalRequests } from "../_actions/tenantActions";



export default async function TenantRequestsPage() {
    const requests = await getRentalRequests();

    if (!requests) {
        return <div className="text-red-500">Failed to load rental requests or unauthorized.</div>;
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "PENDING":
                return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">Pending</Badge>;
            case "APPROVED":
                return <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Approved</Badge>;
            case "COMPLETED":
                return <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200">Completed</Badge>;
            case "REJECTED":
                return <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">Rejected</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Rental Requests</h1>
                <p className="text-muted-foreground mt-2">View and manage all your property rental requests.</p>
            </div>

            <div className="border rounded-md bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Property</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Requested On</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {requests.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                    No rental requests found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            requests.map((req: any) => (
                                <TableRow key={req.id}>
                                    <TableCell className="font-medium">{req.property.title}</TableCell>
                                    <TableCell>{req.property.location}</TableCell>
                                    <TableCell>${req.property.price.toLocaleString()}</TableCell>
                                    <TableCell>{getStatusBadge(req.status)}</TableCell>
                                    <TableCell>{new Date(req.createdAt).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
