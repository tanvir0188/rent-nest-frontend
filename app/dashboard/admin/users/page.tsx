import { getUsers } from "../_actions/adminActions";
import { AdminUsersTable } from "../_components/AdminUsersTable";
import { PaginationBlock } from "@/components/shared/PaginationBlock";

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function AdminUsersPage({ searchParams }: Props) {
    const sp = await searchParams;
    const page = typeof sp.page === "string" ? parseInt(sp.page, 10) : 1;
    const size = typeof sp.size === "string" ? parseInt(sp.size, 10) : 10;

    const { data: users, meta } = await getUsers(page, size);

    return (
        <div className="space-y-6 max-w-6xl mx-auto w-full">
            <AdminUsersTable users={users || []} />
            <PaginationBlock meta={meta} />
        </div>
    );
}
