"use server";

import config from "@/config/config";
import { getMe } from "@/service/getMe";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

import { z } from "zod";
import { CreatePropertySchema, UpdatePropertySchema } from "@/lib/types";

export type CreatePropertyPayload = z.infer<typeof CreatePropertySchema>;

export type UpdatePropertyPayload = z.infer<typeof UpdatePropertySchema>;

export const getLandlordProperties = async (page: number = 1, size: number = 10) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) return { data: [], meta: null };

    const session = await getMe();
    if (!session || !session.data) return { data: [], meta: null };

    const me = session.data;

    try {
        const res = await fetch(`${config.base_url}/api/landlord/properties?page=${page}&size=${size}`, {
            headers: {
                "Cookie": `accessToken=${accessToken}`,
                "Authorization": `Bearer ${accessToken}`
            },
            next: {
                revalidate: 60 * 60,
                tags: ["properties"]
            }
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
        console.error("Failed to fetch landlord properties", err);
        return { data: [], meta: null };
    }
};

export const createProperty = async (payload: CreatePropertyPayload) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "Unauthorized. Please log in." };
    }

    const validatedFields = CreatePropertySchema.safeParse(payload);

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Validation Error",
            errors: validatedFields.error.flatten().fieldErrors
        };
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
                ...validatedFields.data,
                price: Number(validatedFields.data.price),
                isAvailable: validatedFields.data.isAvailable ?? true
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

    const validatedFields = UpdatePropertySchema.safeParse(payload);
    
    if (!validatedFields.success) {
        return {
            success: false,
            message: "Validation Error",
            errors: validatedFields.error.flatten().fieldErrors
        };
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
                ...validatedFields.data,
                ...(validatedFields.data.price !== undefined ? { price: Number(validatedFields.data.price) } : {})
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
};

export const getLandlordRequests = async (page: number = 1, size: number = 10) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) return { data: [], meta: null };

    try {
        const res = await fetch(`${config.base_url}/api/landlord/requests?page=${page}&size=${size}`, {
            headers: {
                "Cookie": `accessToken=${accessToken}`,
                "Authorization": `Bearer ${accessToken}`
            },
            next: {
                revalidate: 60 * 60,
                tags: ["landlord-requests"]
            }
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
        console.error("Failed to fetch landlord requests", err);
        return { data: [], meta: null };
    }
};

export const updateRequestStatus = async (requestId: string, status: "APPROVED" | "REJECTED") => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "Unauthorized. Please log in." };
    }

    try {
        const res = await fetch(`${config.base_url}/api/landlord/requests/${requestId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Cookie": `accessToken=${accessToken}`,
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({ status })
        });

        const result = await res.json().catch(() => ({}));

        if (res.ok) {
            revalidateTag("landlord-requests", "max");
            return {
                success: true,
                message: result.message || `Request ${status.toLowerCase()} successfully!`
            };
        } else {
            return {
                success: false,
                message: result.message || `Error: ${res.status}`
            };
        }
    } catch (err) {
        console.error("Failed to update request status", err);
        return { success: false, message: "An unexpected error occurred." };
    }
};

export const completeRentalRequest = async (requestId: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "Unauthorized. Please log in." };
    }

    try {
        const res = await fetch(`${config.base_url}/api/landlord/requests/complete/${requestId}`, {
            method: "PATCH",
            headers: {
                "Cookie": `accessToken=${accessToken}`,
                "Authorization": `Bearer ${accessToken}`
            }
        });

        const result = await res.json().catch(() => ({}));

        if (res.ok) {
            revalidateTag("landlord-requests", "max");
            return {
                success: true,
                message: result.message || "Request marked as completed successfully!"
            };
        } else {
            return {
                success: false,
                message: result.message || `Error: ${res.status}`
            };
        }
    } catch (err) {
        console.error("Failed to complete request", err);
        return { success: false, message: "An unexpected error occurred." };
    }
};