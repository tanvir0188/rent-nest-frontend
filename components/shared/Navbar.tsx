import Link from "next/link";
import { getMe } from "@/service/getMe";
import { logout } from "@/service/logout";
import { Button } from "@/components/ui/button";

export default async function Navbar() {
    const session = await getMe();
    const user = session?.success ? session.data : null;

    return (
        <nav className="flex justify-between items-center p-4 border-b">
            <Link href="/" className="font-bold text-xl">RentNest</Link>

            <div className="flex gap-4">
                {user ? (
                    <>
                        <span className="py-2">Hello, {user.email}</span>
                        <Link href={`/${user.role.toLowerCase()}`}>
                            <Button variant="outline">Dashboard</Button>
                        </Link>
                        <form action={logout}>
                            <Button type="submit">Logout</Button>
                        </form>
                    </>
                ) : (
                    <>
                        <Link href="/auth/login"><Button variant="outline">Login</Button></Link>
                        <Link href="/auth/register"><Button>Register</Button></Link>
                    </>
                )}
            </div>
        </nav>
    );
}
