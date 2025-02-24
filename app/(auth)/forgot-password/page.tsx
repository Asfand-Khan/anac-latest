import React from 'react'
import type { Metadata } from "next";
import Auth from '@/components/ui/auth/Auth';

export const metadata: Metadata = {
    title: "Forgot Password | Anac Lubricants",
    description: "Anac Total Energies Limited",
};

const page = () => {
    return (
        <Auth />
    )
}

export default page