"use server"

import { cookies } from "next/headers"
import { revalidateTag } from "next/cache"

export const storeGoogleOAuthTokens = async (accessToken: string, refreshToken: string) => {
    const cookieStore = await cookies()

    cookieStore.set("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24, // 1 day
        sameSite: "lax"
    })
    cookieStore.set("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: "lax"
    })

    revalidateTag("my-profile", "max")
}
