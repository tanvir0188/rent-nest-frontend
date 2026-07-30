"use server"

import config from "@/config/config";
import { cookies } from "next/headers";

export default async function getTenantOverview() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) return null;

    try {
        const res = await fetch(`${config.base_url}/api/tenant/overview`, {
            headers: {
                "Cookie": `accessToken=${accessToken}`,
                "Authorization": `Bearer ${accessToken}`
            },
            next: { revalidate: 0 } // No cache for dashboard data
        });

        if (res.ok) {
            const data = await res.json();
            return data.data; // The backend returns { success, data: { ... } }
        }
        return null;
    } catch (err) {
        console.error("Failed to fetch tenant overview", err);
        return null;
    }
}