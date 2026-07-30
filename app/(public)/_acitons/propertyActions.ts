"use server";

import config from "@/config/config";
import { cookies } from "next/headers";

export const requestRental = async (propertyId: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;
    
    if (!accessToken) {
        return { success: false, message: "Unauthorized" };
    }

    try {
        const res = await fetch(`${config.base_url}/api/rentals/${propertyId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cookie": `accessToken=${accessToken}`,
                "Authorization": `Bearer ${accessToken}`
            }
        });

        const result = await res.json().catch(() => ({}));
        if (res.ok) {
            return { success: true, message: result.message || "Request sent successfully" };
        } else {
            return { success: false, message: result.message || `Error: ${res.status}` };
        }
    } catch (err) {
        console.error("Rental request failed", err);
        return { success: false, message: "An unexpected error occurred" };
    }
}
export interface Property {
    id: string;
    title: string;
    price: number;
    location: string;
    type: string;
    status: string;
    description?: string;
}

export const getPublicProperties = async (params?: { title?: string, type?: string, location?: string, price?: string | number }): Promise<Property[]> => {
    try {
        const query = new URLSearchParams();
        if (params?.title) query.append("title", params.title);
        if (params?.type) query.append("type", params.type);
        if (params?.location) query.append("location", params.location);
        if (params?.price) query.append("price", params.price.toString());
        
        const queryString = query.toString() ? `?${query.toString()}` : "";
        
        const res = await fetch(`${config.base_url}/api/properties${queryString}`, {
            next: { revalidate: 60 }
        });
        if (res.ok) {
            const result = await res.json();
            console.log(result.data);
            return result.data || [];
        } else {
            console.error(`API Error: ${res.status}`);
            return [];
        }
    } catch (err) {
        console.error("Fetch failed", err);
        return [];
    }
};

export const getPropertyDetails = async (id: string): Promise<Property | null> => {
    try {
        const res = await fetch(`${config.base_url}/api/properties/${id}`, {
            next: { revalidate: 60 }
        });
        if (res.ok) {
            const result = await res.json();
            return result.data || [];
        } else {
            console.error(`API Error: ${res.status}`);
            return null;
        }
    } catch (err) {
        console.error("Fetch failed", err);
        return null;
    }
}
