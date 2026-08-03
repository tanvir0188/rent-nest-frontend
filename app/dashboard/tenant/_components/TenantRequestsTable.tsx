"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { RentalDetailsModal } from "@/components/shared/RentalDetailsModal";

export function TenantRequestsTable({ requests }: { requests: any[] }) {
    const [selectedRental, setSelectedRental] = useState<any | null>(null);

    return (
        <>
            <div className="border rounded-2xl overflow-hidden bg-white shadow-sm">
                <Table>
                    <TableHeader className="bg-zinc-50/80">
                        <TableRow>
                            <TableHead>Property</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Requested On</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {requests.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                                    No rental requests found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            requests.map((req: any) => (
                                <TableRow key={req.id} className="hover:bg-zinc-50/50 transition-colors">
                                    <TableCell className="font-medium text-zinc-900">{req.property.title}</TableCell>
                                    <TableCell className="text-zinc-600">{req.property.location}</TableCell>
                                    <TableCell className="font-semibold">BDT {req.property.price.toLocaleString()}</TableCell>
                                    <TableCell><StatusBadge status={req.status} /></TableCell>
                                    <TableCell className="text-zinc-500 text-sm">
                                        {new Date(req.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setSelectedRental(req)}
                                            className="rounded-xl hover:bg-zinc-200/60 gap-1.5"
                                        >
                                            <Eye className="w-4 h-4 text-zinc-600" />
                                            <span>Details</span>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <RentalDetailsModal
                rentalId={selectedRental?.id || null}
                initialData={selectedRental}
                onClose={() => setSelectedRental(null)}
                isTenant={true}
            />
        </>
    );
}
