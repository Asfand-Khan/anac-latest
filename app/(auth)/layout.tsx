import DynamicColors from "@/lib/DynamicColors";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <DynamicColors />
            {children}
        </>
    );
}
