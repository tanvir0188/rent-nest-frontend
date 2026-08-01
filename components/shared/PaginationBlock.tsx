"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export interface PaginationBlockProps {
    meta: {
        totalItem: number;
        current_page: number;
        next_page: number | null;
        page_item: number;
    } | null;
}

export function PaginationBlock({ meta }: PaginationBlockProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    if (!meta || meta.totalItem <= meta.page_item) {
        return null; // No need for pagination if items fit in a single page
    }

    const totalPages = Math.ceil(meta.totalItem / meta.page_item);
    const currentPage = meta.current_page;

    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const handlePageChange = (e: React.MouseEvent<HTMLAnchorElement>, page: number) => {
        e.preventDefault();
        router.push(createPageURL(page));
    };

    // Calculate which page numbers to show
    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = startPage + maxPagesToShow - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    const pages = getPageNumbers();

    return (
        <Pagination className="justify-end mt-4">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={currentPage > 1 ? createPageURL(currentPage - 1) : "#"}
                        onClick={(e) => {
                            if (currentPage > 1) handlePageChange(e, currentPage - 1);
                            else e.preventDefault();
                        }}
                        className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                </PaginationItem>

                {pages.map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink
                            href={createPageURL(page)}
                            onClick={(e) => handlePageChange(e, page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        href={meta.next_page ? createPageURL(meta.next_page) : "#"}
                        onClick={(e) => {
                            if (meta.next_page) handlePageChange(e, meta.next_page);
                            else e.preventDefault();
                        }}
                        className={!meta.next_page ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
