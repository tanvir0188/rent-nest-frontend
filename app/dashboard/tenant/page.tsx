import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Clock, CheckCircle, XCircle, CheckSquare } from "lucide-react";
import getTenantOverview from "./_actions/tenantActions";


export default async function TenantDashboardOverview() {
    const overview = await getTenantOverview();

    if (!overview) {
        return <div className="text-red-500">Failed to load overview data or unauthorized.</div>;
    }

    const { totalRequests, pendingRequests, approvedRequests, rejectedRequests, completedRequests } = overview;

    const statCards = [
        {
            title: "Total Requests",
            value: totalRequests,
            icon: <ClipboardList className="h-8 w-8 text-blue-500" />,
            bgColor: "bg-blue-50"
        },
        {
            title: "Pending Requests",
            value: pendingRequests,
            icon: <Clock className="h-8 w-8 text-yellow-500" />,
            bgColor: "bg-yellow-50"
        },
        {
            title: "Approved Requests",
            value: approvedRequests,
            icon: <CheckCircle className="h-8 w-8 text-green-500" />,
            bgColor: "bg-green-50"
        },
        {
            title: "Rejected Requests",
            value: rejectedRequests,
            icon: <XCircle className="h-8 w-8 text-red-500" />,
            bgColor: "bg-red-50"
        },
        {
            title: "Completed",
            value: completedRequests,
            icon: <CheckSquare className="h-8 w-8 text-purple-500" />,
            bgColor: "bg-purple-50"
        }
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Tenant Overview</h1>
            <p className="text-muted-foreground">Manage your rental requests and track their status here.</p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-6">
                {statCards.map((stat, i) => (
                    <Card key={i} className="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <div className="text-3xl font-bold">{stat.value}</div>
                            <div className={`p-3 rounded-full ${stat.bgColor}`}>
                                {stat.icon}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
