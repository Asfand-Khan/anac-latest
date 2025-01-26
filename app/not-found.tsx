import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function NotFound() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 after:bg-black after:fixed after:inset-0 after:opacity-80 bg-no-repeat bg-cover" style={{ backgroundImage: 'url(/images/common/404-bg.jpg)' }}>
            <Card className="max-w-2xl w-full p-8 text-center space-y-6 relative z-10">
                <h1 className="text-[12rem] font-medium leading-none tracking-tight text-gray-950">
                    404
                </h1>
                <div className="space-y-2 mx-auto max-w-[500px]">
                    <h2 className="text-2xl font-medium text-gray-900">
                        Oops, the page you are trying to access does not exist?
                    </h2>
                    <p className="text-charcoal">
                        The requested page is not available. It might have been relocated, deleted, or never existed.
                    </p>
                </div>
                <Button
                    variant={"primary"}
                    size={"lg"}
                    className="w-full"
                    asChild
                >
                    <Link href="/">
                        Go to Dashboard
                    </Link>
                </Button>
            </Card>
        </div>
    )
}

