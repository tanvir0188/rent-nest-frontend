import { Badge } from "@/components/ui/badge";

export interface StatusBadgeProps {
    status: string;
    className?: string;
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
    const formattedStatus = status?.toUpperCase() || "";

    switch (formattedStatus) {
        case "PENDING":
            return <Badge variant="secondary" className={`bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200 ${className}`}>Pending</Badge>;
        case "APPROVED":
            return <Badge variant="secondary" className={`bg-green-100 text-green-800 hover:bg-green-100 border-green-200 ${className}`}>Approved</Badge>;
        case "COMPLETED":
            return <Badge variant="secondary" className={`bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200 ${className}`}>Completed</Badge>;
        case "REJECTED":
            return <Badge variant="secondary" className={`bg-red-100 text-red-800 hover:bg-red-100 border-red-200 ${className}`}>Rejected</Badge>;
        default:
            return <Badge variant="outline" className={className}>{status || "Unknown"}</Badge>;
    }
}
