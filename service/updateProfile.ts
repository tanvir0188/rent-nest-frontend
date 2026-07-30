"use server"

import { cookies } from "next/headers";
import config from "@/config/config";
import { revalidateTag } from "next/cache";

export interface ProfileUpdatePayload {
    name: string;
    bio: string;
    email: string;
    profilePhoto: string;
}

export const updateProfile = async (payload: ProfileUpdatePayload) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
        return { success: false, message: "Unauthorized. Please log in." };
    }

    try {
        const res = await fetch(`${config.base_url}/api/users/profile`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Cookie": `accessToken=${accessToken}`,
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(payload)
        });

        const result = await res.json().catch(() => ({}));
        if (res.ok) {
            revalidateTag("my-profile", "max");
            return {
                success: true,
                message: result.message || "Profile updated successfully!",
                data: result.data
            };
        } else {
            return {
                success: false,
                message: result.message || `Error: ${res.status}`
            };
        }
    } catch (err) {
        console.error("Profile update failed", err);
        return { success: false, message: "An unexpected error occurred." };
    }
}
