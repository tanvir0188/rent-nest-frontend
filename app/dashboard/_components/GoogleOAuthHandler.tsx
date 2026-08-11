"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { storeGoogleOAuthTokens } from "../_actions/oauthActions";

export default function GoogleOAuthHandler() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const hasHandled = useRef(false);

    useEffect(() => {
        const accessToken = searchParams.get("accessToken");
        const refreshToken = searchParams.get("refreshToken");

        if (accessToken && refreshToken && !hasHandled.current) {
            hasHandled.current = true;

            // Store tokens via server action, then clean the URL
            storeGoogleOAuthTokens(accessToken, refreshToken).then(() => {
                router.replace(pathname);
            });
        }
    }, [searchParams, router, pathname]);

    return null;
}
