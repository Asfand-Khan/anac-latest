import React from 'react'
import type { Metadata } from "next";
import Auth from '@/components/ui/auth/Auth';

export const metadata: Metadata = {
    title: "Forgot Password | Jubilee General",
    description: "Jubilee General",
    metadataBase: new URL("http://localhost:3001"),
};

const page = () => {
    return (
        <Auth />
    )
}

export default page