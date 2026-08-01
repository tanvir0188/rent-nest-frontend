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
import { PaymentDetailsModal } from "./PaymentDetailsModal";


export function PaymentsTable({ payments }: { payments: any[] }) {
    const [selectedPayment, setSelectedPayment] = useState<any | null>(null);

    return (
        <>
            <div className="border rounded-2xl overflow-hidden bg-white shadow-sm">
                <Table>
                    <TableHeader className="bg-zinc-50/80">
                        <TableRow>
                            <TableHead>Payment ID</TableHead>
                            <TableHead>Property</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {payments.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                                    No payments found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            payments.map((payment: any) => (
                                <TableRow key={payment.id} className="hover:bg-zinc-50/50 transition-colors">
                                    <TableCell className="font-medium text-zinc-900">{payment.id.split("-")[0].toUpperCase()}</TableCell>
                                    <TableCell className="text-zinc-600">{payment.rentalRequest?.property?.title || "Unknown"}</TableCell>
                                    <TableCell className="font-semibold">${payment.amount?.toLocaleString()}</TableCell>
                                    <TableCell><StatusBadge status={payment.status} /></TableCell>
                                    <TableCell className="text-zinc-500 text-sm">
                                        {new Date(payment.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setSelectedPayment(payment)}
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

            <PaymentDetailsModal
                paymentId={selectedPayment?.id || null}
                initialData={selectedPayment}
                onClose={() => setSelectedPayment(null)}
            />
        </>
    );
}
