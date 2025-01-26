import { AppSidebar } from "@/components/ui/global/AppSidebar";
import Navbar from "@/components/ui/global/Navbar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import Footer from "@/components/ui/global/Footer";
import DynamicColors from "@/lib/DynamicColors";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <Navbar />
                    <div className="flex flex-1 flex-col gap-4 p-4">
                        <DynamicColors/>
                        {children}
                    </div>
                    <Footer />
                </SidebarInset>
                <DynamicColors />
            </SidebarProvider>
        </>
    );
}
