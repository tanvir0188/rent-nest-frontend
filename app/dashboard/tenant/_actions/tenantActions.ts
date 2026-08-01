"use server"

import config from "@/config/config";
import { cookies } from "next/headers";

export const getTenantOverview = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) return null;

    try {
        const res = await fetch(`${config.base_url}/api/tenant/overview`, {
            headers: {
                "Cookie": `accessToken=${accessToken}`,
                "Authorization": `Bearer ${accessToken}`
            },
            next: { revalidate: 0 }
        });

        if (res.ok) {
            const data = await res.json();
            return data.data;
        }
        return null;
    } catch (err) {
        console.error("Failed to fetch tenant overview", err);
        return null;
    }
}

export const getRentalRequests = async (page: number = 1, size: number = 10) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) return { data: [], meta: null };

    try {
        const res = await fetch(`${config.base_url}/api/rentals/?page=${page}&size=${size}`, {
            headers: {
                "Cookie": `accessToken=${accessToken}`,
                "Authorization": `Bearer ${accessToken}`
            },
            next: { tags: ["rental-requests"] }
        });

        if (res.ok) {
            const data = await res.json();
            return {
                data: data.data || [],
                meta: data.meta || null
            };
        }
        return { data: [], meta: null };
    } catch (err) {
        console.error("Failed to fetch rental requests", err);
        return { data: [], meta: null };
    }
}

export const getRentalDetails = async (rentalId: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) return { success: false, message: "Unauthorized" };

    try {
        const res = await fetch(`${config.base_url}/api/rentals/${rentalId}`, {
            headers: {
                "Cookie": `accessToken=${accessToken}`,
                "Authorization": `Bearer ${accessToken}`
            },
            next: { revalidate: 60 }
        });

        if (res.ok) {
            const data = await res.json();
            return { success: true, data: data.data };
        }
        return { success: false, message: "Failed to fetch rental details" };
    } catch (err) {
        console.error("Failed to fetch rental details", err);
        return { success: false, message: "An unexpected error occurred" };
    }
}