"use client";

import { PaginationBlock, PaginationBlockProps } from "@/components/shared/PaginationBlock";
import { useFilterLoading } from "./FilterLoadingContext";
import { useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";

export function PublicPagination({ meta, pageSize }: PaginationBlockProps) {
    const { setLoading } = useFilterLoading();
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    useEffect(() => {
        if (!isPending) {
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [isPending, setLoading]);

    const handleNavigate = (url: string) => {
        startTransition(() => {
            router.push(url);
        });
    };

    return <PaginationBlock meta={meta} pageSize={pageSize} onNavigate={handleNavigate} />;
}
