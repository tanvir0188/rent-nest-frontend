import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

export default function PaymentCancelPage() {
    return (
        <div className="container mx-auto flex items-center justify-center min-h-[70vh] py-12">
            <Card className="max-w-md w-full text-center shadow-sm border-zinc-200">
                <CardHeader className="pt-8 pb-4">
                    <div className="mx-auto mb-4 bg-red-100 w-16 h-16 rounded-full flex items-center justify-center">
                        <XCircle className="w-10 h-10 text-red-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-zinc-900">Payment Canceled</CardTitle>
                    <CardDescription className="text-zinc-500 text-base mt-2">
                        Your transaction was canceled or did not complete. No charges were made.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="bg-zinc-50 rounded-xl p-4 text-sm text-zinc-600 mb-2">
                        If you encountered an issue, please try again or contact support for assistance.
                    </div>
                </CardContent>
                <CardFooter className="pb-8 pt-2 flex flex-col gap-3">
                    <Link href="/dashboard/tenant/requests" className="w-full">
                        <Button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl">
                            Return to My Requests
                        </Button>
                    </Link>
                    <Link href="/" className="w-full">
                        <Button variant="outline" className="w-full rounded-xl">
                            Back to Home
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
