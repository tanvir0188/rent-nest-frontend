"use server"

import { cookies } from "next/headers";
import config from "@/config/config";

export const getMe = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) return { success: false, message: "User not logged in!" };

    const res = await fetch(`${config.base_url}/api/users/me`, {
        headers: { Cookie: `accessToken=${accessToken}` },
        cache: "force-cache",
        next: {
            revalidate: 60 * 60 * 24,
            tags: ["my-profile"]
        }
    });
    console.log(`Me: ${res}`)

    return res.json();
}
