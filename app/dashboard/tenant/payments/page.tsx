import { getPayments } from "@/service/paymentActions";
import { PaymentsTable } from "@/components/shared/PaymentsTable";
import { PaginationBlock } from "@/components/shared/PaginationBlock";

export default async function TenantPaymentsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
    const params = await searchParams;
    const currentPage = Number(params.page) || 1;
    const { data: payments, meta } = await getPayments(currentPage, 10);

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900">My Payments</h1>
                <p className="text-zinc-500">View your payment history and details.</p>
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
