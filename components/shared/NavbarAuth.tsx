import { getMe } from "@/service/getMe";
import { logout } from "@/service/logout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DashboardNavButton } from "./DashboardNavButton";

export default async function NavbarAuth() {
    const session = await getMe();
    const user = session?.success ? session.data : null;

    if (user) {
        return (
            <>
                <span className="py-2">Hello, {user.profile.email}</span>
                <DashboardNavButton role={user.profile.role} />
                <form action={logout}>
                    <Button type="submit">Logout</Button>
                </form>
            </>
        );
    }

    return (
        <>
            <Link href="/auth/login"><Button variant="outline">Login</Button></Link>
            <Link href="/auth/register"><Button>Register</Button></Link>
        </>
    );
}
