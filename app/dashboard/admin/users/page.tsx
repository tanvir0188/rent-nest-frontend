import { getUsers } from "../_actions/adminActions";
import { AdminUsersTable } from "../_components/AdminUsersTable";

export default async function AdminUsersPage() {
    const users = await getUsers() || [];

    return (
        <div className="space-y-6 max-w-6xl mx-auto w-full">
            <AdminUsersTable users={users} />
        </div>
    );
}
