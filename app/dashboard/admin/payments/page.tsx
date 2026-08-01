import { getPayments } from "@/service/paymentActions";
import { PaymentsTable } from "@/components/shared/PaymentsTable";
import { PaginationBlock } from "@/components/shared/PaginationBlock";

export default async function AdminPaymentsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
    const params = await searchParams;
    const currentPage = Number(params.page) || 1;
    const { data: payments, meta } = await getPayments(currentPage, 10);

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Payments</h1>
                <p className="text-zinc-500">View and manage all payment transactions.</p>
            </div>

            <PaymentsTable payments={payments} />

            {meta && (
                <div className="mt-6 flex justify-center">
                    <PaginationBlock meta={meta} />
                </div>
            )}
        </div>
    );
}
