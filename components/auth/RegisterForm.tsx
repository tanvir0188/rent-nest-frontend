"use client"
import { useActionState, useEffect } from "react"
import { loginAction } from "@/app/(auth)/_actions/authActions"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { SelectValue } from "../ui/select"
import Link from "next/link"


export default function RegisterForm() {
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
            <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
            <Input name="email" type="email" placeholder="Email" required />
            {state?.errors?.email && <p className="text-red-500">{state.errors.email[0]}</p>}
            <Input name="password" type="password" placeholder="Password" required />
            {state?.errors?.password && <p className="text-red-500">{state.errors.password[0]}</p>}
            <Input name="name" type="text" placeholder="Name" required />
            {state?.errors?.name && <p className="text-red-500">{state.errors.name[0]}</p>}

            <Select name="role" required>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="LANDLORD">Landlord</SelectItem>
                    <SelectItem value="TENANT">Tenant</SelectItem>
                </SelectContent>
            </Select>

            {state?.errors?.role && <p className="text-red-500">{state.errors.role[0]}</p>}
            <Button type="submit" className="w-full" disabled={pending}>
                {pending ? "Registering..." : "Register"}
            </Button>
            <p className="text-center">Already have an account? <Link className="text-blue-600 hover:underline" href="/auth/login">Login</Link></p>
        </form>

    );
}
