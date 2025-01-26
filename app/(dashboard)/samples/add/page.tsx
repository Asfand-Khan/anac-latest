import CreatePolicy from '@/components/forms/create-policy'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Create Policy | Jubilee General",
    description: "Jubilee General",
};

const page = () => {
    return (
        <>
            <Card className="w-full shadow-none border-0">
                <CardHeader className="border-b py-4">
                    <CardTitle className="tracking-tight text-lg font-semibold">Create Policy</CardTitle>
                </CardHeader>
                <CardContent>
                    <CreatePolicy />
                </CardContent>
            </Card>
        </>
    )
}

export default page