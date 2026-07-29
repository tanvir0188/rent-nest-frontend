"use client"
import { useActionState, useEffect } from "react"
import { loginAction } from "@/app/(auth)/_actions/authActions"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"

export default function LoginForm() {
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") ?? "";

    // Connect to server action
    const [state, action, pending] = useActionState(loginAction.bind(null, redirectTo), null as any);

    useEffect(() => {
        if (!state) return;
        if (!state.success) toast.error(state.message || "Login failed");
    }, [state]);

    return (
        <form action={action} className="space-y-4 max-w-sm mx-auto mt-20 border p-6 rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
            <Input name="email" type="email" placeholder="Email" required />
            <Input name="password" type="password" placeholder="Password" required />
            <Button type="submit" className="w-full" disabled={pending}>
                {pending ? "Logging in..." : "Login"}
            </Button>
            <p className="text-center">Don't have an account? <Link className="text-blue-600 hover:underline" href="/auth/register">Register</Link></p>

        </form>
    );
}
