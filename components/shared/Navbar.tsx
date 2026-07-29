import Link from "next/link";
import { getMe } from "@/service/getMe";
import { logout } from "@/service/logout";
import { Button } from "@/components/ui/button";
import NavbarSearch from "./NavbarSearch";
import { Suspense } from "react";

export default async function Navbar() {
    const session = await getMe();
    const user = session?.success ? session.data : null;
    console.log("User", user);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <nav className="flex justify-between items-center p-4">
                <div className="flex items-center gap-4 flex-1">
                    <Link href="/" className="font-bold text-xl mr-4">RentNest</Link>
                </div>

                <div className="flex gap-4">
                    {user ? (
                        <>
                            <span className="py-2">Hello, {user.profile.email}</span>
                            <Link href={`/dashboard/${user.profile.role.toLowerCase()}`}>
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
