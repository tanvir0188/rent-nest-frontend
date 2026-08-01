import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, ClipboardList, Clock, CheckCircle, CheckSquare, XCircle, DollarSign, Star } from "lucide-react";
import { getLandlordProperties, landlordOverview } from "./_actions/landlordActions";

export default async function LandlordDashboardOverview() {
    const [overviewData, properties] = await Promise.all([
        landlordOverview(),
        getLandlordProperties()
    ]);

    const {
        totalProperties = 0,
        totalRequests = 0,
        pendingRequests = 0,
        approvedRequests = 0,
        completedRequests = 0,
        rejectedRequests = 0,
        totalRevenue = 0,
        totalReviews = 0
    } = overviewData || {};

    const statCards = [
        {
            title: "Total Properties",
            value: totalProperties,
            icon: <Building className="h-7 w-7 text-blue-600" />,
            bgColor: "bg-blue-50"
        },
        {
            title: "Total Requests",
            value: totalRequests,
            icon: <ClipboardList className="h-7 w-7 text-indigo-600" />,
            bgColor: "bg-indigo-50"
        },
        {
            title: "Pending Requests",
            value: pendingRequests,
            icon: <Clock className="h-7 w-7 text-amber-600" />,
            bgColor: "bg-amber-50"
        },
        {
            title: "Approved Requests",
            value: approvedRequests,
            icon: <CheckCircle className="h-7 w-7 text-emerald-600" />,
            bgColor: "bg-emerald-50"
        },
        {
            title: "Completed",
            value: completedRequests,
            icon: <CheckSquare className="h-7 w-7 text-teal-600" />,
            bgColor: "bg-teal-50"
        },
        {
            title: "Rejected Requests",
            value: rejectedRequests,
            icon: <XCircle className="h-7 w-7 text-rose-600" />,
            bgColor: "bg-rose-50"
        },
        {
            title: "Total Revenue",
            value: `$${totalRevenue.toLocaleString()}`,
            icon: <DollarSign className="h-7 w-7 text-green-600" />,
            bgColor: "bg-green-50"
        },
        {
            title: "Total Reviews",
            value: totalReviews,
            icon: <Star className="h-7 w-7 text-yellow-500" />,
            bgColor: "bg-yellow-50"
        }
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Landlord Overview</h1>
                <p className="text-muted-foreground mt-1">
                    Track your property performance, rental requests, revenue, and active listings.
                </p>
            </div>

            {/* Stat Cards Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat, i) => (
                    <Card key={i} className="shadow-xs hover:shadow-md transition-all rounded-2xl border border-zinc-200/80 bg-white">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-5">
                            <CardTitle className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-2.5 rounded-xl ${stat.bgColor}`}>
                                {stat.icon}
                            </div>
                        </CardHeader>
                        <CardContent className="px-5 pb-4">
                            <div className="text-2xl font-bold text-zinc-900">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
