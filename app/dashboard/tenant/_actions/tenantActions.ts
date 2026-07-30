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

export const getRentalRequests = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) return null;

    try {
        const res = await fetch(`${config.base_url}/api/rentals/`, {
            headers: {
                "Cookie": `accessToken=${accessToken}`,
                "Authorization": `Bearer ${accessToken}`
            },
            next: { revalidate: 0 }
        });

        if (res.ok) {
            const data = await res.json();
            return data.data; // Array of rental requests
        }
        return null;
    } catch (err) {
        console.error("Failed to fetch rental requests", err);
        return null;
    }
}