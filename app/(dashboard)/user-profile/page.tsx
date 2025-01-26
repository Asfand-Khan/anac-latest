import UserProfileForm from '@/components/forms/user-profile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "User Profile | Jubilee General",
    description: "Jubilee General",
};

const page = () => {
    return (
        <Card className="w-full shadow-none border-0">
            <CardHeader className="border-b py-4">
                <CardTitle className="tracking-tight text-lg font-semibold">User Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <UserProfileForm />
            </CardContent>
        </Card>
    )
}

export default page;