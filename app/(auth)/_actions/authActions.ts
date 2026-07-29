"use server"

import config from "@/config/config"
import { LoginSchema, RegisterSchema } from "@/lib/types"
import jwt, { JwtPayload } from "jsonwebtoken"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type LoginState = {
    success: true,
    statusCode: number,
    message: string,
    data: {
        accessToken: string,
        refreshToken: string
    }
}

export const loginAction = async (redirectTo: string, prevState: LoginState, formData: FormData) => {
    const rawData = Object.fromEntries(formData);
    const validated = LoginSchema.safeParse(rawData);

    if (!validated.success) {
        return {
            success: false,
            statusCode: 400,
            message: "Validation failed",
            errors: validated.error.flatten().fieldErrors,
            data: rawData
        }
    }

    try {
        const res = await fetch(`${config.base_url}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(validated.data)
        })
        const result = await res.json();

        if (!result.success) {
            return { ...result, data: rawData };
        }

        const cookieStore = await cookies()
        cookieStore.set("accessToken", result.data.accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            sameSite: "lax"
        })
        cookieStore.set("refreshToken", result.data.refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "lax"
        })

        const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

        if (redirectTo && typeof redirectTo === "string" && redirectTo.startsWith("/") && !redirectTo.startsWith("//")) {
            redirect(redirectTo);
        }
        if (decodedToken.role === "ADMIN") {
            redirect("/dashboard/admin");
        }
        if (decodedToken.role === "TENANT") {
            redirect("/dashboard/tenant");
        }
        if (decodedToken.role === "LANDLORD") {
            redirect("/dashboard/landlord");
        }

    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: "Backend is sleeping or offline. Try again.",
            data: rawData
        }
    }
}

type RegisterState = {
    success: true,
    statusCode: number,
    message: string,
    data: any
}
export const registerAction = async (redirectTo: string, prevState: RegisterState, formData: FormData) => {
    const rawData = Object.fromEntries(formData);
    const validated = RegisterSchema.safeParse(rawData);

    if (!validated.success) {
        return {
            success: false,
            statusCode: 400,
            message: "Validation failed",
            errors: validated.error.flatten().fieldErrors,
            data: rawData
        }
    }

    const { email, password, name, role } = validated.data;
    const payload = {
        email,
        password,
        name,
        role
    }
    const res = await fetch(`${config.base_url}/api/users/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    const result = await res.json();
    if (result.statusCode === 500) {
        return {
            success: false,
            statusCode: 500,
            message: "Internal server error",
            data: rawData
        }
    }
    if (!result.success && result.statusCode === 400) {
        return result
    }

    if (result.success) {
        redirect("/auth/login")

    }
    return result;

}