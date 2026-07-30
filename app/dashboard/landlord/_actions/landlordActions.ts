"use server";

import config from "@/config/config";
import { getMe } from "@/service/getMe";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export interface CreatePropertyPayload {
    title: string;
    price: number;
    type: string;
    location: string;
    categoryId: string;
    isAvailable?: boolean;
    description?: string;
    amenities?: string[] | string;
}

export interface UpdatePropertyPayload {
    title?: string;
    price?: number;
    type?: string;
    location?: string;
    categoryId?: string;
    isAvailable?: boolean;
    description?: string;
    amenities?: string[] | string;
}

export const getLandlordProperties = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) return null;

    const session = await getMe();
    if (!session || !session.data) return null;

    const me = session.data;

    try {
        const res = await fetch(`${config.base_url}/api/landlord/properties`, {
            headers: {
                "Cookie": `accessToken=${accessToken}`,
                "Authorization": `Bearer ${accessToken}`
            },
            next: {
                revalidate: 60 * 60 * 24,
                tags: ["properties"]
            }
        });

        if (res.ok) {
            const data = await res.json();
            console.log(data.data);
            return data.data;
        }
        return null;
    } catch (err) {
        console.error("Failed to fetch landlord properties", err);
        return null;
    }
};

export const createProperty = async (payload: CreatePropertyPayload) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "Unauthorized. Please log in." };
    }

    try {
        const res = await fetch(`${config.base_url}/api/landlord/properties`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cookie": `accessToken=${accessToken}`,
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                ...payload,
                price: Number(payload.price),
                isAvailable: payload.isAvailable ?? true
            })
        });

        const result = await res.json().catch(() => ({}));
        console.log(`create property response: ${JSON.stringify(result)}`);

        if (res.ok) {
            revalidateTag("properties", "max");
            return {
                success: true,
                message: result.message || "Property created successfully!",
                data: result.data
            };
        } else {
            return {
                success: false,
                message: result.message || `Error: ${res.status}`
            };
        }
    } catch (err) {
        console.error("Failed to create property", err);
        return { success: false, message: "An unexpected error occurred." };
    }
};

export const updateProperty = async (propertyId: string, payload: UpdatePropertyPayload) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "Unauthorized. Please log in." };
    }

    try {
        const res = await fetch(`${config.base_url}/api/landlord/properties/${propertyId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Cookie": `accessToken=${accessToken}`,
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                ...payload,
                ...(payload.price !== undefined ? { price: Number(payload.price) } : {})
            })
        });

        const result = await res.json().catch(() => ({}));

        if (res.ok) {
            revalidateTag("properties", "max");
            return {
                success: true,
                message: result.message || "Property updated successfully!",
                data: result.data
            };
        } else {
            return {
                success: false,
                message: result.message || `Error: ${res.status}`
            };
        }
    } catch (err) {
        console.error("Failed to update property", err);
        return { success: false, message: "An unexpected error occurred." };
    }
};

export const deleteProperty = async (propertyId: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "Unauthorized. Please log in." };
    }

    try {
        const res = await fetch(`${config.base_url}/api/landlord/properties/${propertyId}`, {
            method: "DELETE",
            headers: {
                "Cookie": `accessToken=${accessToken}`,
                "Authorization": `Bearer ${accessToken}`
            }
        });

        const result = await res.json().catch(() => ({}));

        if (res.ok) {
            revalidateTag("properties", "max");
            return {
                success: true,
                message: result.message || "Property deleted successfully!"
            };
        } else {
            return {
                success: false,
                message: result.message || `Error: ${res.status}`
            };
        }
    } catch (err) {
        console.error("Failed to delete property", err);
        return { success: false, message: "An unexpected error occurred." };
    }
};

export const landlordOverview = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "Unauthorized. Please log in." };
    }

    try {
        const res = await fetch(`${config.base_url}/api/landlord/overview`, {
            headers: {
                "Cookie": `accessToken=${accessToken}`,
                "Authorization": `Bearer ${accessToken}`
            },
            next: {
                revalidate: 0,

            }
        });

        if (res.ok) {
            const data = await res.json();
            console.log(`landlord overview response: ${JSON.stringify(data)}`);

            return data.data;
        }
        return null;
    } catch (err) {
        console.error("Failed to fetch landlord overview", err);
        return null;
    }
}