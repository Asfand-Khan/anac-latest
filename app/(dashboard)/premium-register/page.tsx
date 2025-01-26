import PremiumRegister from '@/components/forms/premium-register'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Premium Rigister | Jubilee General",
    description: "Jubilee General",
};

const page = () => {
    return (
        <>
            <Card className="w-full shadow-none border-0">
                <CardHeader className="border-b py-4">
                    <CardTitle className="tracking-tight text-lg font-semibold">Premium Register</CardTitle>
                </CardHeader>
                <CardContent>
                    <PremiumRegister />
                </CardContent>
            </Card>
        </>
    )
}

export default page