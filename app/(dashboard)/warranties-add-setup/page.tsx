import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { Metadata } from 'next';
import WarrantiesAddSetup from '@/components/forms/warranties-add-setup';

export const metadata: Metadata = {
    title: "Warranties Setup Form | Jubilee General",
    description: "Jubilee General",
};

const page = () => {

    return (
        <Card className="w-full shadow-none border-0">
            <CardHeader className="border-b py-4">
                <CardTitle className="tracking-tight text-lg font-semibold">Warranties Setup Form</CardTitle>
            </CardHeader>
            <CardContent>
                <WarrantiesAddSetup />
            </CardContent>
        </Card>
    )
}

export default page