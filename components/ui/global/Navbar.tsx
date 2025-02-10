"use client";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { NavUser } from "./NavUser";

const data = {
    user: {
        name: "Faisal Ayub",
        email: "faisal.ayub@boxygen.com",
        avatar: "/images/dashboard/avatar.jpg",
    },
};

const Navbar = () => {
    const pathname = usePathname();

    const formatPageName = (path: string) => {
        const lastSegment = path.split("/").pop() || "";
        return lastSegment
            .split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    const pageName = formatPageName(pathname || "");
    const isHomePage = pathname === "/";

    return (
        <>
            <nav className="flex sticky z-50 top-0 h-[72px] shrink-0 items-center justify-between gap-2 border-b px-4 py-2 bg-white shadow-md">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink className="text-charcoal" href="/">
                                    Dashboard
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {!isHomePage && (
                                <>
                                    <BreadcrumbSeparator className="hidden md:block" />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage className="capitalize">{pageName}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </>
                            )
                            }

                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div>
                    <NavUser user={data.user} />
                </div>
            </nav>
        </>
    );
};

export default Navbar;
