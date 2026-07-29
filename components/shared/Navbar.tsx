import Link from "next/link";
import { getMe } from "@/service/getMe";
import { logout } from "@/service/logout";
import { Button } from "@/components/ui/button";

export default async function Navbar() {
    const session = await getMe();
    const user = session?.success ? session.data : null;

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <nav className="flex justify-between items-center p-4">
                <Link href="/properties" className="font-bold text-xl">RentNest</Link>

                <div className="flex gap-4">
                    {user ? (
                        <>
                            <span className="py-2">Hello, {user.email}</span>
                            <Link href={`/dashboard/${user.role.toLowerCase()}`}>
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
        </header>
    );
}
