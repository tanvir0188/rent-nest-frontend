# Solved Problems Log

This document keeps track of major technical problems faced during development and their adapted solutions.

## 1. Next.js App Router: Suspense Fallback Not Showing on Query Param Changes

**Problem:**
When applying filters on the properties page, the UI was intended to show a "Loading properties..." skeleton state. However, clicking the "Apply" button triggered a soft navigation (`router.push`), which in Next.js App Router (and React 18 Concurrent Mode) wraps the state update in a `startTransition`. This intentionally keeps the old UI visible and blocks the `<Suspense>` fallback from showing while the server fetches the new data for the updated query parameters. The result was a "frozen" UI with no feedback until the new data arrived.

**Adapted Solution:**
We implemented a manual loading state manager using React Context to bypass the transition delay and provide immediate visual feedback.

1.  **Shared Loading Context:** Created `FilterLoadingContext` to hold an `isLoading` boolean.
2.  **Trigger on Action:** In the `FilterSidebar` client component, we explicitly call `setLoading(true)` right before executing `router.push()` when applying or clearing filters.
3.  **Client-Side Wrapper:** Created `PropertyListWrapper` to read the `isLoading` state. If true, it immediately renders the loading skeleton, bypassing Next.js's native transition hold.
4.  **Reset on Server Render:** The server component passes a `serverKey` (a stringified version of the current search params) down to the wrapper. A `useEffect` in the wrapper listens for changes to this `serverKey`. When the new server payload arrives with the updated key, the effect sets `isLoading` to false, revealing the newly fetched data.
