"use server";

import config from "@/config/config";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export const adminOverview = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return null;
    }

    try {
        const res = await fetch(`${config.base_url}/api/admin/overview`, {
            headers: {
                "Cookie": `accessToken=${accessToken}`,
                "Authorization": `Bearer ${accessToken}`
            },
            next: {
                revalidate: 0,
                tags: ["admin-overview"]
            }
        });

        if (res.ok) {
            const data = await res.json();
            return data.data;
        }
        return null;
    } catch (err) {
        console.error("Failed to fetch admin overview", err);
        return null;
    }
};

export const getUsers = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) return null;

    try {
        const res = await fetch(`${config.base_url}/api/users`, {
            headers: {
                "Cookie": `accessToken=${accessToken}`,
                "Authorization": `Bearer ${accessToken}`
            },
            next: {
                revalidate: 60 * 60,
                tags: ["admin-users"]
            }
        });

        if (res.ok) {
            const data = await res.json();
            console.log(`Users: ${JSON.stringify(data.data)}`)
            return data.data || [];
        }
        return [];
    } catch (err) {
        console.error("Failed to fetch users", err);
        return [];
    }
};

export const getUserDetails = async (userId: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) return null;

    try {
        const res = await fetch(`${config.base_url}/api/users/${userId}`, {
            headers: {
                "Cookie": `accessToken=${accessToken}`,
                "Authorization": `Bearer ${accessToken}`
            },
            next: {
                revalidate: 60 * 60,
                tags: ["admin-users"]
            }
        });

        if (res.ok) {
            const data = await res.json();
            return data.data || null;
        }
        return null;
    } catch (err) {
        console.error("Failed to fetch user details", err);
        return null;
    }
};

export const toggleUserStatus = async (userId: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "Unauthorized. Please log in." };
    }

    try {
        const res = await fetch(`${config.base_url}/api/users/admin/users/${userId}/toggle-status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Cookie": `accessToken=${accessToken}`,
                "Authorization": `Bearer ${accessToken}`
            }
        });

        const result = await res.json().catch(() => ({}));

        if (res.ok) {
            await revalidateTag("admin-users", "max");
            await revalidateTag("admin-overview", "max");
            return {
                success: true,
                message: result.message || "User status toggled successfully!"
            };
        } else {
            return {
                success: false,
                message: result.message || `Error: ${res.status}`
            };
        }
    } catch (err) {
        console.error("Failed to toggle user status", err);
        return { success: false, message: "An unexpected error occurred." };
    }
};