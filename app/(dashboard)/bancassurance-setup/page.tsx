import BancassuranceSetup from '@/components/forms/bancassurance-setup'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Bancassurance Setup | Jubilee General",
    description: "Jubilee General",
};

const page = () => {
    return (
        <Card className="w-full shadow-none border-0">
            <CardHeader className="border-b py-4">
                <CardTitle className="tracking-tight text-lg font-semibold">Bancassurance Setup</CardTitle>
            </CardHeader>
            <CardContent>
                <BancassuranceSetup />
            </CardContent>
        </Card>
    )
}

export default page