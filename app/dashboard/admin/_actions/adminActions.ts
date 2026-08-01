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

export const getUsers = async (page: number = 1, size: number = 10) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) return { data: [], meta: null };

    try {
        const res = await fetch(`${config.base_url}/api/users?page=${page}&size=${size}`, {
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
            return {
                data: data.data || [],
                meta: data.meta || null
            };
        }
        return { data: [], meta: null };
    } catch (err) {
        console.error("Failed to fetch users", err);
        return { data: [], meta: null };
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

export const adminUpdateRentalRequestStatus = async (requestId: string, status: "APPROVED" | "REJECTED") => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "Unauthorized. Please log in." };
    }

    try {
        const res = await fetch(`${config.base_url}/api/admin/rentals/${requestId}`, {
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
            revalidateTag("admin-rentals", "max");
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

export const getAdminRentalRequests = async (page: number = 1, size: number = 10) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) return { data: [], meta: null };

    try {
        const res = await fetch(`${config.base_url}/api/admin/rentals?page=${page}&size=${size}`, {
            headers: {
                "Cookie": `accessToken=${accessToken}`,
                "Authorization": `Bearer ${accessToken}`
            },
            next: {
                revalidate: 60 * 60,
                tags: ["admin-rentals"]
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
        console.error("Failed to fetch admin rental requests", err);
        return { data: [], meta: null };
    }
};
export const deleteCategory = async (id: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "Unauthorized" };
    }

    try {
        const res = await fetch(`${config.base_url}/api/admin/category/${id}`, {
            method: "DELETE",
            headers: {
                "Cookie": `accessToken=${accessToken}`,
                "Authorization": `Bearer ${accessToken}`
            }
        });

        const result = await res.json().catch(() => ({}));
        if (res.ok) {
            revalidateTag("filters", "max");
            return { success: true, message: result.message || "Category deleted successfully" };
        } else {
            return { success: false, message: result.message || `Error: ${res.status}` };
        }
    } catch (err) {
        console.error("Failed to delete category", err);
        return { success: false, message: "An unexpected error occurred" };
    }
};

export const deleteAmenity = async (id: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "Unauthorized" };
    }

    try {
        const res = await fetch(`${config.base_url}/api/admin/amenity/${id}`, {
            method: "DELETE",
            headers: {
                "Cookie": `accessToken=${accessToken}`,
                "Authorization": `Bearer ${accessToken}`
            }
        });

        const result = await res.json().catch(() => ({}));
        if (res.ok) {
            revalidateTag("filters", "max");
            return { success: true, message: result.message || "Amenity deleted successfully" };
        } else {
            return { success: false, message: result.message || `Error: ${res.status}` };
        }
    } catch (err) {
        console.error("Failed to delete amenity", err);
        return { success: false, message: "An unexpected error occurred" };
    }
};

export const createCategory = async (title: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "Unauthorized" };
    }

    try {
        const res = await fetch(`${config.base_url}/api/admin/category`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cookie": `accessToken=${accessToken}`,
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({ title })
        });

        const result = await res.json().catch(() => ({}));

        if (res.ok) {
            revalidateTag("filters", "max");
            return { success: true, message: result.message || "Category created successfully!" };
        } else {
            return { success: false, message: result.message || `Error: ${res.status}` };
        }
    } catch (err) {
        console.error("Failed to create category", err);
        return { success: false, message: "An unexpected error occurred" };
    }
};

export const createAmenity = async (title: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "Unauthorized" };
    }

    try {
        const res = await fetch(`${config.base_url}/api/admin/amenity`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cookie": `accessToken=${accessToken}`,
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({ title })
        });

        const result = await res.json().catch(() => ({}));

        if (res.ok) {
            revalidateTag("filters", "max");
            return { success: true, message: result.message || "Amenity created successfully!" };
        } else {
            return { success: false, message: result.message || `Error: ${res.status}` };
        }
    } catch (err) {
        console.error("Failed to create amenity", err);
        return { success: false, message: "An unexpected error occurred" };
    }
};

export const editCategory = async (id: string, title: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "Unauthorized" };
    }

    try {
        const res = await fetch(`${config.base_url}/api/admin/category/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Cookie": `accessToken=${accessToken}`,
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({ title })
        });

        const result = await res.json().catch(() => ({}));

        if (res.ok) {
            revalidateTag("filters", "max");
            return { success: true, message: result.message || "Category updated successfully!" };
        } else {
            return { success: false, message: result.message || `Error: ${res.status}` };
        }
    } catch (err) {
        console.error("Failed to edit category", err);
        return { success: false, message: "An unexpected error occurred" };
    }
};

export const editAmenity = async (id: string, title: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "Unauthorized" };
    }

    try {
        const res = await fetch(`${config.base_url}/api/admin/amenity/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Cookie": `accessToken=${accessToken}`,
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({ title })
        });

        const result = await res.json().catch(() => ({}));

        if (res.ok) {
            revalidateTag("filters", "max");
            return { success: true, message: result.message || "Amenity updated successfully!" };
        } else {
            return { success: false, message: result.message || `Error: ${res.status}` };
        }
    } catch (err) {
        console.error("Failed to edit amenity", err);
        return { success: false, message: "An unexpected error occurred" };
    }
};
