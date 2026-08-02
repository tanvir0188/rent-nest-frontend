import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function PaymentSuccessPage({ searchParams }: { searchParams: { session_id?: string } }) {
    // We can extract session_id if we want to verify it, but for UI, we just show a success message.
    return (
        <div className="container mx-auto flex items-center justify-center min-h-[70vh] py-12">
            <Card className="max-w-md w-full text-center shadow-lg border-green-100">
                <CardHeader className="pt-8 pb-4">
                    <div className="mx-auto mb-4 bg-green-100 w-16 h-16 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-zinc-900">Payment Successful!</CardTitle>
                    <CardDescription className="text-zinc-500 text-base mt-2">
                        Your transaction has been completed successfully. The landlord will be notified shortly.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="bg-zinc-50 rounded-xl p-4 text-sm text-zinc-600 mb-2">
                        A receipt has been sent to your registered email address.
                    </div>
                </CardContent>
                <CardFooter className="pb-8 pt-2 flex flex-col gap-3">
                    <Link href="/dashboard/tenant/requests" className="w-full">
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl">
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
