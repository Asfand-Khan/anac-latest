import TrackerMechanismSetup from '@/components/forms/tracker-mechanism-setup'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Tracker Mechanism Setup | Jubilee General",
    description: "Jubilee General",
};

const page = () => {

    return (
        <Card className="w-full shadow-none border-0">
            <CardHeader className="border-b py-4">
                <CardTitle className="tracking-tight text-lg font-semibold">Tracker Mechanism Setup</CardTitle>
            </CardHeader>
            <CardContent>
                <TrackerMechanismSetup />
            </CardContent>
        </Card>
    )
}

export default page