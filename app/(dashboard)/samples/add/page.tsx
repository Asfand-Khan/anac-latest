import CreatePolicy from '@/components/forms/create-policy'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Sample | Anac Lubricants",
    description: "Anac Total Energies Limited",
};

const page = () => {
    return (
        <>
            <Card className="w-full shadow-none border-0">
                <CardHeader className="border-b py-4">
                    <CardTitle className="tracking-tight text-lg font-semibold">Create Sample</CardTitle>
                </CardHeader>
                <CardContent>
                    <CreatePolicy />
                </CardContent>
            </Card>
        </>
    )
}

export default page