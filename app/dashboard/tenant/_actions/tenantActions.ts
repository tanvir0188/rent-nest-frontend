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
            next: { revalidate: 0 }
        });

        if (res.ok) {
            const data = await res.json();
            console.log(data)
            return { success: true, data: data.data };
        }
        return { success: false, message: "Failed to fetch rental details" };
    } catch (err) {
        console.error("Failed to fetch rental details", err);
        return { success: false, message: "An unexpected error occurred" };
    }
}

export const createCheckoutSession = async (rentalId: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) return { success: false, message: "Unauthorized" };

    try {
        const res = await fetch(`${config.base_url}/api/checkout-session/${rentalId}`, {
            method: "POST",
            headers: {
                "Cookie": `accessToken=${accessToken}`,
                "Authorization": `Bearer ${accessToken}`
            },

        });

        const data = await res.json().catch(() => null);

        if (res.ok && data?.data) {
            // Usually data.data contains the session URL or the checkout URL directly
            // or the data itself is the URL if the backend responds that way.
            // We'll return the whole data so the client can extract it.
            console.log(data.data)
            return { success: true, url: data.data.url || data.data };
        }
        return { success: false, message: data?.message || "Failed to create checkout session" };
    } catch (err) {
        console.error("Failed to create checkout session", err);
        return { success: false, message: "An unexpected error occurred" };
    }
}

export const postReview = async (payload: { rentalRequestId: string, rating: number, comment: string }) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) return { success: false, message: "Unauthorized" };

    try {
        const res = await fetch(`${config.base_url}/api/reviews`, {
            method: "POST",
            headers: {
                "Cookie": `accessToken=${accessToken}`,
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await res.json().catch(() => null);

        if (res.ok) {
            return { success: true, data: data?.data };
        }
        return { success: false, message: data?.message || "Failed to post review" };
    } catch (err) {
        console.error("Failed to post review", err);
        return { success: false, message: "An unexpected error occurred" };
    }
}