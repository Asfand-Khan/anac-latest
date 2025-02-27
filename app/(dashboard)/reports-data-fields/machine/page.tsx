import { columns } from '@/components/data-table/columns'
import { DataTable } from '@/components/data-table/data-table'
import { ColumnDef } from '@tanstack/react-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { Metadata } from 'next';
import SubNav from '@/components/ui/global/SubNav'

export const metadata: Metadata = {
    title: "Machine | Anac Lubricants",
    description: "Anac Total Energies Limited",
};

const page = async () => {
    async function getData() {
        return [
            {
                id: "728ed52f",
                reference: "John Doe",
                email: "john@example.com",
                phone: "+1 (555) 123-4567",
                address: "123 Main St, City, Country",
                department: "Sales",
                position: "Manager",
                salary: 75000,
                hireDate: "2021-03-15",
                performance: 4.5,
                projects: 7,
                status: "inactive",
                location: "karachi"
            },
            {
                id: "489a23c1",
                reference: "Jane Smith",
                email: "jane@example.com",
                phone: "+1 (555) 987-6543",
                address: "456 Elm St, Town, Country",
                department: "Marketing",
                position: "Specialist",
                salary: 65000,
                hireDate: "2022-01-10",
                performance: 4.2,
                projects: 5,
                status: "active",
                location: "karachi"
            },
            {
                id: "728ed52f",
                reference: "John Doe",
                email: "john@example.com",
                phone: "+1 (555) 123-4567",
                address: "123 Main St, City, Country",
                department: "Sales",
                position: "Manager",
                salary: 75000,
                hireDate: "2021-03-15",
                performance: 4.5,
                projects: 7,
                status: "active",
                location: "karachi"
            }
        ]
    }

    const data = await getData()
    return (
        <>
            <SubNav title="Machine" showDatePicker={true} showDataTableFilters={true} />
            <Card className="w-full shadow-none border-0">
                <CardHeader className='border-b py-4'>
                    <CardTitle className='tracking-tight text-lg font-semibold'>Explore your machine</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns as ColumnDef<{ id: string; reference: string; email: string; phone: string; address: string; department: string; position: string; salary: number; hireDate: string; performance: number; projects: number; status: string; }, unknown>[]} data={data} />
                </CardContent>
            </Card>
        </>
    )
}

export default page